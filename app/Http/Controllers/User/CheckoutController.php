<?php

namespace App\Http\Controllers\User;

use App\Enums\OrderPaymentStatus;
use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreShippingAddressRequest;
use App\Models\Order;
use App\Models\OrderAddresse;
use App\Models\OrderItem;
use App\Models\PaymentGateway;
use App\Services\CartService;
use App\Services\PaymentService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as BaseResponse;

class CheckoutController extends Controller
{
    public function placeOrder(
        StoreShippingAddressRequest $request,
        CartService $cartService,
        PaymentService $paymentService,
        ProductService $productService,
    ): BaseResponse {
        Log::info('PAYMENT_FLOW [CO-01] placeOrder called', [
            'user_id'    => $request->user()?->id,
            'is_buy_now' => session()->has('buy_now'),
        ]);

        $isBuyNow   = session()->has('buy_now');
        $buyNowData = session()->get('buy_now');

        // ─────────────────────────────────────────────────────────────────────
        // BUY NOW FLOW
        // ─────────────────────────────────────────────────────────────────────
        if ($isBuyNow) {
            $product = \App\Models\Product::find($buyNowData['product_id']);

            if (! $product) {
                session()->forget('buy_now');

                return redirect()
                    ->route('frontend.cart.index')
                    ->with('toast', [
                        'type'    => 'error',
                        'message' => 'Product not found.',
                    ]);
            }

            $qty = (int) ($buyNowData['quantity'] ?? 1);

            // Stock check
            if ((int) $product->stock_level < $qty) {
                return redirect()
                    ->route('frontend.shipping-info')
                    ->with('toast', [
                        'type'    => 'error',
                        'message' => 'Product is out of stock.',
                    ]);
            }

            /** @var Order $order */
            $order = DB::transaction(function () use ($request, $product, $qty, $productService) {
                $userId      = (int) $request->user()->id;
                $shippingData = $request->validated();

                $calculated   = $productService->getProductCalculatedData($product, $qty);
                $subtotal     = round((float) ($calculated['total_price'] ?? 0), 2);
                $itemDiscount = round((float) ($calculated['discount_amount'] ?? 0) * $qty, 2);
                $shippingCost = $subtotal <= 1 ? 0.0 : (float) $productService->getShippingCost();
                $grandTotal   = round($subtotal + $shippingCost, 2);

                $order = Order::create([
                    'order_number'   => generate_order_id_hybrid(),
                    'user_id'        => $userId,
                    'subtotal'       => $subtotal,
                    'discount'       => $itemDiscount,
                    'shipping_cost'  => $shippingCost,
                    'tax'            => 0,
                    'total'          => $grandTotal,
                    'currency'       => 'USD',
                    'payment_status' => OrderPaymentStatus::UNPAID->value,
                    'order_status'   => OrderStatus::INITIALIZED->value,
                ]);

                OrderAddresse::create([
                    'order_id'      => $order->id,
                    'full_name'     => $shippingData['name'],
                    'phone'         => $shippingData['phone'],
                    'email'         => $shippingData['email'],
                    'address_line1' => $shippingData['address_line1'],
                    'address_line2' => $shippingData['address_line2'] ?? null,
                    'city'          => $shippingData['city'],
                    'state'         => $shippingData['State'],
                    'postal_code'   => $shippingData['postalCode'],
                    'country'       => $shippingData['country'],
                    'creater_id'    => $userId,
                    'creater_type'  => \App\Models\User::class,
                ]);

                OrderItem::create([
                    'order_id'     => $order->id,
                    'product_id'   => $product->id,
                    'product_name' => $product->title,
                    'product_sku'  => $product->sku ?? null,
                    'price'        => (float) ($calculated['discounted_price'] ?? 0),
                    'discount'     => $itemDiscount,
                    'quantity'     => $qty,
                    'total'        => $subtotal,
                ]);

                return $order;
            });

            // Buy Now session clear
            session()->forget('buy_now');

            Log::info('PAYMENT_FLOW [CO-02-BN] buy now order created', [
                'order_number' => $order->order_number,
                'user_id'      => $request->user()->id,
            ]);

        // ─────────────────────────────────────────────────────────────────────
        // NORMAL CART FLOW
        // ─────────────────────────────────────────────────────────────────────
        } else {
            $cart = $cartService->resolveCart($request);
            $cart->load('items.product.images');

            if ($cart->items->isEmpty()) {
                return redirect()
                    ->route('frontend.cart.index')
                    ->with('toast', [
                        'type'    => 'error',
                        'message' => 'Your cart is empty.',
                    ]);
            }

            if ((int) $cart->user_id !== (int) $request->user()->id) {
                abort(403);
            }

            foreach ($cart->items as $item) {
                if (! $item->product) {
                    return redirect()
                        ->route('frontend.cart.index')
                        ->with('toast', [
                            'type'    => 'error',
                            'message' => 'A cart item product is missing. Please update your cart.',
                        ]);
                }

                $item->product->refresh();
                if ((int) $item->product->stock_level < (int) $item->quantity) {
                    return redirect()
                        ->route('frontend.cart.index')
                        ->with('toast', [
                            'type'    => 'error',
                            'message' => 'One or more items are out of stock. Please update your cart.',
                        ]);
                }
            }

            /** @var Order $order */
            $order = DB::transaction(function () use ($request, $cart, $productService) {
                $userId       = (int) $request->user()->id;
                $shippingData = $request->validated();
                $subtotal     = 0.0;
                $totalDiscount = 0.0;

                foreach ($cart->items as $item) {
                    $calculated     = $productService->getProductCalculatedData(
                        $item->product,
                        (int) $item->quantity,
                    );
                    $subtotal      += (float) ($calculated['total_price'] ?? 0);
                    $totalDiscount += (float) ($calculated['discount_amount'] ?? 0) * (int) $item->quantity;
                }

                $subtotal     = round($subtotal, 2);
                $shippingCost = $subtotal <= 1 ? 0.0 : (float) $productService->getShippingCost();
                $grandTotal   = round($subtotal + $shippingCost, 2);

                $order = Order::create([
                    'order_number'   => generate_order_id_hybrid(),
                    'user_id'        => $userId,
                    'subtotal'       => $subtotal,
                    'discount'       => round($totalDiscount, 2),
                    'shipping_cost'  => $shippingCost,
                    'tax'            => 0,
                    'total'          => $grandTotal,
                    'currency'       => 'USD',
                    'payment_status' => OrderPaymentStatus::UNPAID->value,
                    'order_status'   => OrderStatus::INITIALIZED->value,
                ]);

                OrderAddresse::create([
                    'order_id'      => $order->id,
                    'full_name'     => $shippingData['name'],
                    'phone'         => $shippingData['phone'],
                    'email'         => $shippingData['email'],
                    'address_line1' => $shippingData['address_line1'],
                    'address_line2' => $shippingData['address_line2'] ?? null,
                    'city'          => $shippingData['city'],
                    'state'         => $shippingData['State'],
                    'postal_code'   => $shippingData['postalCode'],
                    'country'       => $shippingData['country'],
                    'creater_id'    => $userId,
                    'creater_type'  => \App\Models\User::class,
                ]);

                foreach ($cart->items as $item) {
                    $product    = $item->product;
                    $qty        = (int) $item->quantity;
                    $calculated = $productService->getProductCalculatedData($product, $qty);
                    $itemDiscount = round((float) ($calculated['discount_amount'] ?? 0) * $qty, 2);

                    OrderItem::create([
                        'order_id'     => $order->id,
                        'product_id'   => $product->id,
                        'product_name' => $product->title,
                        'product_sku'  => $product->sku ?? null,
                        'price'        => (float) ($calculated['discounted_price'] ?? 0),
                        'discount'     => $itemDiscount,
                        'quantity'     => $qty,
                        'total'        => round((float) ($calculated['total_price'] ?? 0), 2),
                    ]);
                }

                // Cart items delete
                $cart->items()->delete();

                return $order;
            });

            Log::info('PAYMENT_FLOW [CO-02] cart order created', [
                'order_number' => $order->order_number,
                'user_id'      => $request->user()->id,
            ]);
        }

        // ─────────────────────────────────────────────────────────────────────
        // PAYMENT GATEWAY — 
        // ─────────────────────────────────────────────────────────────────────
        $activeGateways = PaymentGateway::query()
            ->enabled()
            ->get()
            ->filter(fn(PaymentGateway $g) => $g->isSupported())
            ->values();

        if ($activeGateways->count() === 1) {
            $gateway = $activeGateways->first();

            Log::info('PAYMENT_FLOW [CO-03] single active gateway auto-start', [
                'order_number' => $order->order_number,
                'gateway'      => $gateway->slug,
            ]);

            $result = $paymentService->processPayment($order, $gateway->slug, [
                'currency' => 'USD',
            ]);

            if (! ($result['success'] ?? false)) {
                Log::warning('PAYMENT_FLOW [CO-04] auto-start payment failed', [
                    'order_number' => $order->order_number,
                    'gateway'      => $gateway->slug,
                    'message'      => $result['message'] ?? null,
                ]);

                return redirect()
                    ->route('user.checkout.gateway', ['order' => $order->order_number])
                    ->with('toast', [
                        'type'    => 'error',
                        'message' => $result['message'] ?? 'Failed to start payment.',
                    ]);
            }

            return Inertia::location($result['checkout_url']);
        }

        Log::info('PAYMENT_FLOW [CO-05] multiple gateways, redirecting to gateway page', [
            'order_number'  => $order->order_number,
            'gateway_count' => $activeGateways->count(),
        ]);

        return redirect()->route('user.checkout.gateway', ['order' => $order->order_number]);
    }

    public function gateway(Request $request, string $order): Response
    {
        $orderModel = Order::query()
            ->where('order_number', $order)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $gateways = PaymentGateway::query()
            ->enabled()
            ->get()
            ->filter(fn(PaymentGateway $g) => $g->isSupported())
            ->map(fn(PaymentGateway $g) => [
                'slug' => $g->slug,
                'name' => $g->name,
            ])
            ->values();

        return Inertia::render('user/order/gateway', [
            'orderNumber' => $orderModel->order_number,
            'gateways'    => $gateways,
            'grandTotal'  => (float) $orderModel->grand_total,
        ]);
    }

    public function start(Request $request, PaymentService $paymentService): BaseResponse
    {
        Log::info('PAYMENT_FLOW [CO-06] checkout start called', [
            'user_id' => $request->user()?->id,
            'payload' => $request->only(['order_number', 'gateway']),
        ]);

        $validated = $request->validate([
            'order_number' => ['required', 'string', 'max:32'],
            'gateway'      => ['required', 'string', 'max:60'],
        ]);

        $order = Order::query()
            ->where('order_number', $validated['order_number'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $gateway = PaymentGateway::query()
            ->where('slug', $validated['gateway'])
            ->where('is_active', true)
            ->firstOrFail();

        $maxAttempts  = max((int) config('services.payment.max_attempts', 3), 1);
        $attemptCount = (int) $order->payments()->count();

        if ($attemptCount >= $maxAttempts) {
            return redirect()
                ->route('user.payment.cancel', ['orderId' => $order->order_number])
                ->withErrors(['payment' => 'Maximum payment attempts reached for this order.']);
        }

        // Allow retry when previous attempt moved order to cancelled/failed
        if (
            in_array($order->order_status?->value ?? (string) $order->order_status, [
                OrderStatus::CANCELLED->value,
                OrderStatus::FAILED->value,
            ], true)
            && (($order->payment_status?->value ?? (string) $order->payment_status) !== OrderPaymentStatus::PAID->value)
        ) {
            $order->update([
                'order_status'   => OrderStatus::INITIALIZED->value,
                'payment_status' => OrderPaymentStatus::UNPAID->value,
            ]);
            $order->refresh();
        }

        $result = $paymentService->processPayment($order, $gateway->slug, [
            'currency' => 'USD',
        ]);

        if (! ($result['success'] ?? false)) {
            Log::warning('PAYMENT_FLOW [CO-07] checkout start failed', [
                'order_number' => $order->order_number,
                'gateway'      => $gateway->slug,
                'message'      => $result['message'] ?? null,
            ]);

            return redirect()
                ->back()
                ->with('toast', [
                    'type'    => 'error',
                    'message' => $result['message'] ?? 'Failed to start payment.',
                ]);
        }

        Log::info('PAYMENT_FLOW [CO-08] checkout start redirecting to gateway URL', [
            'order_number' => $order->order_number,
            'gateway'      => $gateway->slug,
        ]);

        return Inertia::location($result['checkout_url']);
    }
}