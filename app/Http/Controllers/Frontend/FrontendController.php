<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{

    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }


    public function index(): Response
    {
        $products = $this->productService->getPaginated(10);

        return Inertia::render('frontend/index', [
            'products' => $products
        ]);
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('frontend/privacy-policy');
    }

    public function details(): Response
    {
        return Inertia::render('frontend/product-details');
    }

    public function shoppingInfo(): Response
    {
        return Inertia::render('frontend/shopping-info');
    }

    public function orderConfirmed(): Response
    {
        return Inertia::render('frontend/order-confirmed');
    }
    public function sauceRecipes(): Response
    {
        return Inertia::render('frontend/sauce-recipes');
    }
    public function recipeDetails(): Response
    {
        return Inertia::render('frontend/recipe-details');
    }
    public function productCard(): Response
    {
        return Inertia::render('frontend/product-card');
    }
    public function termsConditions(): Response
    {
        return Inertia::render('frontend/terms-conditions');
    }
}
