<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TermsAndCondition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TermsAndConditionController extends Controller
{
    public function index(): Response
    {
        $termsAndCondition = TermsAndCondition::first();
        
        return Inertia::render('admin/terms-conditions/index', [
            'termsAndCondition' => $termsAndCondition
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $validated['created_by'] = auth('admin')->id();
        $validated['updated_by'] = auth('admin')->id();

        // Delete existing terms if any
        TermsAndCondition::truncate();
        
        // Create new terms
        $termsAndCondition = TermsAndCondition::create($validated);

        return redirect()->route('admin.tac.index')
            ->with('success', 'Terms & Conditions created successfully!');
    }

    public function update(Request $request, TermsAndCondition $termsAndCondition)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $validated['updated_by'] = auth('admin')->id();

        $termsAndCondition->update($validated);

        return redirect()->route('admin.tac.index')
            ->with('success', 'Terms & Conditions updated successfully!');
    }
}
