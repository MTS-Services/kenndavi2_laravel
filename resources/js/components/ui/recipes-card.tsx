import { Link } from "@inertiajs/react";

interface Recipe {
    id: number;
    title: string;
    cook_time: string;
    prep_time: string;
    image: string | null;
}

interface Props {
    recipe: Recipe;
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400';

export default function RecipesCard({ recipe }: Props) {
    return (
        <div className="mb-8">

            {/* Image */}
            <div className="relative w-full aspect-[386/240] overflow-hidden rounded-md">
                <Link href={route('frontend.recipe-details', recipe.id)}>
                    <img
                        src={recipe.image || PLACEHOLDER_IMAGE}
                        alt={recipe.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                        }}
                    />
                </Link>
            </div>

            {/* Content */}
            <div className="mt-4">

                <Link href={route('frontend.recipe-details', recipe.id)}>
                    <h2 className="text-xl font-normal text-black-300 font-bebas-neue">
                        {recipe.title}
                    </h2>
                </Link>

                <Link 
                    href={route('frontend.recipe-details', recipe.id)} 
                    className="flex items-center gap-1"
                >
                    <p className="text-base text-text-black-50 font-normal font-aktiv-grotesk">
                        {recipe.prep_time}
                    </p>

                    <span className="border border-text-black-50 w-0.5 h-4 bg-text-black-50"></span>

                    <p className="text-base text-text-black-50 font-normal font-aktiv-grotesk">
                        {recipe.cook_time}
                    </p>
                </Link>

            </div>
        </div>
    );
}