<?php

namespace App\Http\Controllers\Frontend;

use App\Enums\PaymentMethod;
use App\Http\Controllers\Controller;
use App\Services\CartService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService,
        protected CartService $cartService,
    ) {}

    public function orderSuccess(): Response
    {
        $order = $this->orderService->getLatestOrder();
        $order->load(['orderItems.product.images', 'orderAddress', 'payment']);

        return Inertia::render('frontend/order-confirmed', [
            'order' => $order,
            'paymentMethod' => collect(PaymentMethod::cases())->map(function ($method) {
                return [
                    'value' => $method->value,
                    'label' => $method->label(),
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subTotal' => 'required',
            'shipping' => 'required',
            'total' => 'required',
        ]);

        try {
            $order = $this->orderService->create($validated);

            session(['payment_pending' => [
                'order_id' => $order->id,
                'encrypted_service_id' => encrypt($order->id),
                'address_id' => $order->orderAddress->id ?? null,
                'payment_method' => 'stripe',
                'amount' => $order->total,
                'created_at' => now()->timestamp,
                'user_id' => auth('web')->id(),
            ]]);

            return redirect()->route('frontend.shipping-info');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create order: '.$e->getMessage());
        }
    }

    public function placeOrder(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'State' => 'required|string|max:100',
            'postalCode' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'subTotal' => 'required',
            'shipping' => 'required',
            'total' => 'required',
        ]);

        try {
            $paymentSession = session('payment_pending');

            if ($this->paymentPendingIsValid($paymentSession)) {
                $orderId = $paymentSession['order_id'];
                $order = $this->orderService->orderPlace($validated, $orderId);
            } else {
                session()->forget('payment_pending');

                $totals = $this->cartService->getCheckoutTotalsForAuthenticatedUser();
                if ($totals['empty']) {
                    return redirect()->route('frontend.cart.index')->with('error', 'Your cart is empty.');
                }

                $order = $this->orderService->create([
                    'subTotal' => $totals['subtotal'],
                    'shipping' => $totals['shipping'],
                    'total' => $totals['total'],
                ]);

                session(['payment_pending' => [
                    'order_id' => $order->id,
                    'encrypted_service_id' => encrypt($order->id),
                    'address_id' => $order->orderAddress->id ?? null,
                    'payment_method' => 'stripe',
                    'amount' => $order->total,
                    'created_at' => now()->timestamp,
                    'user_id' => auth('web')->id(),
                ]]);

                $validatedWithTotals = array_merge($validated, [
                    'subTotal' => $totals['subtotal'],
                    'shipping' => $totals['shipping'],
                    'total' => $totals['total'],
                ]);

                $order = $this->orderService->orderPlace($validatedWithTotals, $order->id);
            }

            session(['payment_pending' => [
                'order_id' => $order->id,
                'encrypted_service_id' => encrypt($order->id),
                'address_id' => $order->orderAddress->id,
                'payment_method' => 'stripe',
                'amount' => $order->total,
                'created_at' => now()->timestamp,
                'user_id' => auth('web')->id(),
                'step' => 'payment_started',
            ]]);

            return redirect()->route('user.payment.start');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to place order: '.$e->getMessage());
        }
    }

    /**
     * @param  array<string, mixed>|null  $session
     */
    private function paymentPendingIsValid(?array $session): bool
    {
        if (! $session || empty($session['order_id'])) {
            return false;
        }

        if (($session['user_id'] ?? null) !== auth('web')->id()) {
            session()->forget('payment_pending');

            return false;
        }

        if (now()->timestamp - ($session['created_at'] ?? 0) > 300) {
            session()->forget('payment_pending');

            return false;
        }

        return true;
    }
}
