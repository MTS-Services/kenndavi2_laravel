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
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
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
                'payment_method' => $methodEnum->value,
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

        if ($gateway === 'stripe') {
            return $this->handleStripeSuccess($request);
        }

        if ($gateway === 'paypal') {
            return $this->handlePayPalSuccess($request);
        }

        return redirect()
            ->route('frontend.home')
            ->withErrors(['payment' => 'Invalid gateway.']);
    }

    private function handleStripeSuccess(Request $request): RedirectResponse|Response
    {
        $sessionId = $request->query('session_id');

        if (! $sessionId || ! is_string($sessionId)) {
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Missing Stripe session.']);
        }

        $secretKey = (string) config('services.stripe.secret');
        if ($secretKey === '') {
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Stripe is not configured.']);
        }

        $response = Http::withBasicAuth($secretKey, '')
            ->timeout(10)
            ->get('https://api.stripe.com/v1/checkout/sessions/'.$sessionId.'?expand[]=payment_intent');

        if (! $response->successful()) {
            report(new \RuntimeException('Stripe session retrieval failed: '.$response->body()));

            return redirect()->route('frontend.home')->withErrors(['payment' => 'Could not verify payment.']);
        }

        $session = $response->json();
        $paymentStatus = $session['payment_status'] ?? PaymentStatus::PENDING->value;

        if ($paymentStatus !== 'paid') {
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Payment was not completed.']);
        }

        $paymentId = (int) (($session['metadata']['payment_db_id'] ?? null) ?: ($session['metadata']['payment_id'] ?? 0));
        $payment = Payment::where('id', $paymentId)
            ->where('user_id', $request->user()->id)
            ->first();

        if (! $payment) {
            $payment = Payment::where('method', PaymentMethod::STRIPE->value)
                ->where('gateway_txn_id', $sessionId)
                ->where('user_id', $request->user()->id)
                ->first();
        }

        if (! $payment || $payment->isPaid()) {
            if ($payment?->order) {
                $payment->order->load(['orderItems.product.images', 'orderAddress', 'payment']);

                return Inertia::render('user/order/success', $this->buildOrderPageProps($payment->order));
            }

            return redirect()->route('frontend.home')
                ->withErrors(['payment' => 'Payment could not be matched to an order.']);
        }

        $paymentIntent = $session['payment_intent'] ?? null;
        $paymentIntentId = is_array($paymentIntent) ? ($paymentIntent['id'] ?? null) : $paymentIntent;
        $chargeId = null;
        if (is_array($paymentIntent) && isset($paymentIntent['charges']['data'][0]['id'])) {
            $chargeId = $paymentIntent['charges']['data'][0]['id'];
        } elseif (is_string($paymentIntentId)) {
            $chargeResponse = Http::withBasicAuth($secretKey, '')
                ->get('https://api.stripe.com/v1/payment_intents/'.$paymentIntentId);
            if ($chargeResponse->successful()) {
                $pi = $chargeResponse->json();
                $chargeId = $pi['charges']['data'][0]['id'] ?? null;
            }
        }

        DB::transaction(function () use ($payment, $sessionId, $paymentIntentId, $chargeId) {
            $payment->update([
                'status' => PaymentStatus::COMPLETED->value,
                'paid_at' => now(),
                'transaction_id' => $chargeId ?? $sessionId,
                'payment_intent_id' => $paymentIntentId,
                'charge_id' => $chargeId,
                'updater_id' => $payment->user_id,
                'updater_type' => User::class,
            ]);

            $order = $payment->order;
            $order->update([
                'order_status' => OrderStatus::CONFIRMED->value,
                'payment_status' => OrderPaymentStatus::PAID->value,
                'updater_id' => $payment->user_id,
                'updater_type' => User::class,
            ]);
        });

        $payment->order->load(['orderItems.product.images', 'orderAddress', 'payment']);

        return Inertia::render('user/order/success', $this->buildOrderPageProps($payment->order));
    }

    private function handlePayPalSuccess(Request $request): RedirectResponse|Response
    {
        $token = $request->query('token');
        if (! $token || ! is_string($token)) {
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Missing PayPal token.']);
        }

        $payment = Payment::where('method', PaymentMethod::PAYPAL->value)
            ->where('gateway_txn_id', $token)
            ->where('user_id', $request->user()->id)
            ->first();

        if (! $payment || $payment->isPaid()) {
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Payment not found.']);
        }

        $clientId = (string) config('services.paypal.client_id');
        $clientSecret = (string) config('services.paypal.secret');
        $environment = (string) config('services.paypal.environment', 'sandbox');
        $baseUrl = $environment === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

        $tokenResponse = Http::asForm()
            ->withBasicAuth($clientId, $clientSecret)
            ->post($baseUrl.'/v1/oauth2/token', ['grant_type' => 'client_credentials']);

        if (! $tokenResponse->successful() || ! $tokenResponse->json('access_token')) {
            return redirect()->route('frontend.home')->withErrors(['payment' => 'Could not verify with PayPal.']);
        }

        $accessToken = $tokenResponse->json('access_token');

        $captureResponse = Http::withToken($accessToken)
            ->asJson()
            ->withHeaders([
                'Prefer' => 'return=representation',
            ])
            ->post($baseUrl.'/v2/checkout/orders/'.$token.'/capture', new \stdClass);

        if (! $captureResponse->successful()) {
            report(new \RuntimeException('PayPal capture failed: '.$captureResponse->body()));

            return redirect()->route('user.payment.cancel', ['orderId' => $payment->order->order_number])->withErrors(['payment' => 'PayPal capture failed.']);
        }

        $captureData = $captureResponse->json();
        $status = $captureData['status'] ?? null;
        $purchaseUnits = $captureData['purchase_units'] ?? [];
        $captureId = $purchaseUnits[0]['payments']['captures'][0]['id'] ?? null;
        $payerId = $captureData['payer']['payer_id'] ?? null;

        if ($status !== 'COMPLETED') {
            return redirect()->route('user.payment.cancel', ['orderId' => $payment->order->order_number])->withErrors(['payment' => 'PayPal payment not completed.']);
        }

        DB::transaction(function () use ($payment, $captureId) {
            $payment->update([
                'status' => PaymentStatus::COMPLETED->value,
                'paid_at' => now(),
                'transaction_id' => $captureId,
                'updater_id' => $payment->user_id,
                'updater_type' => User::class,
            ]);

            $order = $payment->order;
            $order->update([
                'order_status' => OrderStatus::CONFIRMED->value,
                'payment_status' => OrderPaymentStatus::PAID->value,
                'updater_id' => $payment->user_id,
                'updater_type' => User::class,
            ]);
        });

        $payment->order->load(['orderItems.product.images', 'orderAddress', 'payment']);

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
            $payment->update(['paypal_order_id' => $paypalOrderId]);
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
