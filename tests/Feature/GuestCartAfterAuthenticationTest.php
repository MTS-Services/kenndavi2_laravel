<?php

use App\Enums\ActiveInactive;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Services\CartService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

beforeEach(function (): void {
    Mail::fake();
});

function createTestProduct(): Product
{
    return Product::query()->create([
        'title' => 'Test Product',
        'description' => 'Test description for product.',
        'tag_id' => null,
        'price' => 19.99,
        'discount' => 0,
        'discount_type' => null,
        'stock_level' => 50,
    ]);
}

it('does not create a second empty guest cart when resolveCart runs after addToCart', function (): void {
    $product = createTestProduct();

    $this->post(route('frontend.cart.add'), [
        'product_id' => $product->id,
        'quantity' => 2,
    ])->assertRedirect();

    $guestCountBefore = Cart::query()->whereNull('user_id')->count();
    expect($guestCountBefore)->toBe(1);

    $cartService = app(CartService::class);
    $resolved = $cartService->resolveCart(request());

    expect($resolved->id)->toBe(Cart::query()->whereNull('user_id')->first()->id)
        ->and(Cart::query()->whereNull('user_id')->count())->toBe(1)
        ->and($resolved->items)->toHaveCount(1)
        ->and((int) $resolved->items->first()->quantity)->toBe(2);
});

it('merges guest cart into user cart and redirects to intended URL after login', function (): void {
    $user = User::query()->create([
        'name' => 'Cart Test User',
        'email' => 'cart-merge-test@example.com',
        'password' => Hash::make('password'),
        'email_verified_at' => now(),
        'status' => ActiveInactive::ACTIVE->value,
    ]);

    $product = createTestProduct();

    $this->post(route('frontend.cart.add'), [
        'product_id' => $product->id,
        'quantity' => 3,
    ])->assertRedirect();

    $this->get(route('frontend.shipping-info'))
        ->assertRedirect(route('login', absolute: false));

    $response = $this->post(route('login.post'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('frontend.shipping-info', absolute: false));
    $this->assertAuthenticatedAs($user);

    $userCart = Cart::query()->where('user_id', $user->id)->first();
    expect($userCart)->not->toBeNull()
        ->and($userCart->items)->toHaveCount(1)
        ->and((int) $userCart->items->first()->quantity)->toBe(3);

    expect(Cart::query()->whereNull('user_id')->count())->toBe(0);
});
