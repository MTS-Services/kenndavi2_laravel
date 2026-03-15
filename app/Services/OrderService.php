<?php

namespace App\Services;

use App\Enums\OrderPaymentStatus;
use App\Enums\OrderStatus;
use App\Mail\OrderConfirmedMail;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderAddresse;
use App\Models\OrderItem;
use App\Models\User;
use App\Services\ProductService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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
        protected ProductService $productService,
    ) {}

    public function getAllOrders()
    {
        return $this->order::with(['orderItems.product.images', 'orderAddress'])
            ->latest()
            ->get();
    }

    public function getLatestOrder()
    {
        return $this->order::with(['orderItems.product.images', 'orderAddress'])
            ->where('user_id', auth('web')->id())
            ->latest()
            ->first();
    }

    public function getOrdersByUserId()
    {
        return $this->order::with(['orderItems.product.images', 'orderAddress'])
            ->where('user_id', auth('web')->id())
            ->latest()
            ->get();
    }

    public function getOrderByDeliverd()
    {
        return $this->order::with(['orderItems.product.images', 'orderAddress'])
            ->where('user_id', auth('web')->id())
            ->where('order_status', OrderStatus::DELIVERED)
            ->latest()
            ->get();
    }

    public function create(array $data = [])
    {
        $user = Auth::guard('web')->user();

        $cart = $this->card::with(['items.product'])
            ->where('user_id', auth('web')->id())
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            throw new \Exception('Cart is empty');
        }

        return DB::transaction(function () use ($data, $user, $cart) {

            $order = $this->order::create([
                'user_id'        => $user->id,
                'order_number'   => '#ORD-' . time(),
                'subtotal'       => $data['subTotal'] ?? 0,
                'shipping_cost'  => $data['shipping'] ?? 0,
                'tax'            => 0,
                'total'          => $data['total'] ?? 0,
                'currency'       => 'USD',
                'payment_status' => OrderPaymentStatus::UNPAID->value,
                'order_status'   => OrderStatus::CONFIRMED->value,
                'notes'          => null,
                'creater_id'     => $user->id,
                'creater_type'   => User::class,
            ]);

            if (!empty($data)) {
                $this->orderAddresse::create([
                    'order_id'      => $order->id,
                    'full_name'     => $data['name'],
                    'phone'         => $data['phone'],
                    'email'         => $data['email'],
                    'address_line1' => $data['address_line1'],
                    'address_line2' => $data['address_line2'] ?? null,
                    'city'          => $data['city'],
                    'state'         => $data['State'],
                    'postal_code'   => $data['postalCode'],
                    'country'       => $data['country'],
                    'creater_id'    => $user->id,
                    'creater_type'  => User::class,
                ]);
            }

            $items         = [];
            $totalDiscount = 0;

            foreach ($cart->items as $item) {
                if ($item->product) {
                    $calculatedData = $this->productService->getProductCalculatedData(
                        $item->product,
                        $item->quantity
                    );

                    $itemDiscount   = $calculatedData['discount_amount'] * $item->quantity;
                    $totalDiscount += $itemDiscount;

                    $items[] = [
                        'order_id'     => $order->id,
                        'product_id'   => $item->product_id,
                        'product_name' => $item->product->title,
                        'product_sku'  => $item->product->sku,
                        'price'        => $calculatedData['discounted_price'],
                        'discount'     => $itemDiscount,
                        'quantity'     => $item->quantity,
                        'total'        => $calculatedData['total_price'],
                        'created_at'   => now(),
                        'creater_id'   => $user->id,
                        'creater_type' => User::class,
                    ];
                }
            }

            $order->update(['discount' => $totalDiscount]);

            $this->orderItem::insert($items);

            $cart->delete();


            $order->load('orderAddress', 'orderItems');
            Mail::to($data['email'])->send(new OrderConfirmedMail($order));

            return $order;
        });
    }
}
