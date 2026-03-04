<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AdminPasswordResetOtpMail;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('admin/auth/login');
    }

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('frontend.home');
    }
    public function forgotPassword()
    {
        return Inertia::render('admin/auth/forget-password');
    }
    public function forgotPasswordStore(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:admins,email'],
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
        Mail::to($request->email)->send(new AdminPasswordResetOtpMail($data));

        return redirect()->route('admin.otp-verification');
    }
    public function otpVerification()
    {
        if (! session()->has('password_reset')) {
            return redirect()->route('admin.forgot-password');
        }
        return Inertia::render('admin/auth/otp-verification');
    }
    public function otpVerificationStore(Request $request)
    {
        $request->validate([
            'otp' => ['required', 'numeric', 'digits:6'],
        ]);


        $resetData = session()->get('password_reset');

        // Session missing
        if (!$resetData) {
            return redirect()->route('admin.forgot-password')
                ->withErrors(['email' => 'Session expired. Please start over.']);
        }

        // OTP mismatch
        if ($resetData['otp'] != $request->otp) {
            return redirect()->route('admin.otp-verification')
                ->withErrors(['otp' => 'Invalid OTP. Please try again.']);
        }

        // Session expired
        if ($resetData['expires_at'] < now()->timestamp) {
            return redirect()->route('admin.otp-verification')
                ->withErrors(['otp' => 'Session expired. Please start over.']);
        }

        // OTP verified
        $resetData['verified'] = true;
        session()->put('password_reset', $resetData);

        return redirect()->route('admin.reset-password');
    }
    public function resetPassword()
    {
        if (! session()->has('password_reset')) {
            return redirect()->route('admin.forgot-password');
        }
        return Inertia::render('admin/auth/reset-password');
    }

    public function resetPasswordStore(Request $request)
    {
       $request->validate([
            'password' => ['required', 'string', 'min:8', 'max:255'],
            'password_confirmation' => ['required', 'same:password'],
            //  'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/'
        ]);

        $resetData = $request->session()->get('password_reset');

        // Guard: OTP must be verified
        if (! $resetData || ! $resetData['verified']) {
            return redirect()->route('admin.forgot-password')
                ->withErrors(['email' => 'Session expired. Please start over.']);
        }

        $admin = Admin::where('email', $resetData['email'])->first();

        if (! $admin) {
            return redirect()->route('admin.forgot-password')
                ->withErrors(['email' => 'User not found.']);
        }

        $admin->update(['password' => Hash::make($request->password)]);

        // Clean up session
        $request->session()->forget('password_reset');

        return redirect()->route('admin.login')
            ->with('status', 'Your password has been reset successfully. Please log in.');
    }
}
