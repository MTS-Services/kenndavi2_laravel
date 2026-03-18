<?php

use App\Http\Controllers\Frontend\CartController;
use App\Http\Controllers\Frontend\FrontendController;
use App\Http\Controllers\Frontend\OrderController;
use Illuminate\Support\Facades\Route;

Route::name('frontend.')->controller(FrontendController::class)->group(function () {

    Route::middleware('auth')->group(function () {

        Route::get('/shipping-info', 'shippingInfo')->name('shipping-info');
        Route::group(['prefix' => 'orders', 'as' => 'orders.'], function () {
            Route::get('/order-confirmed', [OrderController::class, 'orderConfirmed'])->name('order-confirmed');
            Route::post('/store', [OrderController::class, 'store'])->name('store');
        });
    });

    Route::get('/', 'index')->name('home');
    Route::get('/product-details/{id}', 'productDetails')->name('product-details');
    Route::get('/product-card', 'productCard')->name('product-card');
    Route::get('/sauce-recipes', 'sauceRecipes')->name('sauce-recipes');
    Route::get('/recipe-details/{id}', 'recipeDetails')->name('recipe-details');
    Route::get('/terms-conditions', 'termsConditions')->name('terms-conditions');

    Route::group(['prefix' => 'cart', 'as' => 'cart.'], function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::post('/add', [CartController::class, 'add'])->name('add');
        Route::post('/update', [CartController::class, 'update'])->name('update');
        Route::delete('/remove/{id}', [CartController::class, 'remove'])->name('remove');
    });
});
