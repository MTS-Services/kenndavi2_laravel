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

    public function __construct()
    {
        $this->orderService = app()->make(OrderService::class);
    }

public function index()
{
    $orders = $this->orderService->getAllOrders();

    return Inertia::render('admin/order-management/index', [
        'orders'        => $orders,
        'statusOptions' => OrderStatus::options(),
    ]);
}

public function updateStatus(Request $request, $orderNumber)
{
    $enumValues = array_column(OrderStatus::cases(), 'value');

    $validated = $request->validate([
        'status' => ['required', 'string', \Illuminate\Validation\Rule::in($enumValues)],
    ]);

    $order = Order::where('order_number', $orderNumber)->firstOrFail();

    $order->update(['order_status' => $validated['status']]);

    return response()->json([
        'success' => true,
        'message' => 'Order status updated successfully',
    ]);
}

    public function create()
    {
        return Inertia::render('admin/order-management/create');
    }
}
