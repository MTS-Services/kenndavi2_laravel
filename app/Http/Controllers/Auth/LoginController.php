<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\UserEmailVerificationOtpMail;
use App\Mail\UserWelcomeMail;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function showLogin(Request $request)
    {
        if (Auth::check()) {
            return redirect()->route('user.dashboard');
        }

        return Inertia::render('auth/login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $credentials = $request->only('email', 'password');
        $oldSessionId = session()->getId();

        // Attempt login
        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $user = Auth::user();

        if (is_null($user->email_verified_at)) {
            Auth::logout();

            if (is_null($user->otp)) {
                $otp = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
                $user->update(['otp' => $otp]);
            }

            $request->session()->put('email_verification', [
                'email' => $user->email,
                'otp' => $user->otp,
                'expires_at' => now()->addMinutes(10)->timestamp,
            ]);

            // Send verification email
            Mail::to($user->email)->send(new UserEmailVerificationOtpMail([
                'email' => $user->email,
                'otp' => $user->otp,
            ]));

            return redirect()->route('email-verification');
        }

        $isFirstLogin = is_null($user->last_login_at);
        $user->update(['last_login_at' => now()]);

        $request->session()->regenerate();

        $this->cartService->authCheck($oldSessionId); 


        if ($isFirstLogin) {
            Mail::to($user->email)->send(new UserWelcomeMail([
                'name'  => $user->name,
                'email' => $user->email,
            ]));
        }

        return redirect()->intended(route('user.dashboard'));
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
