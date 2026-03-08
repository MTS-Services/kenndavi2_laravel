import { Link } from "@inertiajs/react";
import { EditIcon, Trash2 } from "lucide-react";

export interface ProductImage {
    id: string;
    image: string;
    is_primary: boolean;
}

export interface productData {
    id: string;
    title: string;
    description: string;
    price: string;
    image?: string; 
    images?: ProductImage[]; 
    category?: string;
    href: string;
    available?: number;
}

interface Props {
    product: productData;
}

export default function ProductCardAdmin({ product }: Props) {
    const primaryImage = product.images?.find(img => img.is_primary);
    const imageUrl = primaryImage
        ? `/storage/${primaryImage.image}`
        : product.image
        ? `/storage/${product.image}`
        : '/assets/images/placeholder.jpg';

    return (
        <div className="rounded-md bg-bg-card shadow-md px-4 py-3">
            <Link href={product.href} target="_blank" rel="noopener noreferrer">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={product.title}
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
            </Link>
            <div className="mt-3">   
                <Link href={product.href} target="_blank" rel="noopener noreferrer">
                <h3 className="mb-2 font-inter text-xl font-medium text-text-title">
                    {product.title}
                </h3>
                </Link>
                <Link href={product.href} target="_blank" rel="noopener noreferrer">
                <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body line-clamp-2">
                   {product.description}
                </p>
                </Link>
                <div className="flex items-center justify-between">
                    <Link href={route('admin.pm.edit', product.id)}
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-green border border-text-green px-8 py-2.5 rounded-md bg-bg-our-story cursor-pointer"
                    >
                        <EditIcon /> Edit
                    </Link>
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