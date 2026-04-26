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
        $recipes = $this->recipeService->getAll();
        
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
        $recipe = $this->recipeService->create($request);

        return redirect()
            ->route('admin.rm.index')
            ->with('success', 'Recipe created successfully!');
    }
    
    public function edit($id): Response
    {
        $recipe = $this->recipeService->getById($id);
        $products = $this->recipeService->getAllProducts();
        
        return Inertia::render('admin/recipe-management/edit', [
            'recipe' => $recipe,
            'products' => $products
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $recipe = $this->recipeService->update($request, $id);

        return redirect()->back()->with('success', 'Recipe updated successfully!');
    }
    
    public function delete($id)
    {
        $recipe = $this->recipeService->getById($id);
        $this->recipeService->delete($recipe);
        
        return redirect()
            ->route('admin.rm.index')
            ->with('success', 'Recipe deleted successfully!');
    }
}
