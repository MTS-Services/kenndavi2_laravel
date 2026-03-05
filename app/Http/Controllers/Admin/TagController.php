<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ProductTagStatus;
use App\Http\Controllers\Controller;
use App\Models\ProductTag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index()
    {
        $tags = ProductTag::query()
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('admin/tag-management/index', [
            'tags' => $tags,
        ]);
    }
    
    public function create()
    {
        return Inertia::render('admin/tag-management/create', [
            'statuses' => ProductTagStatus::options(),
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:product_tags,name',
            'status' => 'required|in:active,inactive',
        ]);

        $validated['created_by'] = auth('admin')->id();

        ProductTag::create($validated);

        return redirect()
            ->route('admin.tm.index')
            ->with('success', 'Tag created successfully!');
    }
    public function edit($id)
    {
        $tag = ProductTag::findOrFail($id);
        return Inertia::render('admin/tag-management/edit', [
            'tag' => $tag,
            'statuses' => ProductTagStatus::options(),
        ]);
    }
    public function update(Request $request, $id)
    {
        $tag = ProductTag::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:product_tags,name,' . $id,
            'status' => 'required|in:active,inactive',
        ]);
        $tag->update($validated);
        return redirect()
            ->route('admin.tm.index')
            ->with('success', 'Tag updated successfully!');
    }
    public function delete($id)
    {
        $tag = ProductTag::findOrFail($id);
        $tag->delete();
        return redirect()
            ->route('admin.tm.index')
            ->with('success', 'Tag deleted successfully!');
    }
}
