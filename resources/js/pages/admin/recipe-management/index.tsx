import RecipeCardAdmin from '@/components/ui/recipe-card-admin';
import { RecipeData } from '@/components/ui/recipe-card-admin';
import AdminLayout from '@/layouts/admin-layout';
import { Link } from '@inertiajs/react';

interface PageProps {
    [key: string]: any;
    recipes: {
        data: RecipeData[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from?: number;
        to?: number;
        prev_page_url?: string | null;
        next_page_url?: string | null;
    };
}

export default function Index({ recipes }: PageProps) {
    return (
        <AdminLayout activeSlug={'recipe-management'}>
            <div className="flex items-center justify-between">
                <h2 className="font-poppins text-xl font-medium text-text-title sm:text-4xl">
                    Manage your Recipes
                </h2>
                <Link
                    href={route('admin.rm.create')}
                    className="inline-block cursor-pointer rounded-xl bg-bg-button px-6 py-2 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-4 sm:text-xl"
                >
                    Add a new Recipe
                </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {recipes.data.map((recipe) => (
                    <RecipeCardAdmin key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <div className="flex items-center justify-between py-4">
                <span className="font-poppins text-sm font-medium text-text-green">
                    Showing {recipes.from} to {recipes.to} of {recipes.total}{' '}
                    results
                </span>

                <div className="flex gap-2">
                    <Link
                        href={recipes.prev_page_url ? recipes.prev_page_url : '#'}
                        className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
                            recipes.prev_page_url
                                ? 'border-text-green text-text-green hover:bg-bg-light-green'
                                : 'border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                        preserveScroll
                    >
                        Previous
                    </Link>

                    <Link
                        href={recipes.next_page_url ? recipes.next_page_url : '#'}
                        className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
                            recipes.next_page_url
                                ? 'border-text-green text-text-green hover:bg-bg-light-green'
                                : 'border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                        preserveScroll
                    >
                        Next
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
