import { Link } from "@inertiajs/react";
import { EditIcon, Trash2 } from "lucide-react";
import { productData } from "./product-card-admin";
import DeleteModal from './delete-modal';

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

}

interface Props {
    recipe: RecipeData;
}

export default function RecipeCardAdmin({ recipe }: Props) {
    const primaryImage = recipe.images?.find((img: RecipeImage) => img.is_primary);
    const imageUrl = primaryImage?.image || recipe.image || '/assets/images/placeholder.jpg';

    const href = route('frontend.recipe-details', recipe.id);

    return (
        <div className="rounded-md bg-bg-card shadow-md px-4 py-3">
            <a href={href} target="_blank" rel="noopener noreferrer">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={recipe.title}
                    className="w-full h-64 object-cover rounded-t-md"
                />
            </div>
            </a>
            <div className="mt-3">   
                <a href={href} target="_blank" rel="noopener noreferrer">
                <h3 className="mb-2 font-inter text-xl font-medium text-text-title">
                    {recipe.title}
                </h3>
                </a>
                <a href={href} target="_blank" rel="noopener noreferrer">
                {/* <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body line-clamp-2">
                   {recipe.description}
                </p> */}
                <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body">
                   <div className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body line-clamp-3" dangerouslySetInnerHTML={{ __html: recipe.description }} />
                </p>
                </a>
                <div className="flex items-center justify-between">
                    <Link href={route('admin.rm.edit', recipe.id)}
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-green border border-text-green px-8 py-2.5 rounded-md bg-bg-our-story cursor-pointer"
                    >
                        <EditIcon /> Edit
                    </Link>
                    <DeleteModal 
                        href={route('admin.rm.delete', recipe.id)}
                        title="Delete Recipe"
                        message="Are you sure you want to delete this recipe? This action cannot be undone."
                        confirmText="Delete"
                        className="flex cursor-pointer items-center gap-3.5 font-inter text-base font-medium text-text-buy-now border border-text-buy-now px-8 py-2.5 rounded-md bg-text-buy-now/5"
                    >
                        <Trash2 /> Delete
                    </DeleteModal>
                </div>
            </div>
        </div>
    );
}