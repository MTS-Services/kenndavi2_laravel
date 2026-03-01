<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\User\UserAuthController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->name('login.post');
Route::get('/register', [UserAuthController::class, 'register'])->name('register');
Route::post('/register', [UserAuthController::class, 'registerStore'])->name('register.post');
Route::get('forgot-password', [UserAuthController::class, 'forgotPassword'])->name('forgot-password');
Route::get('reset-password', [UserAuthController::class, 'resetPassword'])->name('reset-password');

Route::prefix('user')->name('user.')->group(function () {
    // Authentication Routes...
    Route::get('/pending-verification', [UserController::class, 'accountPending'])->name('pending-verification');
    Route::middleware(['auth'])->controller(UserController::class)->group(function () {
        Route::post('/logout', [UserAuthController::class, 'logout'])->name('logout');

        Route::get('/dashboard', 'index')->name('dashboard');
        Route::get('/orders', 'orders')->name('orders');
        Route::get('product-to-review', 'productToReview')->name('product-to-review');
        Route::get('review', 'review')->name('review');
       Route::get('account-settings', 'accountSettings')->name('account-settings');

    });

});
