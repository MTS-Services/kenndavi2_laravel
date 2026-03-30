<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\User\FeedbackController;
use App\Http\Controllers\User\GoogleAuthController;
use App\Http\Controllers\User\PaymentController;
use App\Http\Controllers\User\UserAuthController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->name('login.post');
Route::get('/register', [UserAuthController::class, 'register'])->name('register');
Route::post('/register', [UserAuthController::class, 'registerStore'])->name('register.post');
Route::get('/email-verification', [UserAuthController::class, 'emailVerification'])->name('email-verification');
Route::post('/email-verification', [UserAuthController::class, 'emailVerificationStore'])->name('email-verification.post');
Route::get('forgot-password', [UserAuthController::class, 'forgotPassword'])->name('forgot-password');
Route::post('forgot-password', [UserAuthController::class, 'forgotPasswordStore'])->name('forgot-password.post');
Route::get('/otp-verification', [UserAuthController::class, 'otpVerification'])->name('otp-verification');
Route::post('/otp-verification', [UserAuthController::class, 'otpVerificationStore'])->name('otp-verification.post');
Route::get('reset-password', [UserAuthController::class, 'resetPassword'])->name('reset-password');
Route::post('reset-password', [UserAuthController::class, 'resetPasswordStore'])->name('reset-password.post');

Route::prefix('user')->name('user.')->group(function () {
    // Authentication Routes...
    Route::get('/pending-verification', [UserController::class, 'accountPending'])->name('pending-verification');
    Route::middleware(['auth'])->group(function () {

        Route::controller(UserController::class)->group(function () {
            Route::get('/dashboard', 'index')->name('dashboard');
            Route::get('/orders', 'orders')->name('orders');
            Route::get('/orders-details/{id}', 'orderDetails')->name('order-details');
            Route::get('/product-to-review', 'productToReview')->name('product-to-review');
            Route::get('/review', 'review')->name('review');
            Route::get('/account-settings', 'accountSettings')->name('account-settings');

            Route::post('/account-settings-update', 'accountSettingsUpdate')->name('account-settings.update');
            Route::post('/change-password', 'changePassword')->name('change-password');
            Route::post('/image-update', 'imageUpdate')->name('image-update');
            Route::post('/billing-address', 'billingAddress')->name('billing-address');
            Route::post('/shipping-address', 'shippingAddress')->name('shipping-address');
        });

        Route::post('/logout', [UserAuthController::class, 'logout'])->name('logout');

        Route::group(['prefix' => 'feedback', 'as' => 'fd.'], function () {
            Route::get('/index', [FeedbackController::class, 'index'])->name('index');
            Route::get('/create/{id}', [FeedbackController::class, 'create'])->name('create');
            Route::post('/store', [FeedbackController::class, 'store'])->name('store');
            Route::get('/{id}/view', [FeedbackController::class, 'show'])->name('view');
        });

        Route::controller(PaymentController::class)->prefix('payment')->name('payment.')->group(function () {
            Route::get('/start', 'start')->name('start');
            Route::get('/success/{gateway}', 'success')->name('success');
            Route::get('/cancel/{orderId}', 'cancel')->name('cancel');
        });
    });
});


Route::prefix('user')->name('user.')->group(function () {
    Route::get('auth/google', [GoogleAuthController::class, 'redirect'])->name('auth.google');
    Route::get('auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
});
