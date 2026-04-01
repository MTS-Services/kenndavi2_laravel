import { Link } from "@inertiajs/react";
import { id } from "date-fns/locale";

interface Props {
    product: any;
}

export default function SaucesCard({ product }: Props) {
    const primaryImage = product?.images?.find((img: any) => img.is_primary);
    const imagePath = primaryImage?.image || product?.image;
    const imageUrl = imagePath ? `/storage/${imagePath}` : '/assets/images/placeholder.jpg';

    const href = route('frontend.product-details', product.id);

    return (
        <div className="rounded-md bg-bg-card shadow-md px-4 py-3">
            <div className="relative">
              <Link href={href}>
                <img
                    src={imageUrl}
                    alt={product?.title}
                    className="w-full h-full object-cover rounded-t-md"
                />
                {/* <span className="absolute left-4 top-4 rounded-sm bg-bg-white px-3 py-1 font-inter text-sm font-medium text-text-title">
                    {product?.tag?.name}
                </span> */}
                </Link>
            </div>
            <div className="mt-3">   
               <Link href={href}>
                <h3 className="mb-2 font-bebas-neue text-3xl font-normal text-text-title">
                    {product?.title}
                </h3>
                </Link>
               <Link href={href}>
                <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body">
                   <div className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description }} />
                </p>
                {/* <div
                    className="prose prose-sm mb-4 max-h-14 overflow-hidden font-aktiv-grotesk text-base font-normal text-text-body"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                /> */}
               </Link>
                <div className="flex items-center justify-between">
                    <span className="font-aktiv-grotesk text-2xl font-normal text-text-title line-clamp-3">
                        Price {product?.price}$
                    </span>
                    <Link 
                        href={href}
                        className="rounded-md bg-bg-button  px-3 sm:px-6 py-1.5 sm:py-3 font-inter text-base font-medium text-text-white"
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
}