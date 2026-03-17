<?php

namespace App\Http\Controllers\Frontend;

use App\Enums\PaymentMethod;
use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    protected OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    

public function orderConfirmed(): Response
{
    $order = $this->orderService->getLatestOrder();
    $order->load(['orderItems.product.images', 'orderAddress', 'payment']);
    return Inertia::render('frontend/order-confirmed', [
        'order' => $order,
        'paymentMethod' => collect(PaymentMethod::cases())->map(function($method) {
            return [
                'value' => $method->value,
                'label' => $method->label(),
            ];
        })
    ]);
}

    public function store(Request $request)
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
            $order = $this->orderService->create($validated);
            
            // Set up payment session data
            session(['payment_pending' => [
                'order_id' => $order->id,
                'encrypted_service_id' => encrypt($order->id),
                'address_id' => $order->orderAddress->id,
                'payment_method' => 'stripe',
                'amount' => $order->total,
            ]]);
            
            return redirect()->route('user.payment.start');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create order: ' . $e->getMessage());
        }
    }

}