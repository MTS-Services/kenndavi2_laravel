import { Link } from "@inertiajs/react";

interface RecipeData {
    id: string;
    title: string;
    cook_time: string;
    prep_time: string;
    image: string;
}

interface Props {
    recipe: RecipeData;
}


export default function RecipesCard({ recipe }: Props) {
    return (
        <div className="mb-8">
            {/* Recipe Image */}
            <div className="relative w-full aspect-[386/240] overflow-hidden rounded-md">
               <Link href={route('frontend.recipe-details', recipe.id)}>
                <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
               </Link>
            </div>
            
            {/* Recipe Content */}
            <div className="mt-4">
                {/* Recipe Title */}
        
                <Link href={route('frontend.recipe-details', recipe.id)}>
                <h2 className="text-xl font-normal text-black-300 font-bebas-neue">
                    {recipe.title}
                </h2>
                </Link>
                
                {/* Recipe Time */}
                <Link href={route('frontend.recipe-details', recipe.id)} className="flex items-center gap-1">
                <p className="text-base text-text-black-50 font-normal font-aktiv-grotesk">
                    {recipe.prep_time}
                </p>
                <span className="border border-text-black-50 w-0.5 h-4 bg-text-black-50"> </span>
                <p className="text-base text-text-black-50 font-normal font-aktiv-grotesk">
                    {recipe.cook_time}
                </p>
                </Link>
            </div>
        </div>
    )
}