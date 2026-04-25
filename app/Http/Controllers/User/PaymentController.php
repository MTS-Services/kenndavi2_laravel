<?php

namespace App\Http\Controllers\User;

use App\Enums\OrderPaymentStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderAddresse;
use App\Models\Payment;
use App\Models\PaymentGateway;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function start(Request $request): RedirectResponse|\Symfony\Component\HttpFoundation\Response
    {
        // Read from session — never from URL params (prevents tampering)
        $pending = session('payment_pending');

        if (! $pending || ! isset($pending['encrypted_service_id'], $pending['address_id'], $pending['payment_method'])) {
            return redirect()
                ->route('frontend.home')
                ->withErrors(['payment' => 'Payment session expired. Please try again.']);
        }

        $encryptedServiceId = (string) $pending['encrypted_service_id'];
        $addressId = (int) $pending['address_id'];
        $paymentMethod = (string) $pending['payment_method'];

        // Validate payment method whitelist
        if (! in_array($paymentMethod, ['stripe', 'paypal'], true)) {
            abort(422, 'Invalid payment method.');
        }

        $orderId = $pending['order_id'];
        $order = Order::findOrFail($orderId);
        $user = $request->user();

        /**
         * 🚫 BLOCK: If order already paid or failed
         */
        // if ($order->payment_status !== OrderPaymentStatus::UNPAID) {
        //     return redirect()
        //         ->route('user.orders')
        //         ->withErrors(['payment' => 'This order is already processed.']);
        // }

        /**
         * 🚫 BLOCK: If payment already exists (IMPORTANT)
         */
        // $existingPayment = Payment::where('order_id', $order->id)->first();

        // if ($existingPayment) {
        //     return redirect()
        //         ->route('user.orders')
        //         ->withErrors(['payment' => 'Payment already initiated for this order.']);
        // }

        // if (
        //     $existingPayment &&
        //     $existingPayment->status === PaymentStatus::PROCESSING &&
        //     $existingPayment->created_at->diffInMinutes(now()) > 1
        // ) {
        //     $existingPayment->update([
        //         'status' => PaymentStatus::FAILED->value,
        //         'updated_at' => now(),
        //     ]);

        //     $order->update([
        //         'payment_status' => OrderPaymentStatus::FAILED->value,
        //         'order_status' => OrderStatus::CANCELLED->value,
        //     ]);
        // }

        // Ensure address belongs to user
        $address = OrderAddresse::where('id', $addressId)->where('order_id', $orderId)->firstOrFail();

        $amount = (float) $order->total;
        $amountInCents = (int) round($amount * 100);

        if ($amountInCents < 50) {
            abort(422, 'Amount too low for payment processing (minimum $0.50).');
        }

        $methodEnum = $paymentMethod === PaymentMethod::STRIPE->value ? PaymentMethod::STRIPE : PaymentMethod::PAYPAL;

        [$order, $payment] = DB::transaction(function () use ($user, $order, $amount, $methodEnum) {

            $payment = Payment::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'amount' => $amount,
                'method' => $methodEnum->value,
                'status' => PaymentStatus::PENDING->value,
                'creater_id' => $user->id,
                'creater_type' => User::class,
            ]);

            return [$order, $payment];
        });

        // Consume session immediately — prevents replay attacks
        session()->forget('payment_pending');

        // Update payment status to PROCESSING when redirecting to payment gateway
        $payment->update([
            'status' => PaymentStatus::PENDING->value,
            'updater_id' => $user->id,
            'updater_type' => User::class,
            'updated_at' => now(),
        ]);

        $currency = (string) config('services.stripe.currency', 'usd');

        if ($paymentMethod === PaymentMethod::STRIPE->value) {
            $checkoutUrl = $this->createStripeCheckoutSession(
                $order,
                $amountInCents,
                $currency,
                $encryptedServiceId,
                $addressId,
                $payment
            );

            return $this->externalRedirect($checkoutUrl, $request);
        }

        if ($paymentMethod === PaymentMethod::PAYPAL->value) {
            $paypalCurrency = (string) config('services.paypal.currency', 'usd');
            $approvalUrl = $this->createPaypalOrder(
                $order,
                $amountInCents,
                $paypalCurrency,
                $encryptedServiceId,
                $addressId,
                $payment
            );

            return $this->externalRedirect($approvalUrl, $request);
        }

        abort(422, 'Unhandled payment method.');
    }

    public function success(Request $request, string $gateway): RedirectResponse|Response
    {
        $gateway = strtolower($gateway);
        Log::info('Payment success callback entry', [
            'gateway' => $gateway,
            'query' => $request->query(),
            'user_id' => $request->user()?->id,
        ]);

        if ($gateway === 'stripe') {
            return $this->handleStripeSuccess($request);
        }

        if ($gateway === 'paypal') {
            return $this->handlePayPalSuccess($request);
        }

        if ($gateway === 'authorize_net') {
            return $this->handleAuthorizeNetSuccess($request);
        }

        return redirect()
            ->route('frontend.home')
            ->withErrors(['payment' => 'Invalid gateway.']);
    }

    private function handleAuthorizeNetSuccess(Request $request): RedirectResponse|Response
    {
        $gateway = PaymentGateway::query()->where('slug', 'authorize_net')->first();
        if (! $gateway || ! $gateway->isSupported()) {
            Log::warning('Authorize.Net gateway missing or unsupported during success callback');

            return redirect()->route('frontend.home')->withErrors(['payment' => 'Authorize.Net gateway is not configured.']);
        }

        $rawOrderNumber = (string) (
            $request->query('order')
            ?? $request->query('order_number')
            ?? $request->query('invoiceNumber')
            ?? $request->query('x_invoice_num')
            ?? ''
        );
        $orderNumber = trim((string) explode('?', $rawOrderNumber)[0]);

        if ($orderNumber === '') {
            $refId = (string) ($request->query('refId') ?? $request->query('ref_id') ?? '');
            if (is_numeric($refId)) {
                $payment = Payment::query()
                    ->whereKey((int) $refId)
                    ->where('method', PaymentMethod::AUTHORIZE_NET->value)
                    ->first();
                $orderNumber = (string) ($payment?->order?->order_number ?? '');
            }
        }

        if ($orderNumber === '') {
            Log::warning('Authorize.Net success callback missing order number', [
                'query' => $request->query(),
            ]);

            return redirect()->route('frontend.home')
                ->withErrors(['payment' => 'Missing order reference from Authorize.Net callback.']);
        }

        Log::info('Authorize.Net success callback resolving payment', [
            'order_number' => $orderNumber,
            'query' => $request->query(),
        ]);

        $result = ['success' => false, 'message' => 'Payment is still processing.'];
        $maxConfirmAttempts = 5;
        for ($attempt = 1; $attempt <= $maxConfirmAttempts; $attempt++) {
            $result = $gateway->paymentMethod()->confirmPayment($orderNumber);
            Log::info('Authorize.Net confirmPayment attempt result', [
                'order_number' => $orderNumber,
                'attempt' => $attempt,
                'result' => $result,
            ]);

            if (($result['success'] ?? false) === true) {
                break;
            }

            $message = strtolower((string) ($result['message'] ?? ''));
            $isProcessing = str_contains($message, 'processing') || str_contains($message, 'not found yet');
            if (! $isProcessing || $attempt === $maxConfirmAttempts) {
                break;
            }

            // Authorize.Net hosted payments can take a few seconds before transaction APIs return the invoice.
            usleep(1500000);
        }

        Log::info('Authorize.Net confirmPayment result', [
            'order_number' => $orderNumber,
            'result' => $result,
        ]);

        $order = Order::query()->where('order_number', $orderNumber)->first();
        if (! $order) {
            return redirect()->route('frontend.home')
                ->withErrors(['payment' => 'Payment was processed, but order could not be found.']);
        }

        $order->load(['payment']);
        $orderPaymentStatus = $order->payment_status?->value ?? (string) $order->payment_status;
        $paymentStatus = $order->payment?->status?->value ?? (string) $order->payment?->status;
        $isAlreadyPaid = $orderPaymentStatus === OrderPaymentStatus::PAID->value
            || $paymentStatus === PaymentStatus::COMPLETED->value;

        if ($isAlreadyPaid) {
            Log::info('Authorize.Net callback detected already-paid order from DB state', [
                'order_number' => $order->order_number,
                'order_payment_status' => $orderPaymentStatus,
                'payment_status' => $paymentStatus,
            ]);
            $result['success'] = true;
        }

        if (! ($result['success'] ?? false)) {
            Log::warning('Authorize.Net callback still processing, avoiding failure mutation', [
                'order_number' => $order->order_number,
                'result' => $result,
                'order_payment_status' => $orderPaymentStatus,
                'payment_status' => $paymentStatus,
            ]);

            return redirect()->route('user.orders')
                ->with('toast', [
                    'type' => 'info',
                    'message' => $result['message'] ?? 'Payment is still processing. Please refresh your orders in a few seconds.',
                ]);
        }

        $order->load(['orderItems.product.images', 'orderAddress', 'payment']);
        Log::info('Authorize.Net success rendering success page', [
            'order_number' => $order->order_number,
            'payment_id' => $order->payment?->id,
        ]);

        return Inertia::render('user/order/success', $this->buildOrderPageProps($order));
    }

    private function handleStripeSuccess(Request $request): RedirectResponse|Response
    {
        $sessionId = $request->query('session_id');
        Log::info('Stripe success callback received', [
            'session_id' => $sessionId,
            'user_id' => $request->user()?->id,
            'query' => $request->query(),
        ]);

        if (! $sessionId || ! is_string($sessionId)) {
            Log::warning('Stripe success callback missing session_id');
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Missing Stripe session.']);
        }

        $gateway = PaymentGateway::query()->where('slug', 'stripe')->first();
        if (! $gateway || ! $gateway->isSupported()) {
            Log::warning('Stripe gateway missing or unsupported during success callback');
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Stripe gateway is not configured.']);
        }

        $result = $gateway->paymentMethod()->confirmPayment((string) $sessionId);
        Log::info('Stripe confirmPayment result', [
            'session_id' => $sessionId,
            'result' => $result,
        ]);
        if (! ($result['success'] ?? false)) {
            $payment = Payment::query()
                ->where('method', PaymentMethod::STRIPE->value)
                ->where('gateway_txn_id', (string) $sessionId)
                ->first();

            if ($payment?->order) {
                Log::warning('Stripe confirmation failed; redirecting to cancel page', [
                    'session_id' => $sessionId,
                    'order_number' => $payment->order->order_number,
                ]);
                return redirect()->route('user.payment.cancel', ['orderId' => $payment->order->order_number])
                    ->withErrors(['payment' => $result['message'] ?? 'Stripe payment was not completed.']);
            }

            Log::error('Stripe confirmation failed; payment could not be matched', [
                'session_id' => $sessionId,
                'result' => $result,
            ]);
            return redirect()->route('frontend.home')
                ->withErrors(['payment' => $result['message'] ?? 'Stripe payment could not be verified.']);
        }

        $payment = Payment::query()
            ->where('method', PaymentMethod::STRIPE->value)
            ->where('gateway_txn_id', (string) $sessionId)
            ->first();

        if (! $payment?->order) {
            Log::error('Stripe confirmed but no order was found for payment', [
                'session_id' => $sessionId,
                'payment_id' => $payment?->id,
            ]);
            return redirect()->route('frontend.home')
                ->withErrors(['payment' => 'Payment was completed, but no matching order was found.']);
        }

        $payment->order->load(['orderItems.product.images', 'orderAddress', 'payment']);
        Log::info('Stripe success rendering success page', [
            'session_id' => $sessionId,
            'payment_id' => $payment->id,
            'order_number' => $payment->order->order_number,
        ]);

        return Inertia::render('user/order/success', $this->buildOrderPageProps($payment->order));
    }

    private function handlePayPalSuccess(Request $request): RedirectResponse|Response
    {
        $token = $request->query('token');
        Log::info('PayPal success callback received', [
            'token' => $token,
            'user_id' => $request->user()?->id,
            'query' => $request->query(),
        ]);
        if (! $token || ! is_string($token)) {
            Log::warning('PayPal success callback missing token');
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Missing PayPal token.']);
        }

        $payment = Payment::where('method', PaymentMethod::PAYPAL->value)
            ->where('gateway_txn_id', $token)
            ->first();

        if (! $payment || $payment->isPaid()) {
            Log::warning('PayPal success callback payment not found or already paid', [
                'token' => $token,
                'payment_id' => $payment?->id,
            ]);
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Payment not found.']);
        }

        $gateway = PaymentGateway::query()->where('slug', 'paypal')->first();
        if (! $gateway || ! $gateway->isSupported()) {
            Log::warning('PayPal gateway missing or unsupported during success callback');
            return redirect()->route('frontend.home')->withErrors(['payment' => 'PayPal gateway is not configured.']);
        }

        $result = $gateway->paymentMethod()->confirmPayment((string) $token);
        Log::info('PayPal confirmPayment result', [
            'token' => $token,
            'payment_id' => $payment->id,
            'result' => $result,
        ]);
        if (! ($result['success'] ?? false)) {
            Log::warning('PayPal confirmation failed; redirecting to cancel page', [
                'token' => $token,
                'order_number' => $payment->order->order_number,
            ]);
            return redirect()->route('user.payment.cancel', ['orderId' => $payment->order->order_number])
                ->withErrors(['payment' => $result['message'] ?? 'PayPal payment was not completed.']);
        }

        $payment->order->load(['orderItems.product.images', 'orderAddress', 'payment']);
        Log::info('PayPal success rendering success page', [
            'token' => $token,
            'payment_id' => $payment->id,
            'order_number' => $payment->order->order_number,
        ]);

        return Inertia::render('user/order/success', $this->buildOrderPageProps($payment->order));
    }

    /**
     * Redirect to external URL (Stripe/PayPal). For Inertia/XHR requests, use
     * Inertia::location() so the browser does a full-page redirect and avoids
     * CORS / Network Error when Axios tries to follow the redirect.
     */
    private function externalRedirect(string $url, Request $request): RedirectResponse|\Symfony\Component\HttpFoundation\Response
    {
        if ($request->header('X-Inertia')) {
            return Inertia::location($url);
        }

        return redirect()->away($url);
    }

    // ─── Stripe Checkout Session ───────────────────────────────────────────────
    private function createStripeCheckoutSession(
        Order $order,
        int $amountInCents,
        string $currency,
        string $encryptedServiceId,
        int $addressId,
        Payment $payment
    ): string {
        $secretKey = (string) config('services.stripe.secret');

        if ($secretKey === '') {
            abort(500, 'Stripe is not configured.');
        }

        $successUrl = route('user.payment.success', ['gateway' => 'stripe'])
            .'?session_id={CHECKOUT_SESSION_ID}';

        $cancelUrl = route('user.payment.cancel', $order->id);

        $response = Http::asForm()
            ->withBasicAuth($secretKey, '')
            ->timeout(15)
            ->post('https://api.stripe.com/v1/checkout/sessions', [
                'mode' => 'payment',
                'success_url' => $successUrl,
                'cancel_url' => $cancelUrl,
                'line_items' => [[
                    'quantity' => 1,
                    'price_data' => [
                        'currency' => strtolower($currency),
                        'unit_amount' => $amountInCents,
                        'product_data' => [
                            'name' => "Order Number: {$order->order_number}",
                        ],
                    ],
                ]],
                'metadata' => [
                    'order_id' => $order->id,
                    'payment_id' => $payment->id,
                ],
            ]);

        if (! $response->successful()) {
            report(new \RuntimeException(
                'Stripe checkout session creation failed: '.$response->body()
            ));
            abort(500, 'Unable to start Stripe payment. Please try again.');
        }

        $session = $response->json();

        if (empty($session['url'])) {
            abort(500, 'Stripe did not return a checkout URL.');
        }

        $payment->update([
            'gateway_response' => json_encode([
                'stripe_session_id' => $session['id'] ?? null,
            ]),
        ]);

        return $session['url'];
    }

    // ─── PayPal Order Creation ─────────────────────────────────────────────────
    private function createPaypalOrder(
        Order $order,
        int $amountInCents,
        string $currency,
        string $encryptedProductId,
        int $addressId,
        Payment $payment
    ): string {
        $clientId = (string) config('services.paypal.client_id');
        $clientSecret = (string) config('services.paypal.secret');
        $environment = (string) config('services.paypal.environment', 'sandbox');
        if ($clientId === '' || $clientSecret === '') {
            abort(500, 'PayPal is not configured.');
        }
        $baseUrl = $environment === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';

        // Step 1: Get access token
        $tokenResponse = Http::asForm()
            ->withBasicAuth($clientId, $clientSecret)
            ->timeout(15)
            ->post($baseUrl.'/v1/oauth2/token', ['grant_type' => 'client_credentials']);

        if (! $tokenResponse->successful()) {
            report(new \RuntimeException(
                'PayPal token request failed: '.$tokenResponse->body()
            ));
            abort(500, 'Unable to authenticate with PayPal.');
        }

        $accessToken = $tokenResponse->json('access_token');

        if (! $accessToken) {
            abort(500, 'PayPal access token missing.');
        }

        // PayPal will append its own query params (e.g. ?token=...).
        // Do not use placeholders like {TOKEN} in return_url.
        $successUrl = route('user.payment.success', ['gateway' => 'paypal']);

        $cancelUrl = route('user.payment.cancel', $order->id);

        // Step 2: Create PayPal order (custom_id = our payment id for success handler)
        $orderResponse = Http::withToken($accessToken)
            ->acceptJson()
            ->timeout(15)
            ->post($baseUrl.'/v2/checkout/orders', [
                'intent' => 'CAPTURE',
                'purchase_units' => [[
                    'amount' => [
                        'currency_code' => strtoupper($currency),
                        'value' => number_format($amountInCents / 100, 2, '.', ''),
                    ],
                    'description' => "Order Number: {$order->order_number}",
                    'custom_id' => (string) $payment->id,
                    'reference_id' => (string) $order->id,
                ]],
                'application_context' => [
                    'brand_name' => config('app.name'),
                    'landing_page' => 'NO_PREFERENCE',
                    'user_action' => 'PAY_NOW',
                    'return_url' => $successUrl,
                    'cancel_url' => $cancelUrl,
                ],
            ]);

        if (! $orderResponse->successful()) {
            report(new \RuntimeException(
                'PayPal order creation failed: '.$orderResponse->status().' '.$orderResponse->body()
            ));
            abort(500, 'Unable to start PayPal payment. Please try again.');
        }

        $paypalOrder = $orderResponse->json();
        $paypalOrderId = $paypalOrder['id'] ?? null;

        if ($paypalOrderId) {
            $payment->update(['gateway_txn_id' => $paypalOrderId]);
        }

        $approvalLink = collect($paypalOrder['links'] ?? [])
            ->firstWhere('rel', 'approve')['href'] ?? null;

        if (! $approvalLink) {
            abort(500, 'PayPal did not return an approval URL.');
        }

        return $approvalLink;
    }

    public function cancel(Request $request, string $orderId): Response
    {
        $order = Order::query()
            ->where('order_number', $orderId)
            ->orWhere('id', is_numeric($orderId) ? (int) $orderId : 0)
            ->firstOrFail();

        DB::transaction(function () use ($order) {

            $order->update([
                'payment_status' => OrderPaymentStatus::FAILED->value,
                'order_status' => OrderStatus::CANCELLED->value,
            ]);

            if ($order->payment) {
                $order->payment->update([
                    'status' => PaymentStatus::FAILED->value,
                ]);
            }
        });

        $order->load(['orderItems.product.images', 'orderAddress', 'payment']);

        return Inertia::render('user/order/cancel', [
            ...$this->buildOrderPageProps($order),
            'errorMessage' => session('errors') ? session('errors')->first('payment') : 'Payment cancelled',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function buildOrderPageProps(Order $order): array
    {
        $maxAttempts = max((int) config('services.payment.max_attempts', 3), 1);
        $attemptCount = (int) $order->payments()->count();
        $attemptsRemaining = max($maxAttempts - $attemptCount, 0);

        return [
            'order' => [
                'order_number' => $order->order_number,
                'subtotal' => (float) $order->subtotal,
                'shipping_cost' => (float) $order->shipping_cost,
                'total' => (float) $order->total,
                'order_status' => $order->order_status?->value ?? (string) $order->order_status,
                'payment_status' => $order->payment_status?->value ?? (string) $order->payment_status,
                'created_at' => $order->created_at,
            ],
            'orderAddress' => $order->orderAddress,
            'orderItems' => $order->orderItems,
            'paymentMethod' => $order->payment?->method,
            'maxAttempts' => $maxAttempts,
            'attemptCount' => $attemptCount,
            'attemptsRemaining' => $attemptsRemaining,
            'canRetryPayment' => $attemptsRemaining > 0 && (($order->payment_status?->value ?? (string) $order->payment_status) !== OrderPaymentStatus::PAID->value),
        ];
    }
}
