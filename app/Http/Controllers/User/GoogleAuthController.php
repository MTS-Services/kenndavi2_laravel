<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        // dd(Socialite::driver('google')->redirect());
        return Socialite::driver('google')->redirect();

    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Google login failed. Please try again.');
        }

        $email = $googleUser->getEmail();
        [$firstName, $lastName] = $this->extractName($googleUser->getName(), $email);
        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $googleUser->getName() ?? $firstName,
                'provider' => 'google',
                'provider_id' => $googleUser->getId(),
                'provider_avatar' => $googleUser->getAvatar(),
                'provider_token' => $googleUser->token,
                'provider_refresh_token' => $googleUser->refreshToken,
            ]
        );

        Auth::login($user);

        return redirect()->route('user.dashboard');
    }

    private function extractName(?string $fullName, ?string $email): array
    {
        $fullName = trim((string) $fullName);

        if ($fullName !== '') {
            $parts = preg_split('/\s+/', $fullName, 2);

            return [
                $parts[0] ?? 'Google User',
                $parts[1] ?? '',
            ];
        }

        $email = trim((string) $email);

        if ($email !== '' && str_contains($email, '@')) {
            [$local] = explode('@', $email, 2);

            return [$local ?: 'Google User', ''];
        }

        return ['Google User', ''];
    }
}
