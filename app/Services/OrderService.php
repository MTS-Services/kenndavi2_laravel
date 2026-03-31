<?php

namespace App\Services;

use App\Enums\OrderPaymentStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Mail\OrderConfirmedMail;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderAddresse;
use App\Models\OrderItem;
use App\Models\User;
use App\Services\ProductService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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

    public function getOrderStats()
    {
        $orders = $this->order::where('user_id', auth('web')->id())->get();
        
        return [
            'pending' => $orders->where('order_status', OrderStatus::PENDING->value)->count(),
            'confirmed' => $orders->where('order_status', OrderStatus::CONFIRMED->value)->count(),
            'processing' => $orders->where('order_status', OrderStatus::PROCESSING->value)->count(),
            'shipped' => $orders->where('order_status', OrderStatus::SHIPPED->value)->count(),
            'delivered' => $orders->where('order_status', OrderStatus::DELIVERED->value)->count(),
            'cancelled' => $orders->where('order_status', OrderStatus::CANCELLED->value)->count(),
        ];
    }

    public function getAdminOrderStats()
    {
        $orders = $this->order::all();
        
        return [
            'pending' => $orders->where('order_status', OrderStatus::PENDING->value)->count(),
            'confirmed' => $orders->where('order_status', OrderStatus::CONFIRMED->value)->count(),
            'processing' => $orders->where('order_status', OrderStatus::PROCESSING->value)->count(),
            'shipped' => $orders->where('order_status', OrderStatus::SHIPPED->value)->count(),
            'delivered' => $orders->where('order_status', OrderStatus::DELIVERED->value)->count(),
            'cancelled' => $orders->where('order_status', OrderStatus::CANCELLED->value)->count(),
        ];
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

    public function getOrderByOrderNumber($orderNumber)
    {
        Log::info('getOrderByOrderNumber called with: ' . $orderNumber);
        
        $order = $this->order::where('order_number', $orderNumber)
            ->with(['orderItems.product.images', 'orderAddress', 'payment'])
            ->first();
            
        if ($order) {
            Log::info('Order found in database: ' . $order->id);
        } else {
            Log::error('Order NOT found in database for: ' . $orderNumber);
            
            // Let's check what order numbers exist
            $allOrders = $this->order::pluck('order_number')->toArray();
            Log::info('Available order numbers: ' . implode(', ', $allOrders));
        }
        
        return $order;
    }

    public function updateOrderStatus($orderId, $status)
    {
        $order = $this->order::find($orderId);
        if (!$order) {
            return false;
        }
        
        $order->update(['order_status' => $status]);
        
        // If order is cancelled, also update payment status
        if ($status === OrderStatus::CANCELLED->value && $order->payment) {
            $order->payment->update(['status' => PaymentStatus::FAILED->value]);
        }
        
        return $order;
    }

    public function getOrderById($id)
    {
        return $this->order::with(['orderItems.product.images', 'orderAddress', 'payment'])
            ->where('id', $id)
            ->first();
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
                'order_status'   => OrderStatus::PENDING->value,
                'notes'          => null,
                'creater_id'     => $user->id,
                'creater_type'   => User::class,
            ]);

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

            return $order;
        });
    }

    public function markOrderAsFailed($orderId)
    {
        $order = $this->order->find($orderId);
        if (!$order) {
            throw new \Exception('Order not found');
        }

        DB::transaction(function () use ($order) {
            // Update order status
            $order->update([
                'order_status' => OrderStatus::CANCELLED->value,
                'payment_status' => OrderPaymentStatus::FAILED->value,
                'updater_id' => auth('web')->id(),
                'updater_type' => User::class,
            ]);

            // Update payment status if payment exists
            if ($order->payment) {
                $order->payment->update([
                    'status' => PaymentStatus::FAILED->value,
                    'updater_id' => auth('web')->id(),
                    'updater_type' => User::class,
                ]);
            }
        });

        return $order;
    }

    public function cancelOrder($orderId)
    {
        $order = $this->order->find($orderId);
        if (!$order) {
            throw new \Exception('Order not found');
        }

        DB::transaction(function () use ($order) {
            // Update order status
            $order->update([
                'order_status' => OrderStatus::CANCELLED->value,
                'payment_status' => OrderPaymentStatus::FAILED->value,
                'updater_id' => auth('web')->id(),
                'updater_type' => User::class,
            ]);

            // Update payment status if payment exists
            if ($order->payment) {
                $order->payment->update([
                    'status' => PaymentStatus::FAILED->value,
                    'updater_id' => auth('web')->id(),
                    'updater_type' => User::class,
                ]);
            }
        });

        return $order;
    }

    public function refundOrder($orderId)
    {
        $order = $this->order->find($orderId);
        if (!$order) {
            throw new \Exception('Order not found');
        }

        DB::transaction(function () use ($order) {
            // Update order status
            $order->update([
                'order_status' => OrderStatus::CANCELLED->value,
                'payment_status' => OrderPaymentStatus::REFUNDED->value,
                'updater_id' => auth('web')->id(),
                'updater_type' => User::class,
            ]);

            // Update payment status if payment exists
            if ($order->payment) {
                $order->payment->update([
                    'status' => PaymentStatus::REFUNDED->value,
                    'updater_id' => auth('web')->id(),
                    'updater_type' => User::class,
                ]);
            }

            // TODO: Implement actual refund logic with payment gateways
            // This would involve API calls to Stripe/PayPal to process refunds
        });
        
        return $order;
    }

    public function orderPlace(array $data = [], $orderId)
    {
        // Get the order by ID
        $order = $this->order->find($orderId);
        if (!$order) {
            throw new \Exception('Order not found');
        }

        // Update order with shipping info and totals
        $order->update([
            'order_status'   => OrderStatus::PROCESSING->value,
            'subtotal'       => $data['subTotal'] ?? $order->subtotal,
            'shipping_cost'  => $data['shipping'] ?? $order->shipping_cost,
            'total'          => $data['total'] ?? $order->total,
            'updater_id'     => auth('web')->id(),
            'updater_type'   => User::class,
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
                'creater_id'    => auth('web')->id(),
                'creater_type'  => User::class,
            ]);

            // Send email after placing order address
            Mail::to($data['email'])->send(new OrderConfirmedMail($order));
        }

        return $order;
    }
}
