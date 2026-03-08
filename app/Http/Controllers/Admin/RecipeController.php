<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RecipeController extends Controller
{
    public function __construct(private RecipeService $recipeService)
    {}

    public function index(): Response
    {
        $recipes = $this->recipeService->getAllRecipes();
        
        return Inertia::render('admin/recipe-management/index', [
            'recipes' => $recipes
        ]);
    }
    
    public function create(): Response
    {
        $products = $this->recipeService->getAllProducts();
        
        return Inertia::render('admin/recipe-management/create', [
            'products' => $products
        ]);
    }
    
    public function store(Request $request)
    {
        $recipe = $this->recipeService->createRecipe($request);

        return redirect()
            ->route('admin.rm.index')
            ->with('success', 'Recipe created successfully!');
    }
    
    public function edit($id): Response
    {
        $recipe = $this->recipeService->getRecipeForEdit($id);
        $products = $this->recipeService->getAllProducts();
        
        return Inertia::render('admin/recipe-management/edit', [
            'recipe' => $recipe,
            'products' => $products
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $recipe = $this->recipeService->updateRecipe($request, $id);

        return redirect()
            ->route('admin.rm.index')
            ->with('success', 'Recipe updated successfully!');
    }
    
    public function delete($id)
    {
        $recipe = $this->recipeService->deleteRecipe($id);
        
        return redirect()
            ->route('admin.rm.index')
            ->with('success', 'Recipe deleted successfully!');
    }
}
