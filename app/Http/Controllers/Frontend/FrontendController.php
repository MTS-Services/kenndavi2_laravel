<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\TermsAndCondition;
use App\Services\CartService;
use App\Services\FeedbackService;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Services\RecipeService;
use App\Services\UserAccountSettinsService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class FrontendController extends Controller
{

    protected ProductService $productService;
    protected UserAccountSettinsService $userAccountService;
    protected RecipeService $recipeService;
    protected CartService $cartService;
    protected FeedbackService $feedbackService;
    protected OrderService $orderService;

    public function __construct(ProductService $productService, UserAccountSettinsService $userAccountService, RecipeService $recipeService, CartService $cartService, FeedbackService $feedbackService, OrderService $orderService)
    {
        $this->productService = $productService;
        $this->userAccountService = $userAccountService;
        $this->recipeService = $recipeService;
        $this->cartService = $cartService;
        $this->feedbackService = $feedbackService;
        $this->orderService = $orderService;
        $this->feedbackService = $feedbackService;
    }


    public function index(): Response
    {
        $products = $this->productService->getPaginated(10);
        $recipes = $this->recipeService->getAll(6);
        $feedbacks = $this->feedbackService->getAllFeedbacks()->load('user');

        return Inertia::render('frontend/index', [
            'products' => $products,
            'recipes' => $recipes,
            'feedbacks' => $feedbacks
        ]);
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('frontend/privacy-policy');
    }

    public function productDetails($id): Response
    {
        $product = $this->productService->getById($id);
        $calculatedData = $this->productService->getProductCalculatedData($product);
        $feedbackData = $this->feedbackService->getFeedbacksByProductId($id);

        return Inertia::render('frontend/product-details', [
            'product' => $product,
            'calculated' => $calculatedData,
            'feedbacks' => $feedbackData['feedbacks'],
            'rating_breakdown' => $feedbackData['rating_breakdown'],
            'average_rating' => $feedbackData['average_rating'],
            'total_reviews' => $feedbackData['total_reviews']
        ]);
    }

    public function shippingInfo(): Response|RedirectResponse
    {
        $data = $this->userAccountService->getShippingInfo();
        $shippingCost = $this->productService->getShippingCost();

        if ($data['user']) {
            $data['user']->load('addresses');
        }

        /*
        // Security: Check if payment session exists and is valid
        $paymentSession = session('payment_pending');
        if ($paymentSession) {
            // Security: Verify user ID matches
            if ($paymentSession['user_id'] !== auth('web')->id()) {
                session()->forget('payment_pending');
                return redirect()->route('frontend.cart.index')->with('error', 'Invalid payment session');
            }

            // Security: Check session age (5 minutes max)
            if (now()->timestamp - ($paymentSession['created_at'] ?? 0) > 300) {
                session()->forget('payment_pending');
                return redirect()->route('frontend.cart.index')->with('error', 'Payment session expired');
            }

            // Get the latest order from session using service
            $orderId = $paymentSession['order_id'];
            if ($orderId) {
                $order = $this->orderService->getOrderById($orderId);
                $data['order'] = $order;
                $data['orderItems'] = $order ? $order->orderItems : [];
            } else {
                $data['order'] = null;
                $data['orderItems'] = [];
            }
        } else {
            // No payment session - redirect to cart
            return redirect()->route('frontend.cart.index')->with('error', 'No active payment session');
        }
            */

        $cartDatas = $this->cartService->getAllDatas();

        // Merge cart data with existing data and shipping cost
        $data = array_merge($data, $cartDatas, [
            'shippingCost' => $shippingCost,
            'formattedShippingCost' => '$' . number_format($shippingCost, 2),
        ]);

        return Inertia::render('frontend/shipping-info', $data);
    }

    public function sauceRecipes(): Response
    {
        $recipes = $this->recipeService->getAllDatats();
        return Inertia::render('frontend/sauce-recipes', [
            'recipes' => $recipes
        ]);
    }
    public function recipeDetails($id): Response
    {
        $recipe = $this->recipeService->getById($id);
        return Inertia::render('frontend/recipe-details', [
            'recipe' => $recipe
        ]);
    }
    public function productCard(): Response
    {
        return Inertia::render('frontend/product-card');
    }
    public function termsConditions(): Response
    {
        $termsAndCondition = TermsAndCondition::first();
        return Inertia::render('frontend/terms-conditions', [
            'termsAndCondition' => $termsAndCondition
        ]);
    }
}
