<?php

namespace App\Services;

use App\Enums\OrderPaymentStatus;
use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderAddresse;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class OrderService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected Order $order,
        protected Cart $card,
        protected OrderAddresse $orderAddresse,
        protected OrderItem $orderItem,
    ) {}

    public function create(array $data = [])
    {
        $user = Auth::guard('web')->user();

        $cart = $this->card::with('items')
            ->where('user_id', auth('web')->id())
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            throw new \Exception('Cart is empty');
        }
        $order = $this->order::create([
            'user_id' => $user->id,
            'order_number' => '#' . time(),
            'subtotal' => $data['subTotal'] ?? 0,
            'discount' => 0,
            'shipping_cost' => $data['shipping'] ?? 0,
            'tax' => 0,
            'total' => $data['total'] ?? 0,
            'currency' => 'USD',
            'payment_status' => OrderPaymentStatus::UNPAID->value,
            'order_status' => OrderStatus::CONFIRMED->value,
            'notes' => null,
            'creater_id' => $user->id,
            'creater_type' => User::class,
        ]);

        // Create order address if shipping data provided
        if (!empty($data)) {
            $this->orderAddresse::create([
                'order_id' => $order->id,
                'full_name' => $data['name'],
                'phone' => $data['phone'],
                'address_line1' => $data['address_line1'],
                'address_line2' => $data['address_line2'] ?? null,
                'city' => $data['city'],
                'state' => $data['State'],
                'postal_code' => $data['postalCode'],
                'country' => $data['country'],
                'creater_id' => $user->id,
                'creater_type' => User::class,
            ]);
        }

        $items = [];
        foreach ($cart->items as $item) {
            $items[] = [
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'product_name' => $item->product->title,
                'product_sku' => $item->product->sku,
                'price' => $item->product->price,
                'discount' => 0,
                'quantity' => $item->quantity,
                'total' => $data['total'] ?? 0,
                'created_at' => now(),
                'creater_id' => $user->id,
                'creater_type' => User::class,
            ];
        }

        $this->orderItem::insert($items);

        $cart->delete();

        return $order;
    }
}
