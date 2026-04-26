<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Services\DataTableService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
   

    protected OrderService $orderService;
    protected DataTableService $dataTableService;
     public function __construct(DataTableService $dataTableService,  OrderService $orderService) {
        
        $this->dataTableService = $dataTableService;
        $this->orderService = $orderService;

     }



    public function dashboard(): Response
    {
        $orders = $this->orderService->getAllOrders();
        
        // Calculate dashboard statistics
        $stats = $this->calculateDashboardStats();
        
        // Get sales performance data for chart
        $salesPerformance = $this->getSalesPerformanceData();

        return Inertia::render('admin/dashboard', [
            'orders' => $orders,
            'statusOptions' => OrderStatus::options(),
            'stats' => $stats,
            'salesPerformance' => $salesPerformance,
        ]);
    }

    private function calculateDashboardStats(): array
    {
        $orders = $this->orderService->getAllOrders();
        $thirtyDaysAgo = now()->subDays(30);
        
        // Current period stats (last 30 days)
        $currentPeriodOrders = $orders->filter(function ($order) use ($thirtyDaysAgo) {
            return $order->created_at >= $thirtyDaysAgo;
        });
        
        // Previous period stats (30-60 days ago)
        $previousPeriodStart = now()->subDays(60);
        $previousPeriodEnd = now()->subDays(30);
        $previousPeriodOrders = $orders->filter(function ($order) use ($previousPeriodStart, $previousPeriodEnd) {
            return $order->created_at >= $previousPeriodStart && $order->created_at < $previousPeriodEnd;
        });

        // Calculate totals
        $totalRevenue = $currentPeriodOrders->sum('total');
        $totalOrders = $currentPeriodOrders->count();
        $productsSold = $currentPeriodOrders->sum(function ($order) {
            return $order->orderItems->sum('quantity');
        });

        // Calculate previous period totals for comparison
        $previousRevenue = $previousPeriodOrders->sum('total');
        $previousOrders = $previousPeriodOrders->count();
        $previousProductsSold = $previousPeriodOrders->sum(function ($order) {
            return $order->orderItems->sum('quantity');
        });

        // Calculate percentage changes
        $revenueChange = $previousRevenue > 0 ? (($totalRevenue - $previousRevenue) / $previousRevenue) * 100 : 0;
        $ordersChange = $previousOrders > 0 ? (($totalOrders - $previousOrders) / $previousOrders) * 100 : 0;
        $productsChange = $previousProductsSold > 0 ? (($productsSold - $previousProductsSold) / $previousProductsSold) * 100 : 0;

        return [
            'totalRevenue' => [
                'value' => $totalRevenue,
                'formatted' => '$' . number_format($totalRevenue, 2),
                'change' => round($revenueChange, 1),
            ],
            'totalOrders' => [
                'value' => $totalOrders,
                'formatted' => number_format($totalOrders),
                'change' => round($ordersChange, 1),
            ],
            'productsSold' => [
                'value' => $productsSold,
                'formatted' => number_format($productsSold),
                'change' => round($productsChange, 1),
            ],
        ];
    }

    private function getSalesPerformanceData(): array
    {
        $orders = $this->orderService->getAllOrders();
        
        // Get last 24 weeks of data
        $weeklyData = [];
        $labels = [];
        
        for ($i = 23; $i >= 0; $i--) {
            $weekStart = now()->startOfWeek()->subWeeks($i);
            $weekEnd = $weekStart->copy()->endOfWeek();
            
            $weekRevenue = $orders
                ->filter(function ($order) use ($weekStart, $weekEnd) {
                    return $order->created_at >= $weekStart && $order->created_at <= $weekEnd;
                })
                ->sum('total');
            
            $weeklyData[] = $weekRevenue;
            $labels[] = 'W' . (24 - $i);
        }

        return [
            'labels' => $labels,
            'data' => $weeklyData,
        ];
    }

    public function index(): Response
    {
        $queryBody = Admin::query();

        $result = $this->dataTableService->process($queryBody, request(), [
            'searchable' => ['name', 'email'],
            'sortable' => ['id', 'name', 'email', 'created_at'],
        ]);

        return Inertia::render('admin/all', [
            'admins' => $result['data'],
            'pagination' => $result['pagination'],
            'offset' => $result['offset'],
            'filters' => $result['filters'],
            'search' => $result['search'],
            'sortBy' => $result['sort_by'],
            'sortOrder' => $result['sort_order'],
        ]);
    }

    public function viewAdmin($id)
    {

        $admin = Admin::find($id);
        if (! $admin) {
            abort(404);
        }

        return Inertia::render('admin/view', [
            'admin' => $admin,
        ]);
    }

    public function createAdmin()
    {

        return Inertia::render('admin/create');
    }

    public function storeAdmin(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|unique:admins,username|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $data['password'] = bcrypt($data['password']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
            $file->storeAs('admin_images', $imageName);
            $data['image'] = $imageName;
        }
        $admin = Admin::create($data);
        if (! $admin) {
            return back()->with('error', 'Admin creation failed.');
        }

        return redirect()->route('admin.index')->with('success', 'Admin created successfully.');
    }

    public function editAdmin($id)
    {

        $admin = Admin::find($id);
        if (! $admin) {
            abort(404);
        }

        return Inertia::render('admin/edit', [
            'admin' => $admin,
        ]);
    }

    public function updateAdmin(Request $request)
    {

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $admin = Admin::find($request->id);
        $admin->update($data);

        return back()->with('success', 'Admin updated successfully.');
    }

    public function deleteAdmin($id)
    {
        $admin = Admin::find($id);
        if (! $admin) {
            abort(404);
        }
        $admin->forceDelete();

        return back()->with('success', 'Admin deleted successfully.');
    }

    public function profile()
    {
        $admin = Auth::guard('admin')->user();
        return Inertia::render('admin/profile', [
            'admin' => $admin,
        ]);
    }
    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:255', 'unique:admins,email,' . $admin->id],
            'oldPassword' => ['nullable', 'required_with:password', 'string'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        // Update basic info
        $admin->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
        ]);

        // Update password if provided
        if (!empty($validated['oldPassword']) && !empty($validated['password'])) {
            if (\Illuminate\Support\Facades\Hash::check($validated['oldPassword'], $admin->password)) {
                $admin->update([
                    'password' => \Illuminate\Support\Facades\Hash::make($validated['password']),
                ]);
            } else {
                return back()->withErrors(['oldPassword' => 'The old password is incorrect.']);
            }
        }

        return back()->with('success', 'Profile updated successfully.');
    }
}
