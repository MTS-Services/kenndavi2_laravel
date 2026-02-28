<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\User\UserAuthController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->name('login.post');
Route::get('/register', [UserAuthController::class, 'register'])->name('register');
Route::post('/register', [UserAuthController::class, 'registerStore'])->name('register.post');
Route::prefix('user')->name('user.')->group(function () {
    Route::get('/choose-user', [UserAuthController::class, 'userChoose'])->name('choose');
    // Authentication Routes...
    Route::get('/pending-verification', [UserController::class, 'accountPending'])->name('pending-verification');
    Route::middleware(['auth'])->controller(UserController::class)->group(function () {
        Route::post('/logout', [UserAuthController::class, 'logout'])->name('logout');

        Route::get('/dashboard', 'index')->name('dashboard');
        Route::get('/orders', 'orders')->name('orders');

    });

});
