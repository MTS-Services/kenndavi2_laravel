<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

Route::name('frontend.')->controller(FrontendController::class)->group(function () {

    Route::get('/', 'index')->name('home');
    Route::get('/details', 'details')->name('details');
    Route::get('/shopping-info', 'shoppingInfo')->name('shopping-info');
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy');
});
