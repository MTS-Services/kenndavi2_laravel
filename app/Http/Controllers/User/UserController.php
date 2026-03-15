<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\FeedbackService;
use App\Services\OrderService;
use App\Services\UserAccountSettinsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected UserAccountSettinsService $userAccountService;
    protected OrderService $orderService;
    protected FeedbackService $feedbackService;

    public function __construct(UserAccountSettinsService $userAccountService, OrderService $orderService, FeedbackService $feedbackService)
    {
        $this->userAccountService = $userAccountService;
        $this->orderService = $orderService;
        $this->feedbackService = $feedbackService;
    }

    public function index(): Response
    {
        $user = auth()->user();
        return Inertia::render('user/dashboard', [
            'user' => $user
        ]);
    }

    public function orders(): Response
    {
        $orders = $this->orderService->getOrdersByUserId();
        // dd($orders);
        return Inertia::render('user/order/orders', [
            'orders' => $orders
        ]);
    }

public function productToReview(): Response
{
    $orders = $this->orderService->getOrderByDeliverd();

    $feedbacks = $this->feedbackService->getUserFeedbacks(
        Auth::guard('web')->id()
    );

    return Inertia::render('user/product-to-review/product-to-review', [
        'orders' => $orders,
        'feedbacks' => $feedbacks
    ]);
}



    public function accountSettings(): Response
    {
        $data = $this->userAccountService->getUserWithAddresses();

        if ($data['user']) {
            $data['user']->load('addresses');
        }


        return Inertia::render('user/account-settings/account-settings', $data);
    }

    public function accountSettingsUpdate(Request $request)
    {
        try {
            $this->userAccountService->updateAccountInfo($request->all(), $request);

            return redirect()
                ->back()
                ->with('success', 'Account settings updated successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
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
            return back();
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
            return back();
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
            return back();
        }
    }
}
