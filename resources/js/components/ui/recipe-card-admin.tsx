import { Link } from "@inertiajs/react";
import { EditIcon, Trash2 } from "lucide-react";
import { productData } from "./product-card-admin";

export interface RecipeImage {
    id: string;
    image: string;
    is_primary: boolean;
}

export interface RecipeData {
    id: string;
    title: string;
    description: string;
    price: string;
    image?: string; 
    images?: RecipeImage[]; 
    category?: string;
    href: string;
    available?: number;
}

interface Props {
    recipe: RecipeData;
}

export default function RecipeCardAdmin({ recipe }: Props) {
    const primaryImage = recipe.images?.find((img: RecipeImage) => img.is_primary);
    const imageUrl = primaryImage?.image || recipe.image || '/assets/images/placeholder.jpg';

    return (
        <div className="rounded-md bg-bg-card shadow-md px-4 py-3">
            <Link href={recipe.href} target="_blank" rel="noopener noreferrer">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={recipe.title}
                    className="w-full h-64 object-cover rounded-t-md"
                />
                {recipe.category && (
                    <span className="absolute left-4 top-4 rounded-sm bg-bg-white px-3 py-1 font-inter text-sm font-medium text-text-title">
                        {recipe.category}
                    </span>
                )}
                {recipe.available && (
                    <span className="absolute left-0 bottom-0 bg-text-green px-3 py-1 font-inter text-xs font-medium text-text-white">
                        Available {recipe.available}
                    </span>
                )}
            </div>
            </Link>
            <div className="mt-3">   
                <Link href={recipe.href} target="_blank" rel="noopener noreferrer">
                <h3 className="mb-2 font-inter text-xl font-medium text-text-title">
                    {recipe.title}
                </h3>
                </Link>
                <Link href={recipe.href} target="_blank" rel="noopener noreferrer">
                <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body line-clamp-2">
                   {recipe.description}
                </p>
                </Link>
                <div className="flex items-center justify-between">
                    <Link href={route('admin.rm.edit', recipe.id)}
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-green border border-text-green px-8 py-2.5 rounded-md bg-bg-our-story cursor-pointer"
                    >
                        <EditIcon /> Edit
                    </Link>
                    <Link 
                        href={route('admin.rm.delete', recipe.id)}
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-buy-now border border-text-buy-now px-8 py-2.5 rounded-md bg-text-buy-now/5"
                    >
                      <Trash2 />  Delete
                    </Link>
                </div>
            </div>
        </div>
    );
}