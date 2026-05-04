import { Link, Star } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

type StarRatingProps = { rating: number; size?: 'sm' | 'md' };

function StarRating({ rating, size = 'sm' }: StarRatingProps) {
    const iconClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
    return (
        <div className="flex items-center gap-0.5 text-text-star-rating">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={`${iconClass} ${index < rating ? 'fill-text-star-rating text-text-star-rating' : 'fill-gray-200 text-gray-200'}`}
                />
            ))}
        </div>
    );
}

interface Product {
    id: number;
    title: string;
    description?: string;
    images?: {
        id: number;
        image: string;
        is_primary: boolean;
    }[];
    rating?: number;
    reviews_count?: number;
}

interface Props {
    product: Product;
    selectedImage: string;
    onImageSelect: (image: string) => void;
    averageRating: number;
    totalReviews: number;
    frontendUrl: string;
}

export default function ProductDetailAdmin({
    product,
    selectedImage,
    onImageSelect,

    averageRating,
    totalReviews,
    frontendUrl,
}: Props) {
    const qrRef = useRef<SVGSVGElement>(null);
    const productImages =
        product.images?.map((img) => `/storage/${img.image}`) || [];
    const rating = averageRating || 0;
    const reviewsCount = totalReviews || 0;

     // ── Download as SVG ──────────────────────────────────────────────
    const downloadSVG = () => {
        const svg = qrRef.current;
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${product.title}-qrcode.svg`;
        a.click();
        URL.revokeObjectURL(url);
    };
    return (
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:gap-16">
            {/* Left: Product Gallery */}
            <div className="w-full">
                <div className="aspect-square w-full overflow-hidden sm:aspect-4/3 lg:aspect-5/4">
                    <img
                        src={selectedImage}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 md:mt-4 md:gap-3">
                    {productImages.map((image) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => onImageSelect(image)}
                            className={`relative h-14 w-14 flex-none overflow-hidden rounded-lg border transition-all sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-18 lg:w-18 xl:h-24 xl:w-24 ${selectedImage === image ? 'border-red-500 ring-2 ring-red-500 ring-offset-2 ring-offset-white' : 'border-gray-200 hover:border-red-400'}`}
                        >
                            <img
                                src={image}
                                alt={`${product.title} thumbnail`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6 lg:space-y-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
                    <StarRating rating={rating} />
                    <span className="font-public-sans text-sm font-semibold text-text-title">
                        {rating} Star Rating{' '}
                        <span className="mx-1 text-gray-300">|</span>
                        <span className="font-public-sans text-sm font-normal text-text-gray-300">
                            {' '}
                            {reviewsCount.toLocaleString()} User Feedback
                        </span>
                    </span>
                </div>

                <div className="space-y-3">
                    <h1 className="font-bebas-neue text-[32px] font-normal text-text-title uppercase">
                        {product.title}
                    </h1>
                    <div
                        className="prose prose-sm mb-4 max-w-none font-aktiv-grotesk text-base font-normal text-text-body"
                        dangerouslySetInnerHTML={{
                            __html: product.description ?? '',
                        }}
                    />
                </div>
                <div className="space-y-6">
                  {/* <div className="space-y-3">
                        <div className="p-4 bg-white shadow rounded flex flex-col items-center w-fit">
                            <QRCodeSVG ref={qrRef} value={frontendUrl} size={200} />
                            <p className="mt-2 text-xs text-gray-500">Scan to View</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={downloadSVG}
                                className="rounded-xl bg-bg-button px-3 sm:px-4 py-2 sm:py-3 font-inter text-base sm:text-xl font-medium  text-white hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                ↓ SVG
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
