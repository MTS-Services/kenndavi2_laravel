import RecipesCard from '@/components/ui/recipes-card';
import { Link } from '@inertiajs/react';

interface Props {
    recipes?: {
        data?: any[];
    };
}

export default function BbqSauceRecipes({ recipes }: Props) {
    const items = recipes?.data ?? [];
    
    return (
        <div className="mt-12 sm:mt-28">
            <div className="container mx-auto px-4">
                <div>
                    <h2 className="text-center font-bebas-neue text-3xl sm:text-[56px] font-normal text-text-main-title mb-8">
                        Bbq Sauce Recipes
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((recipe) => (
                        <RecipesCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
                <Link
                    href={route('frontend.sauce-recipes')}
                    className="mx-auto mt-6 block w-fit rounded-full bg-bg-button px-6 py-3 font-bebas-neue text-xl font-normal text-text-white"
                >
                    Explore More recipe
                </Link>
            </div>
        </div>
    );
}
