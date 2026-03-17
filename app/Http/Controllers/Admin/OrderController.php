<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        $orders = $this->orderService->getAllOrders();
        $orderStats = $this->orderService->getAdminOrderStats();

        return Inertia::render('admin/order-management/index', [
            'orders'        => $orders,
            'statusOptions' => OrderStatus::options(),
            'orderStats'    => $orderStats,
        ]);
    }

    // OrderController.php
    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->update(['order_status' => $request->order_status]);

        return back()->with([
            'success' => 'Order status updated successfully'
        ]);
    }
    public function create()
    {
        return Inertia::render('admin/order-management/create');
    }
}
