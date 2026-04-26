
import OurSauces from '@/components/section/recipes/our-sauces';
import FrontendLayout from '@/layouts/frontend-layout';
import { usePage } from '@inertiajs/react';

interface Product {
    id: number
    title: string
    price?: string
    image?: string
}


interface Recipe {
    id: number;
    title: string;
    image?: string | null;
    prep_time?: string | null;
    cook_time?: string | null;
    description?: string | null;
    related_products?: Product[];
}

export default function RecipeDetails() {
    type PageProps = {
        recipe: Recipe;
    };

    const { recipe } = usePage<PageProps>().props;
    console.log(recipe);

    const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400';

    return (
        <FrontendLayout>
            <div className="mb-12 sm:mb-28">
                <div className="">
                    <img
                        src={recipe.image || PLACEHOLDER_IMAGE}
                        alt={recipe.title}
                        className="h-[430px] w-full object-cover sm:h-full"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                        }}
                    />
                </div>
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div>
                        <h2 className="mb-4 font-bebas-neue text-4xl font-normal text-text-title sm:text-[56px]">
                            {recipe.title}
                        </h2>
                    </div>

                    {recipe.description && (
                        <div className="mt-6 font-aktiv-grotesk text-base font-normal text-text-body">
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: recipe.description }}
                            />
                        </div>
                    )}
                    <OurSauces products={{ data: recipe.related_products || [] }} />
                </div>
            </div>
        </FrontendLayout>
    );
}

