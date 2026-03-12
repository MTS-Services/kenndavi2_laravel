import { Link } from '@inertiajs/react';
import { MinusIcon, PlusIcon, ShoppingCartIcon, Star } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

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
    price?: number;
    discount?: number;
    stock_level?: number;
    rating?: number;
    reviews_count?: number;
}

interface Props {
    product: Product;
    selectedImage: string;
    quantity: number;
    onImageSelect: (image: string) => void;
    onQuantityDecrease: () => void;
    onQuantityIncrease: () => void;
}

export default function ProductDetail({
    product,
    selectedImage,
    quantity,
    onImageSelect,
    onQuantityDecrease,
    onQuantityIncrease,
}: Props) {
    const productImages =
        product.images?.map((img) => `/storage/${img.image}`) || [];
    const rating = product.rating || 5;
    const reviewsCount = product.reviews_count || 3197;
    const price = product.price
        ? `$${Number(product.price).toFixed(2)}`
        : '$16.99';
    const discount = product.discount
        ? `${Number(product.discount)}% OFF`
        : '21% OFF';
    const availability =
        product.stock_level && product.stock_level > 0
            ? 'In Stock'
            : 'Out of Stock';

    const handleAddToCart = () => {

        router.post(
            route('frontend.cart.add'),
            {
                product_id: product.id,
                quantity: quantity,
            },
            {
                onSuccess: () => toast.success('Added to cart!'),
                onError: (errors) => toast.error('Failed to add to cart'),
            },
        );
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
                    <div>
                        <div className="py-2">
                            <p className="mt-2 font-public-sans text-sm font-normal text-text-body">
                                Availability:{' '}
                                <span className="font-semibold text-text-green">
                                    {' '}
                                    {availability}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-wrap items-end gap-3">
                            <h3 className="font-public-sans text-2xl font-semibold text-text-green">
                                {price}
                            </h3>
                            {discount && product.discount && (
                                <span className="bg-bg-our-story px-2.5 py-1.5 font-public-sans text-sm font-semibold text-text-green uppercase">
                                    {discount}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="border-bg-gray-300 w-full border-b" />

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="border-bg-gray-300 inline-flex items-center gap-9 border p-5">
                            <button
                                type="button"
                                onClick={onQuantityDecrease}
                                className="text-text-body"
                            >
                                <MinusIcon className="h-4 w-4 cursor-pointer" />
                            </button>
                            <span className="mx-4 w-6 text-center font-public-sans text-base font-normal text-text-body">
                                {quantity.toString().padStart(2, '0')}
                            </span>
                            <button
                                type="button"
                                onClick={onQuantityIncrease}
                                className="text-text-body"
                            >
                                <PlusIcon className="h-4 w-4 cursor-pointer" />
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="flex cursor-pointer items-center gap-2 bg-text-buy-now px-6 py-5 font-public-sans text-xs font-bold text-text-white uppercase"
                            >
                                <span>Add to cart</span>
                                <ShoppingCartIcon className="h-4 w-4" />
                            </button>
                            <Link
                                href={route('frontend.shopping-info')}
                                onClick={handleAddToCart}
                                className="flex cursor-pointer border border-text-buy-now px-6 py-5 font-public-sans text-xs font-bold text-text-buy-now uppercase"
                            >
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
