<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Mail\UserWelcomeMail;
use App\Models\User;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request)
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $email = $googleUser->getEmail();
        [$firstName] = $this->extractName($googleUser->getName(), $email);

        $guestSessionId = $request->session()->getId();
        $buyNow         = $request->session()->get('buy_now');
        $urlIntended    = $request->session()->get('url.intended');

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name'                   => $googleUser->getName() ?? $firstName,
                'provider'               => 'google',
                'provider_id'            => $googleUser->getId(),
                'provider_avatar'        => $googleUser->getAvatar(),
                'provider_token'         => $googleUser->token,
                'provider_refresh_token' => $googleUser->refreshToken,
            ]
        );

        $isFirstLogin = is_null($user->last_login_at);

        Auth::login($user);
        $user->update(['last_login_at' => now()]);

        $request->session()->regenerate();

        if ($buyNow) {
            $request->session()->put('buy_now', $buyNow);
        }
        if ($urlIntended) {
            $request->session()->put('url.intended', $urlIntended);
        }

        $this->cartService->authCheck($guestSessionId);

        if ($isFirstLogin) {
            Mail::to($user->email)->send(new UserWelcomeMail([
                'name'  => $user->name,
                'email' => $user->email,
            ]));
        }
        return redirect()->intended(route('user.dashboard'));
    }

    private function extractName(?string $fullName, ?string $email): array
    {
        $fullName = trim((string) $fullName);

        if ($fullName !== '') {
            $parts = preg_split('/\s+/', $fullName, 2);

            return [$parts[0] ?? 'Google User', $parts[1] ?? ''];
        }

        $email = trim((string) $email);

        if ($email !== '' && str_contains($email, '@')) {
            [$local] = explode('@', $email, 2);

            return [$local ?: 'Google User', ''];
        }

        return ['Google User', ''];
    }
}