<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShippingCost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShippingCostManagementController extends Controller
{

    public function index()
    {
        // Get the first shipping cost record, or create a default one if none exists
        $shippingCost = ShippingCost::first();

        if (!$shippingCost) {
            $shippingCost = ShippingCost::create([
                'cost' => 10.00,

                'created_by' => auth()->id(),
                'created_at' => now(),


            ]);
        }

        return Inertia::render('admin/shipping-cost-management/index', [
            'shippingCost' => $shippingCost
        ]);
    }

    public function update(Request $request, ShippingCost $shippingCost)
    {
        $validated = $request->validate([
            'cost' => 'required|numeric|min:0',
        ]);

        // Add audit fields
        $validated['updated_by'] = auth()->id();
        $validated['updated_at'] = now();

        $shippingCost->update($validated);

        return back()->with('success', 'Shipping cost updated successfully!');
    }
}
