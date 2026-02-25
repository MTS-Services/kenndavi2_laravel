import { Link } from "@inertiajs/react";

interface RecipeData {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface Props {
    recipe: RecipeData;
}


export default function RecipesCard({ recipe }: Props) {
    return (
        <div className="overflow-hidden max-w-sm mx-auto">
            {/* Recipe Image */}
            <div className="relative w-full sm:w-[300px] md:w-[350px] lg:w-[386px] h-48 bg-bg-card">
                <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            
            {/* Recipe Content */}
            <div className="mt-6">
                {/* Recipe Title */}
                <h2 className="text-xl font-normal text-black-300 font-bebas-neue">
                    {recipe.title}
                </h2>
                
                {/* Recipe Time */}
                <p className="text-base text-text-black-50 font-normal font-aktiv-grotesk">
                    {recipe.description}
                </p>
            </div>
        </div>
    )
}