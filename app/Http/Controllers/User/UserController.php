<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('user/dashboard');
    }
    public function orders(): Response
    {
        return Inertia::render('user/order/orders');
    }
    public function productToReview(): Response
    {
        return Inertia::render('user/product-to-review/product-to-review');
    }
    public function review(): Response
    {
        return Inertia::render('user/product-to-review/review');
    }

}
