<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
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
        $product = $this->productService->getById($id);
        $calculatedData = $this->productService->getProductCalculatedData($product);
        $feedbackData = $this->feedbackService->getFeedbacksByProductId($id);

        return Inertia::render('frontend/product-details', [
            'product' => $product,
            'calculated' => $calculatedData,
            'feedbacks' => $feedbackData['feedbacks'],
            'rating_breakdown' => $feedbackData['rating_breakdown'],
            'average_rating' => $feedbackData['average_rating'],
            'total_reviews' => $feedbackData['total_reviews'],
        ]);
    }

    public function shippingInfo(): Response|RedirectResponse
    {
        $data = $this->userAccountService->getShippingInfo();
        $shippingCost = $this->productService->getShippingCost();

        if ($data['user']) {
            $data['user']->load('addresses');
        }

        // Checkout step uses the authenticated user's cart (no pre-created order required).
        $cartDatas = $this->cartService->getAllDatas();

        if ($cartDatas['cart'] === null || $cartDatas['cartItems']->isEmpty()) {
            return redirect()->route('frontend.cart.index')->with('error', 'Your cart is empty.');
        }

        // Merge cart data with existing data and shipping cost
        $data = array_merge($data, $cartDatas, [
            'shippingCost' => $shippingCost,
            'formattedShippingCost' => '$'.number_format($shippingCost, 2),
        ]);

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
