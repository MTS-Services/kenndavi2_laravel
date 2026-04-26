<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ShippingCost;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CartService
{
    public const SESSION_CART_ID_KEY = 'cart.id';

    public const GUEST_CART_TTL_DAYS = 30;

    public function __construct(
        protected Cart $model,
        protected CartItem $cartItem,
        protected Product $product
    ) {}

    public function resolveCart(Request $request): Cart
    {
        if ($request->user()) {
            return Cart::query()->firstOrCreate(
                ['user_id' => $request->user()->id],
                ['expires_at' => null],
            );
        }

        return $this->findOrCreateGuestCart($request);
    }

    /**
     * Resolve or create the guest cart for the current session (session_id + optional cart.id in session).
     */
    public function findOrCreateGuestCart(Request $request): Cart
    {
        $sessionId = $request->session()->getId();

        $cart = Cart::query()
            ->whereNull('user_id')
            ->where('session_id', $sessionId)
            ->orderBy('id')
            ->first();

        if ($cart !== null) {
            $request->session()->put(self::SESSION_CART_ID_KEY, $cart->id);

            return $cart;
        }

        $cartId = $request->session()->get(self::SESSION_CART_ID_KEY);
        if ($cartId !== null) {
            $cartById = Cart::query()
                ->whereNull('user_id')
                ->whereKey($cartId)
                ->first();

            if ($cartById !== null) {
                if ($cartById->session_id !== $sessionId) {
                    $cartById->update(['session_id' => $sessionId]);
                }
                $request->session()->put(self::SESSION_CART_ID_KEY, $cartById->id);

                return $cartById;
            }

            $request->session()->forget(self::SESSION_CART_ID_KEY);
        }

        $cart = Cart::query()->create([
            'user_id' => null,
            'session_id' => $sessionId,
            'expires_at' => now()->addDays(self::GUEST_CART_TTL_DAYS),
        ]);
        $request->session()->put(self::SESSION_CART_ID_KEY, $cart->id);

        return $cart;
    }

    public function getShippingCost(): float
    {
        $shippingCost = ShippingCost::latest()->first();

        return $shippingCost ? (float) $shippingCost->cost : 20.00;
    }

    public function getAllDatas(): array
    {
        $cart = $this->model
            ->with([
                'items.product.images' => function ($query) {
                    $query->orderBy('is_primary', 'desc')->orderBy('id', 'asc');
                },
            ])
            ->when(auth('web')->check(), function ($query) {
                $query->where('user_id', auth('web')->id());
            }, function ($query) {
                $query->where('session_id', session()->getId());
            })
            ->first();

        // Use ProductService for consistent calculations
        $productService = app(ProductService::class);

        $cartItems = $cart ? $cart->items->map(function ($cartItem) use ($productService) {
            if ($cartItem->product) {
                $cartItem->calculated = $productService->getProductCalculatedData(
                    $cartItem->product,
                    $cartItem->quantity
                );
            }

            return $cartItem;
        }) : collect();

        return [
            'cart' => $cart,
            'cartItems' => $cartItems,
        ];
    }

    /**
     * Server-side checkout totals for the authenticated user's cart (matches cart UI shipping rule).
     *
     * @return array{subtotal: float, shipping: float, total: float, empty: bool}
     */
    public function getCheckoutTotalsForAuthenticatedUser(): array
    {
        if (! auth('web')->check()) {
            return [
                'subtotal' => 0.0,
                'shipping' => 0.0,
                'total' => 0.0,
                'empty' => true,
            ];
        }

        $cart = $this->model
            ->with(['items.product'])
            ->where('user_id', auth('web')->id())
            ->first();

        if (! $cart || $cart->items->isEmpty()) {
            return [
                'subtotal' => 0.0,
                'shipping' => 0.0,
                'total' => 0.0,
                'empty' => true,
            ];
        }

        $productService = app(ProductService::class);
        $subtotal = 0.0;

        foreach ($cart->items as $item) {
            if ($item->product) {
                $calculated = $productService->getProductCalculatedData(
                    $item->product,
                    (int) $item->quantity
                );
                $subtotal += (float) ($calculated['total_price'] ?? 0);
            }
        }

        $shippingCost = $productService->getShippingCost();
        $shipping = $subtotal <= 1 ? 0.0 : (float) $shippingCost;
        $total = $subtotal + $shipping;

        return [
            'subtotal' => round($subtotal, 2),
            'shipping' => round($shipping, 2),
            'total' => round($total, 2),
            'empty' => false,
        ];
    }

    public function addToCart(array $data): bool
    {
        if (Auth::guard('web')->check()) {
            $cart = $this->model::firstOrCreate(
                ['user_id' => Auth::guard('web')->id()],
                [
                    'creater_type' => User::class,
                    'creater_id' => Auth::guard('web')->id(),
                ]
            );
        } else {
            $cart = $this->findOrCreateGuestCart(request());
        }

        $product = $this->product::findOrFail($data['product_id']);
        $cartItem = $this->cartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $data['quantity'] ?? 1);
        } else {
            $this->cartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'product_name' => $product->title,
                'quantity' => $data['quantity'] ?? 1,
                'creater_type' => User::class,
                'creater_id' => Auth::guard('web')->check() ? Auth::guard('web')->id() : null,
            ]);
        }

        return true;
    }

    public function updateCartItem(array $data): bool
    {
        $cartItem = $this->cartItem::findOrFail($data['cart_item_id']);
        $cart = $this->getUserCart();

        if (! $cart || $cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item not found');
        }

        $cartItem->update(['quantity' => $data['quantity']]);

        return true;
    }

    public function removeCartItem(int $id): bool
    {
        $cartItem = $this->cartItem::findOrFail($id);
        $cart = $this->getUserCart();

        if (! $cart || $cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item not found');
        }

        $cartItem->delete();

        return true;
    }

    /**
     * Merge guest cart rows (by session id and/or session cart id) into the user's cart.
     *
     * @return bool True when at least one guest cart was merged.
     */
    public function mergeGuestCartsForUser(User $user, string $guestSessionId, ?int $sessionCartId = null): bool
    {
        $guestCarts = $this->model::query()
            ->whereNull('user_id')
            ->where(function ($query) use ($guestSessionId, $sessionCartId): void {
                $query->where('session_id', $guestSessionId);
                if ($sessionCartId !== null) {
                    $query->orWhere('id', $sessionCartId);
                }
            })
            ->with('items')
            ->get()
            ->unique('id');

        if ($guestCarts->isEmpty()) {
            return false;
        }

        $userCart = $this->model::firstOrCreate(
            ['user_id' => $user->id],
            [
                'expires_at' => null,
                'creater_type' => User::class,
                'creater_id' => $user->id,
            ],
        );

        foreach ($guestCarts as $guestCart) {
            if ((int) $guestCart->id === (int) $userCart->id) {
                continue;
            }

            foreach ($guestCart->items as $guestItem) {
                $existingItem = $this->cartItem::query()
                    ->where('cart_id', $userCart->id)
                    ->where('product_id', $guestItem->product_id)
                    ->first();

                if ($existingItem) {
                    $existingItem->increment('quantity', $guestItem->quantity);
                    $guestItem->delete();
                } else {
                    $guestItem->update(['cart_id' => $userCart->id]);
                }
            }

            $guestCart->delete();
        }

        session()->forget(self::SESSION_CART_ID_KEY);

        return true;
    }

    public function authCheck(?string $sessionId = null): bool
    {
        if (! Auth::guard('web')->check()) {
            return false;
        }

        $user = Auth::guard('web')->user();
        $sessionId = $sessionId ?? session()->getId();
        $cartIdRaw = session()->get(self::SESSION_CART_ID_KEY);
        $sessionCartId = is_numeric($cartIdRaw) ? (int) $cartIdRaw : null;

        return $this->mergeGuestCartsForUser($user, $sessionId, $sessionCartId);
    }

    // ─── Private Helpers ─────────────────────────────────────────────────────

    private function getUserCart(): ?Cart
    {
        return Auth::guard('web')->check()
            ? $this->model::where('user_id', Auth::guard('web')->id())->first()
            : $this->model::where('session_id', session()->getId())->first();
    }

    private function calculateItemData(Product $product, int $quantity): array
    {
        $price = (float) ($product->price ?? 0);
        $discountRate = (float) ($product->discount ?? 0);

        $discountAmount = ($price * $discountRate) / 100;
        $unitPrice = $price - $discountAmount;
        $totalPrice = $unitPrice * $quantity;

        return [
            'original_price' => round($price, 2),
            'discount_amount' => round($discountAmount, 2),
            'unit_price' => round($unitPrice, 2),
            'total_price' => round($totalPrice, 2),
        ];
    }

    public function resolveImageUrl(?string $url): ?string
    {
        if ($url === null || $url === '') {
            return null;
        }
        if (filter_var($url, FILTER_VALIDATE_URL) && (str_starts_with($url, 'https://') || str_starts_with($url, 'http://'))) {
            return $url;
        }

        return Storage::disk('public')->url($url);
    }
}
