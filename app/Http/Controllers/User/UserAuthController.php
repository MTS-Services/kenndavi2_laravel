<?php

namespace App\Http\Controllers\User;

use App\Concerns\PasswordValidationRules;
use App\Enums\ActiveInactive;
use App\Http\Controllers\Controller;
use App\Mail\UserPasswordResetOtpMail;
use App\Models\User;
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

        // File upload logic
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('user_images', $imageName);
        }
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'phone' => $request['phone'],
            'image' => isset($imageName) ? $imageName : null,
            'status' => ActiveInactive::ACTIVE->value,
            'password' => Hash::make($request['password']),
        ]);

        // For self-registration, set creater_id to the user's own ID
        $user->update([
            'creater_id' => $user->id,
            'creater_type' => User::class,
        ]);
        Auth::login($user);

        return redirect()->route('user.dashboard');
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
            'otp'        => $otp,
            'email'      => $request->email,
            'expires_at' => now()->addMinutes(10)->timestamp,
            'verified'   => false,
        ]);
        $data = [
            'email' => $request->email,
            'otp'   => $otp,
        ];
        Mail::to($request->email)->send(new UserPasswordResetOtpMail($data));

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

        // Session missing
        if (!$resetData) {
            return redirect()->route('forgot-password')
                ->withErrors(['email' => 'Session expired. Please start over.']);
        }

        // OTP mismatch
        if ($resetData['otp'] != $request->otp) {
            return redirect()->route('otp-verification')
                ->withErrors(['otp' => 'Invalid OTP. Please try again.']);
        }

        // Session expired
        if ($resetData['expires_at'] < now()->timestamp) {
            return redirect()->route('otp-verification')
                ->withErrors(['otp' => 'Session expired. Please start over.']);
        }

        // OTP verified
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
            'password'              => $this->passwordRules(),
            'password_confirmation' => ['required', 'same:password'],
        ]);

        $resetData = $request->session()->get('password_reset');

        // Guard: OTP must be verified
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

        // Clean up session
        $request->session()->forget('password_reset');

        return redirect()->route('login')
            ->with('status', 'Your password has been reset successfully. Please log in.');
    }
}
