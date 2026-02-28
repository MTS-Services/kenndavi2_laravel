<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

Route::name('frontend.')->controller(FrontendController::class)->group(function () {

    Route::get('/', 'index')->name('home');
    Route::get('/details', 'details')->name('details');
    Route::get('/shopping-info', 'shoppingInfo')->name('shopping-info');
    Route::get('/order-confirmed!', 'orderConfirmed')->name('order-confirmed'); 
    Route::get('/sauce-recipes', 'sauceRecipes')->name('sauce-recipes');
    Route::get('/recipe-details', 'recipeDetails')->name('recipe-details');
    Route::get('/product-card', 'productCard')->name('product-card');
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy');
});
