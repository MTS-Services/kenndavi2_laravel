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
                    <button className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green">
                        Previous
                    </button>

                    <button className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green">
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
