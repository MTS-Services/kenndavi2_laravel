<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\TermsAndCondition;
use App\Services\ProductService;
use App\Services\RecipeService;
use App\Services\UserAccountSettinsService;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{

    protected ProductService $productService;
    protected UserAccountSettinsService $userAccountService;
    protected RecipeService $recipeService;

    public function __construct(ProductService $productService, UserAccountSettinsService $userAccountService, RecipeService $recipeService)
    {
        $this->productService = $productService;
        $this->userAccountService = $userAccountService;
        $this->recipeService = $recipeService;
    }


    public function index(): Response
    {
        $products = $this->productService->getPaginated(10);
        $recipes = $this->recipeService->getAll(9);

        return Inertia::render('frontend/index', [
            'products' => $products,
            'recipes' => $recipes
        ]);
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('frontend/privacy-policy');
    }

    public function productDetails($id): Response
    {

        $product = $this->productService->getById($id);

        return Inertia::render('frontend/product-details', [
            'product' => $product
        ]);
    }

    public function shoppingInfo(): Response
    {
        $data = $this->userAccountService->getShippingInfo();

        if ($data['user']) {
            $data['user']->load('addresses');
        }
        return Inertia::render('frontend/shopping-info', $data);
    }

    public function orderConfirmed(): Response
    {
        return Inertia::render('frontend/order-confirmed');
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
