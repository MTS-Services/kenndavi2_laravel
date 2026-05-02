import { Link } from "@inertiajs/react";
import { EditIcon, Trash2 } from "lucide-react";
import DeleteModal from './delete-modal';

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
        : 'https://placehold.co/600x400';
        const href = route('admin.pm.show', product.id);

    return (
        <div className="rounded-md bg-bg-card shadow-md px-4 py-3">
            <a href={href} rel="noopener noreferrer">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-t-md"
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
            </a>
            <div className="mt-3">   
                <a href={href} rel="noopener noreferrer">
                <h3 className="mb-2 font-inter text-xl font-medium text-text-title">
                    {product.title}
                </h3>
                </a>
                <a href={href} rel="noopener noreferrer">
                <div
                    className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
                </a>
                <div className="flex items-center justify-between">
                    <Link href={route('admin.pm.edit', product.id)}
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-green border border-text-green px-8 py-2.5 rounded-md bg-bg-our-story cursor-pointer"
                    >
                        <EditIcon /> Edit
                    </Link>
                    <DeleteModal 
                        href={route('admin.pm.delete', product.id)}
                        title="Delete Product"
                        message="Are you sure you want to delete this product? This action cannot be undone."
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