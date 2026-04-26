<?php

namespace App\Http\Controllers\User;

use App\Concerns\PasswordValidationRules;
use App\Enums\ActiveInactive;
use App\Http\Controllers\Controller;
use App\Mail\UserEmailVerificationOtpMail;
use App\Mail\UserPasswordResetOtpMail;
use App\Mail\UserWelcomeMail;
use App\Models\User;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserAuthController extends Controller
{
    use PasswordValidationRules;

    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function register(): Response
    {
        return Inertia::render('auth/register');
    }

    public function registerStore(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
            $file->storeAs('user_images', $imageName);
        }

        $otp = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'phone' => $request['phone'],
            'image' => $imageName ?? null,
            'status' => ActiveInactive::ACTIVE->value,
            'password' => Hash::make($request['password']),
            'otp' => $otp,
        ]);

        $user->update([
            'creater_id' => $user->id,
            'creater_type' => User::class,
        ]);

        $request->session()->put('email_verification', [
            'email' => $request->email,
            'otp' => $otp,
            'expires_at' => now()->addMinutes(10)->timestamp,
            'guest_session_id' => $request->session()->getId(),
            'url_intended' => $request->session()->get('url.intended'),
        ]);

        Mail::to($request->email)->send(new UserEmailVerificationOtpMail([
            'email' => $request->email,
            'otp' => $otp,
        ]));

        return redirect()->route('email-verification');
    }

    public function emailVerification()
    {
        if (! session()->has('email_verification')) {
            return redirect()->route('user.register');
        }

        return Inertia::render('auth/email-verification');
    }

    public function emailVerificationStore(Request $request)
    {
        $request->validate([
            'otp' => ['required', 'numeric', 'digits:6'],
        ]);

        $verificationData = session()->get('email_verification');

        if (! $verificationData) {
            return redirect()->route('user.register')
                ->withErrors(['otp' => 'Session expired. Please register again.']);
        }

        if ($verificationData['expires_at'] < now()->timestamp) {
            session()->forget('email_verification');

            return redirect()->route('user.register')
                ->withErrors(['otp' => 'OTP expired. Please register again.']);
        }

        if ($verificationData['otp'] != $request->otp) {
            return redirect()->route('email-verification')
                ->withErrors(['otp' => 'Invalid OTP. Please try again.']);
        }

        $user = User::where('email', $verificationData['email'])->first();

        if (! $user) {
            return redirect()->route('user.register')
                ->withErrors(['email' => 'User not found. Please register again.']);
        }

        $user->update([
            'email_verified_at' => now(),
            'otp' => $request->otp,
        ]);

        $guestSessionId = $verificationData['guest_session_id']
            ?? $request->session()->getId();

        $buyNow = $request->session()->get('buy_now');
        $urlIntended = $verificationData['url_intended']
            ?? $request->session()->get('url.intended');

        session()->forget('email_verification');

        Auth::login($user);
        $user->update(['last_login_at' => now()]);

        $sessionCartIdRaw = session()->get(CartService::SESSION_CART_ID_KEY);
        $sessionCartId = is_numeric($sessionCartIdRaw) ? (int) $sessionCartIdRaw : null;
        $this->cartService->mergeGuestCartsForUser($user, $guestSessionId, $sessionCartId);

        $request->session()->regenerate();

        if ($buyNow) {
            $request->session()->put('buy_now', $buyNow);
        }
        if ($urlIntended) {
            $request->session()->put('url.intended', $urlIntended);
        }

        Mail::to($user->email)->send(new UserWelcomeMail([
            'name' => $user->name,
            'email' => $user->email,
        ]));

        return redirect()->intended(route('user.dashboard'));
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('frontend.home');
    }

    public function forgotPassword()
    {
        return Inertia::render('auth/forgot-password');
    }

    public function forgotPasswordStore(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ], [
            'email.exists' => 'No account found with this email address.',
        ]);

        $otp = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);

        $request->session()->put('password_reset', [
            'otp' => $otp,
            'email' => $request->email,
            'expires_at' => now()->addMinutes(10)->timestamp,
            'verified' => false,
        ]);

        Mail::to($request->email)->send(new UserPasswordResetOtpMail([
            'email' => $request->email,
            'otp' => $otp,
        ]));

        return redirect()->route('otp-verification');
    }

    public function otpVerification()
    {
        if (! session()->has('password_reset')) {
            return redirect()->route('forgot-password');
        }

        return Inertia::render('auth/otp-verification');
    }

    public function otpVerificationStore(Request $request)
    {
        $request->validate([
            'otp' => ['required', 'numeric', 'digits:6'],
        ]);

        $resetData = session()->get('password_reset');

        if (! $resetData) {
            return redirect()->route('forgot-password')
                ->withErrors(['email' => 'Session expired. Please start over.']);
        }

        if ($resetData['otp'] != $request->otp) {
            return redirect()->route('otp-verification')
                ->withErrors(['otp' => 'Invalid OTP. Please try again.']);
        }

        if ($resetData['expires_at'] < now()->timestamp) {
            return redirect()->route('otp-verification')
                ->withErrors(['otp' => 'Session expired. Please start over.']);
        }

        $resetData['verified'] = true;
        session()->put('password_reset', $resetData);

        return redirect()->route('reset-password');
    }

    public function resetPassword()
    {
        if (! session()->has('password_reset')) {
            return redirect()->route('forgot-password');
        }

        return Inertia::render('auth/reset-password');
    }

    public function resetPasswordStore(Request $request)
    {
        $request->validate([
            'password' => $this->passwordRules(),
            'password_confirmation' => ['required', 'same:password'],
        ]);

        $resetData = $request->session()->get('password_reset');

        if (! $resetData || ! $resetData['verified']) {
            return redirect()->route('forgot-password')
                ->withErrors(['email' => 'Session expired. Please start over.']);
        }

        $user = User::where('email', $resetData['email'])->first();

        if (! $user) {
            return redirect()->route('forgot-password')
                ->withErrors(['email' => 'User not found.']);
        }

        $user->update(['password' => Hash::make($request->password)]);

        $request->session()->forget('password_reset');

        return redirect()->route('login')
            ->with('status', 'Your password has been reset successfully. Please log in.');
    }
}
