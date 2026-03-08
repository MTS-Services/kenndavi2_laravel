<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\UserAccountSettinsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    protected UserAccountSettinsService $userAccountService;

    public function __construct(UserAccountSettinsService $userAccountService)
    {
        $this->userAccountService = $userAccountService;
    }

    public function index(): Response
    {
        return Inertia::render('user/dashboard');
    }

    public function orders(): Response
    {
        return Inertia::render('user/order/orders');
    }

    public function productToReview(): Response
    {
        return Inertia::render('user/product-to-review/product-to-review');
    }

    public function review(): Response
    {
        return Inertia::render('user/product-to-review/review');
    }

    public function accountSettings(): Response
    {
        $data = $this->userAccountService->getUserWithAddresses();

        if($data['user']) {
            $data['user']->load('addresses');
        }
        

        return Inertia::render('user/account-settings/account-settings', $data);
    }

    public function accountSettingsUpdate(Request $request)
    {
        try {
            $this->userAccountService->updateAccountSettings($request->all());
            
            return redirect()
                ->back()
                ->with('success', 'Account settings updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update account settings.']);
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $this->userAccountService->changePassword($request->all());
            
            return redirect()
                ->back()
                ->with('success', 'Password changed successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to change password.']);
        }
    }

    public function imageUpdate(Request $request)
    {
        try {
            $this->userAccountService->updateProfileImage($request->file('image'));
            
            return redirect()
                ->back()
                ->with('success', 'Profile image updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update profile image.']);
        }
    }

    public function billingAddress(Request $request)
    {
        try {
            $this->userAccountService->updateBillingAddress($request->all());

            return redirect()->route('user.account-settings')->with('success', 'Billing address updated successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update billing address.']);
        }
    }

    public function shippingAddress(Request $request)
    {
        try {
            $this->userAccountService->updateShippingAddress($request->all());
            
            return redirect()
                ->back()
                ->with('success', 'Shipping address updated successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update shipping address.']);
        }
    }
}
