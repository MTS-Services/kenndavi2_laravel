<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecipeService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected Recipe $model) {}

    /**
     * Get all recipes with pagination
     */
    public function getAllRecipes($perPage = 10)
    {
        return $this->model->paginate($perPage);
    }

    /**
     * Get recipe with related products for editing
     */
    public function getRecipeForEdit($id)
    {
        return $this->model->with('relatedProducts')->findOrFail($id);
    }

    /**
     * Create a new recipe
     */
    public function createRecipe(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prep_time' => 'nullable|string|max:50',
            'cook_time' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'related_products' => 'nullable|array',
            'related_products.*' => 'exists:products,id',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $this->handleImageUpload($request->file('image'));
        }

        // Add audit fields
        $validated['created_by'] = auth('admin')->id();

        $recipe = $this->model->create($validated);

        // Handle related products if provided
        if (!empty($validated['related_products'])) {
            $recipe->relatedProducts()->attach($validated['related_products']);
        }

        return $recipe;
    }

    /**
     * Update an existing recipe
     */
    public function updateRecipe(Request $request, $id)
    {

        $recipe = $this->model->findOrFail($id);
        dd($recipe);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'prep_time' => 'nullable|string|max:50',
            'cook_time' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'related_products' => 'nullable|array',
            'related_products.*' => 'exists:products,id',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $this->handleImageUpload($request->file('image'));
        }

        // Add audit field
        $validated['updated_by'] = auth('admin')->id();

        $recipe->update($validated);

        // Update related products
        if (isset($validated['related_products'])) {
            $recipe->relatedProducts()->sync($validated['related_products']);
        } else {
            $recipe->relatedProducts()->detach();
        }

        return $recipe;
    }

    /**
     * Delete a recipe
     */
    public function deleteRecipe($id)
    {
        $recipe = $this->model->findOrFail($id);

        // Delete related products relationships
        $recipe->relatedProducts()->detach();

        // Delete the recipe
        $recipe->delete();

        return $recipe;
    }

    /**
     * Handle image upload and return path
     */
    private function handleImageUpload($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $imagePath = $image->storeAs('recipe-images', $imageName, 'public');
        return '/storage/' . $imagePath;
    }

    /**
     * Get all products for dropdown/selection
     */
    public function getAllProducts()
    {
        return Product::all();
    }
}
