import RecipesCard from '@/components/ui/recipes-card';
import FrontendLayout from '@/layouts/frontend-layout';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

interface Recipe {
    id: number;
    title: string;
    prep_time: string;
    cook_time: string;
    image: string;
    description?: string;
}

type PageProps = {
    recipes: Recipe[];
};

export default function SauceRecipes() {
    const { recipes } = usePage<PageProps>().props;

    return (
        <FrontendLayout activePage="">
            <div className="my-12 sm:my-28">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-text-main-title text-center font-bebas-neue text-4xl font-normal sm:text-[56px] mb-8">
                           The Ultimate BBQ Sauce Recipes
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {recipes.map((recipe) => (
                           <div key={recipe.id}>
                               <RecipesCard recipe={recipe} />
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
