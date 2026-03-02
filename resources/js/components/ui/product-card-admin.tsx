import { Link } from "@inertiajs/react";
import { EditIcon,  Trash2 } from "lucide-react";

export interface productData {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category?: string;
    href: string;
    available?: number;
}

interface Props {
    product: productData;
    onEdit?: (product: productData) => void;
}

export default function ProductCardAdmin({ product, onEdit }: Props) {
    return (
        <div className="rounded-md bg-bg-card shadow-md px-4 py-3">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-md"
                />
                {product.category && (
                    <span className="absolute left-4 top-4 rounded-sm bg-bg-white px-3 py-1 font-inter text-sm font-medium text-text-title">
                        {product.category}
                    </span>
                )}
                {product.available && (
                    <span className="absolute left-0 bottom-0 bg-text-green px-3 py-1 font-inter text-xs font-medium text-text-white">
                        Available {product.available}
                    </span>
                )}
            </div>
            <div className="mt-3">   
                <h3 className="mb-2 font-inter text-xl font-medium text-text-title">
                    {product.name}
                </h3>
                <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body">
                   {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <button 
                        onClick={() => onEdit?.(product)}
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-green border border-text-green px-8 py-2.5 rounded-md bg-bg-our-story"
                    >
                        <EditIcon /> Edit
                    </button>
                    <Link 
                        href="#"
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-buy-now border border-text-buy-now px-8 py-2.5 rounded-md bg-text-buy-now/5"
                    >
                      <Trash2 />  Delete
                    </Link>
                </div>
            </div>
        </div>
    );
}