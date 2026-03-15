<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\User;
use App\Services\FeedbackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    protected FeedbackService $feedbackService;

    public function __construct(FeedbackService $feedbackService)
    {
        $this->feedbackService = $feedbackService;
    }

    public function index(): Response
    {
        return Inertia::render('user/feedback/index');
    }

    public function create($id): Response
    {
        // Find the order item to get both product_id and order_id
        $orderItem = OrderItem::find($id);

        if (!$orderItem) {
            abort(404, 'Order item not found');
        }

        return Inertia::render('user/product-to-review/review', [
            'id' => $orderItem->product_id,
            'order_id' => $orderItem->order_id,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'message' => 'required|string|min:10|max:1000',
            'product_id' => 'required|exists:products,id',
            'order_id' => 'required|exists:orders,id',
        ]);



        try {

            $this->feedbackService->create([
                'user_id' => Auth::guard('web')->id(),
                'product_id' => $validated['product_id'],
                'order_id' => $validated['order_id'],
                'rating' => $validated['rating'],
                'message' => $validated['message'],
                'creater_id' => Auth::guard('web')->id(),
                'creater_type' => User::class,
            ]);


            return redirect()->route('user.product-to-review')
                ->with('success', 'Review submitted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to submit review. Please try again.');
        }
    }


    public function show($id): Response
    {
        return Inertia::render('user/feedback/show', [
            'id' => $id,
        ]);
    }
}
