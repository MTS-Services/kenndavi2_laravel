<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/order-management/index');
    }
    public function create()
    {
        return Inertia::render('admin/order-management/create');
    }
}
