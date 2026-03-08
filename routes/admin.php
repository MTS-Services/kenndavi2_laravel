<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RecipeController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\TermsConditionsController;
use App\Http\Controllers\Admin\UserManagement\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'login'])->name('login.post');
        Route::get('/forgot-password', [AdminAuthController::class, 'forgotPassword'])->name('forgot-password');
        Route::post('/forgot-password', [AdminAuthController::class, 'forgotPasswordStore'])->name('forgot-password.post');
        Route::get('/otp-verification', [AdminAuthController::class, 'otpVerification'])->name('otp-verification');
        Route::post('/otp-verification', [AdminAuthController::class, 'otpVerificationStore'])->name('otp-verification.post');
        Route::get('/reset-password', [AdminAuthController::class, 'resetPassword'])->name('reset-password');
        Route::post('/reset-password', [AdminAuthController::class, 'resetPasswordStore'])->name('reset-password.post');
    });

    Route::middleware('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/all', [AdminController::class, 'index'])->name('index');
        Route::get('/view/detail/{id}', [AdminController::class, 'viewAdmin'])->name('view.detail');
        Route::get('/create', [AdminController::class, 'createAdmin'])->name('create');
        Route::post('/store', [AdminController::class, 'storeAdmin'])->name('store');
        Route::get('/view/edit/{id}', [AdminController::class, 'editAdmin'])->name('edit');
        Route::post('/update', [AdminController::class, 'updateAdmin'])->name('update');
        Route::get('/delete/{id}', [AdminController::class, 'deleteAdmin'])->name('delete');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
        Route::get('/profile', [AdminController::class, 'profile'])->name('profile');
        Route::post('/profile/update', [AdminController::class, 'updateProfile'])->name('profile.update');

        Route::group(['prefix' => 'users', 'as' => 'um.'], function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
            Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
            Route::get('/user/{id}/view', [UserController::class, 'show'])->name('user.view');
            Route::get('/user/{id}/edit', [UserController::class, 'edit'])->name('user.edit');
            Route::put('/user/{id}', [UserController::class, 'update'])->name('user.update');
            Route::get('/users/{id}', [UserController::class, 'destroy'])->name('user.destroy');
            Route::get('/pending-verification', [UserController::class, 'pendingVerification'])->name('user.pending-verification');
            Route::get('/user/verify/{id}', [UserController::class, 'verified'])->name('user.verify');
        });
        Route::group(['prefix' => 'product-management', 'as' => 'pm.'], function () {
            Route::get('/index', [ProductController::class, 'index'])->name('index');
            Route::get('/create', [ProductController::class, 'create'])->name('create');
            Route::post('/store', [ProductController::class, 'store'])->name('store');
            Route::get('/edit/{id}', [ProductController::class, 'edit'])->name('edit');
            Route::post('/update/{id}', [ProductController::class, 'update'])->name('update');
        });
        Route::group(['prefix' => 'order-management', 'as' => 'om.'], function () {
            Route::get('/index', [OrderController::class, 'index'])->name('index');
            Route::get('/create', [OrderController::class, 'create'])->name('create');
        });
        Route::group(['prefix' => 'recipe-management', 'as' => 'rm.'], function () {
            Route::get('/index', [RecipeController::class, 'index'])->name('index');
            Route::get('/create', [RecipeController::class, 'create'])->name('create');
            Route::post('/store', [RecipeController::class, 'store'])->name('store');
            Route::get('/edit/{id}', [RecipeController::class, 'edit'])->name('edit');
            Route::post('/update/{id}', [RecipeController::class, 'update'])->name('update');
            Route::get('/delete/{id}', [RecipeController::class, 'delete'])->name('delete');
        });
        Route::group(['prefix' => 'terms-conditions', 'as' => 'tc.'], function () {
            Route::get('/index', [TermsConditionsController::class, 'index'])->name('index');
            Route::get('/create', [TermsConditionsController::class, 'create'])->name('create');
        });

        Route::group(['prefix' => 'tag-management', 'as' => 'tm.'], function () {
            Route::get('/index', [TagController::class, 'index'])->name('index');
            Route::get('/create', [TagController::class, 'create'])->name('create');
            Route::post('/store', [TagController::class, 'store'])->name('store');
            Route::get('/edit/{id}', [TagController::class, 'edit'])->name('edit');
            Route::put('/update/{id}', [TagController::class, 'update'])->name('update');
            Route::get('/delete/{id}', [TagController::class, 'delete'])->name('delete');
        });

    });
});
