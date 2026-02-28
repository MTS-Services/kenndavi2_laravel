<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('frontend/index');
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
}
