<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TermsAndCondition;
use App\Services\CartService;
use App\Services\FeedbackService;
use App\Services\ProductService;
use App\Services\RecipeService;
use App\Services\UserAccountSettinsService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    protected ProductService $productService;

    protected UserAccountSettinsService $userAccountService;

    protected RecipeService $recipeService;

    protected CartService $cartService;

    protected FeedbackService $feedbackService;

    public function __construct(ProductService $productService, UserAccountSettinsService $userAccountService, RecipeService $recipeService, CartService $cartService, FeedbackService $feedbackService)
    {
        $this->productService = $productService;
        $this->userAccountService = $userAccountService;
        $this->recipeService = $recipeService;
        $this->cartService = $cartService;
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
            'feedbacks' => $feedbacks,
        ]);
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('frontend/privacy-policy');
    }

    public function productDetails($id): Response
    {
        $product        = $this->productService->getById($id);
        $calculatedData = $this->productService->getProductCalculatedData($product);

        $page        = (int) request()->get('feedback_page', 1);
        $feedbackData = $this->feedbackService->getFeedbacksByProductId($id, 10, $page);

        return Inertia::render('frontend/product-details', [
            'product'          => $product,
            'calculated'       => $calculatedData,
            'feedbacks'        => $feedbackData['feedbacks'],
            'rating_breakdown' => $feedbackData['rating_breakdown'],
            'average_rating'   => $feedbackData['average_rating'],
            'total_reviews'    => $feedbackData['total_reviews'],
            'pagination'       => $feedbackData['pagination'],
        ]);
    }

    public function shippingInfo(): Response|RedirectResponse
    {
        $data = $this->userAccountService->getShippingInfo();
        $shippingCost = $this->productService->getShippingCost();

        if ($data['user']) {
            $data['user']->load('addresses');
        }

        $buyNow = session()->get('buy_now');

        if ($buyNow) {
            $product = Product::with(['images' => function ($q) {
                $q->orderBy('is_primary', 'desc')->orderBy('id', 'asc');
            }])->find($buyNow['product_id']);

            if (!$product) {
                session()->forget('buy_now');
                return redirect()->route('frontend.cart.index')->with('error', 'Product not found.');
            }

            $productService = app(ProductService::class);
            $calculated = $productService->getProductCalculatedData($product, $buyNow['quantity']);

            $fakeItem = (object)[
                'id' => null,
                'product_id' => $product->id,
                'quantity' => $buyNow['quantity'],
                'product' => $product,
                'calculated' => $calculated,
            ];

            $cartItems = collect([$fakeItem]);
            $subtotal = (float)($calculated['total_price'] ?? 0);
            $shipping = $subtotal <= 1 ? 0.0 : (float)$shippingCost;

            $data = array_merge($data, [
                'cart' => null,
                'cartItems' => $cartItems,
                'shippingCost' => $shipping,
                'formattedShippingCost' => '$' . number_format($shipping, 2),
                'isBuyNow' => true,
                'buyNowData' => $buyNow,
            ]);
        } else {
            $cartDatas = $this->cartService->getAllDatas();

            if ($cartDatas['cart'] === null || $cartDatas['cartItems']->isEmpty()) {
                return redirect()->route('frontend.cart.index')->with('error', 'Your cart is empty.');
            }

            $data = array_merge($data, $cartDatas, [
                'shippingCost' => $shippingCost,
                'formattedShippingCost' => '$' . number_format($shippingCost, 2),
                'isBuyNow' => false,
            ]);
        }

        return Inertia::render('frontend/shipping-info', $data);
    }

    public function sauceRecipes(): Response
    {
        $recipes = $this->recipeService->getAllDatats();

        return Inertia::render('frontend/sauce-recipes', [
            'recipes' => $recipes,
        ]);
    }

    public function recipeDetails($id): Response
    {
        $recipe = $this->recipeService->getById($id);

        return Inertia::render('frontend/recipe-details', [
            'recipe' => $recipe,
        ]);
    }

    public function productCard(): RedirectResponse
    {
        return redirect()->route('frontend.cart.index');
    }

    public function termsConditions(): Response
    {
        $termsAndCondition = TermsAndCondition::first();

        return Inertia::render('frontend/terms-conditions', [
            'termsAndCondition' => $termsAndCondition,
        ]);
    }
}
