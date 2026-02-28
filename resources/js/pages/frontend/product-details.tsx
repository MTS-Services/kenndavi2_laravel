import { MinusIcon, PlusIcon, ShoppingCartIcon, Star } from 'lucide-react';
import { useState } from 'react';

import FrontendLayout from '@/layouts/frontend-layout';
import { Link } from '@inertiajs/react';

const productImages = [
    '/assets/images/product/Rectangle 20.png',
    '/assets/images/product/01.png',
    '/assets/images/product/03.png',
    '/assets/images/product/04.png',
    '/assets/images/product/05.png',
];

const ingredients = [
    'Tomato Paste',
    'Brown Sugar',
    'Honey',
    'Apple Cider Vinegar',
    'Molasses',
    'Garlic Powder',
    'Onion Powder',
    'Smoked Paprika',
    'Natural Smoke Flavor',
    'Salt',
    'Black Pepper',
];

type RatingBreakdownRow = {
    stars: number;
    percentage: number;
    count: string;
};

const ratingBreakdown: RatingBreakdownRow[] = [
    { stars: 5, percentage: 63, count: '94,532' },
    { stars: 4, percentage: 24, count: '6,717' },
    { stars: 3, percentage: 9, count: '714' },
    { stars: 2, percentage: 1, count: '152' },
    { stars: 1, percentage: 7, count: '643' },
];

type Feedback = {
    name: string;
    time: string;
    rating: number;
    comment: string;
    avatar: string;
};

const feedbacks: Feedback[] = [
    {
        name: 'Darrell Steward',
        time: 'Just now',
        rating: 5,
        comment:
            'This sweet BBQ sauce completely changed my grilling game. The flavor is rich, smoky, and perfectly balanced!',
        avatar: '/assets/images/avatars/01.png',
    },
    {
        name: 'Brooklyn Simmons',
        time: '2 mins ago',
        rating: 5,
        comment:
            'I used it on chicken wings and everyone asked for the recipe. Absolutely delicious!',
        avatar: '/assets/images/avatars/02.png',
    },
    {
        name: 'Kathryn Murphy',
        time: '21 mins ago',
        rating: 5,
        comment: 'Not too sweet, not too smoky — just perfect. My family loves it.',
        avatar: '/assets/images/avatars/03.png',
    },
    {
        name: 'Guy Hawkins',
        time: '1 hour ago',
        rating: 5,
        comment:
            "Best BBQ sauce I've tried so far. The texture is smooth and coats the meat beautifully.",
        avatar: '/assets/images/avatars/04.png',
    },
    {
        name: 'Robert Fox',
        time: '1 day ago',
        rating: 5,
        comment: 'I even use it as a dip for fries and nuggets. So addictive!',
        avatar: '/assets/images/avatars/05.png',
    },
    {
        name: 'Esther Howard',
        time: '1 day ago',
        rating: 5,
        comment:
            "The flavor tastes premium and natural. You can really tell it's made with quality ingredients.",
        avatar: '/assets/images/avatars/06.png',
    },
    {
        name: 'Esther Howard',
        time: '1 day ago',
        rating: 5,
        comment: 'My weekend BBQ parties are incomplete without this sauce now.',
        avatar: '/assets/images/avatars/06.png',
    },
    {
        name: 'Esther Howard',
        time: '1 day ago',
        rating: 5,
        comment: 'It caramelizes perfectly on the grill. Gives that restaurant-style finish.',
        avatar: '/assets/images/avatars/06.png',
    },
];

type StarRatingProps = {
    rating: number;
    size?: 'sm' | 'md';
};

function StarRating({ rating, size = 'sm' }: StarRatingProps) {
    const iconClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';

    return (
        <div className="flex items-center gap-0.5 text-text-star-rating">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={`${iconClass} ${index < rating
                            ? 'fill-text-star-rating text-text-star-rating'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                />
            ))}
        </div>
    );
}

export default function ProductDetailsPage() {
    const [selectedImage, setSelectedImage] = useState<string>(productImages[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const handleDecrease = (): void => {
        setQuantity((current) => (current > 1 ? current - 1 : current));
    };

    const handleIncrease = (): void => {
        setQuantity((current) => current + 1);
    };

    return (
        <FrontendLayout>
            <div className="">
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:gap-16">
                        {/* Left: Product Gallery */}
                        {/* Left: Product Gallery */}
                        <div className="w-full">
                            {/* Main Image */}
                            <div className="w-full overflow-hidden aspect-square sm:aspect-[4/3] lg:aspect-[5/4]">
                                <img
                                    src={selectedImage}
                                    alt="Sweet & Smoky BBQ Sauce"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-3">
                                {productImages.map((image) => (
                                    <button
                                        key={image}
                                        type="button"
                                        onClick={() => setSelectedImage(image)}
                                        className={`relative flex-none overflow-hidden rounded-lg border transition-all
                    w-14 h-14
                    sm:w-16 sm:h-16
                    md:w-20 md:h-20
                    lg:w-[72px] lg:h-[72px]
                    xl:w-24 xl:h-24
                    ${selectedImage === image
                                                ? 'border-red-500 ring-2 ring-red-500 ring-offset-2 ring-offset-white'
                                                : 'border-gray-200 hover:border-red-400'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt="Sweet & Smoky BBQ Sauce thumbnail"
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="space-y-6 lg:space-y-8">
                            {/* Rating */}
                            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
                                <StarRating rating={5} />

                                <span className="font-public-sans text-sm font-semibold text-text-title">
                                    4.7 Star Rating{' '}
                                    <span className="mx-1 text-gray-300">|</span>
                                    <span className="font-public-sans text-sm font-normal text-text-gray-300">
                                        {' '}
                                        3,197 User Feedback
                                    </span>
                                </span>
                            </div>

                            {/* Title & Description */}
                            <div className="space-y-3">
                                <h1 className="font-bebas-neue text-[32px] font-normal uppercase text-text-title">
                                    Sweet & Smoky Perfection in Every Drop
                                </h1>
                                <p className="font-aktiv-grotesk text-base font-normal text-text-body">
                                    A rich and smooth sweet BBQ sauce crafted with the perfect balance
                                    of sweetness and smoky flavor. Ideal for grilling, dipping, or
                                    glazing to make every bite irresistibly delicious.
                                </p>
                            </div>

                            <div>
                                {/* Ingredients */}
                                <div>
                                    <h2 className="font-bebas-neue text-2xl font-normal uppercase text-text-title">
                                        Ingredients
                                    </h2>
                                    <div className="mt-3 space-y-2 font-aktiv-grotesk text-base font-normal text-text-body">
                                        {ingredients.map((item) => (
                                            <div key={item} className="flex items-center gap-2">
                                                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-current" />
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price & Actions */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="py-2">
                                            <p className="mt-2 font-public-sans text-sm font-normal text-text-body">
                                                Availability:
                                                <span className="font-semibold text-text-green">
                                                    {' '}
                                                    In Stock
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-end gap-3">
                                            <h3 className="font-public-sans text-2xl font-semibold text-text-green">
                                                $16.99
                                            </h3>
                                            <span className="bg-bg-our-story py-1.5 px-2.5 font-public-sans text-sm font-semibold uppercase text-text-green">
                                                21% OFF
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full border-b border-bg-gray-300" />

                                    <div className="flex flex-wrap items-center gap-4">
                                        {/* Quantity Selector */}
                                        <div className="inline-flex items-center gap-9 border border-bg-gray-300 p-5">
                                            <button
                                                type="button"
                                                onClick={handleDecrease}
                                                className="text-text-body"
                                            >
                                                <MinusIcon className="h-4 w-4" />
                                            </button>
                                            <span className="mx-4 w-6 text-center font-public-sans text-base font-normal text-text-body">
                                                {quantity.toString().padStart(2, '0')}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleIncrease}
                                                className="text-text-body"
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-center gap-3">
                                            <Link href={route('frontend.order-confirmed')} className="flex items-center gap-2 bg-text-buy-now px-6 py-5 font-public-sans text-xs font-bold uppercase text-text-white">
                                                <span>Add to cart</span>
                                                <ShoppingCartIcon className="h-4 w-4" />
                                            </Link>
                                            <Link href={route('frontend.shopping-info')} className="flex border border-text-buy-now px-6 py-5 font-public-sans text-xs font-bold uppercase text-text-buy-now">
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Feedback Section */}
                    <div className="mt-16">
                        <h2 className="mb-8 font-bebas-neue text-[40px] font-normal uppercase text-text-title">
                            Customer Feedback
                        </h2>

                        {/* Rating Summary */}
                        <div className="mb-10 flex flex-col gap-6 md:flex-row">
                            {/* Overall Rating Box */}
                            <div className="flex min-w-[200px] flex-col items-center justify-center rounded-sm border bg-[#FBF4CE] px-10 py-8">
                                <span className="font-public-sans text-[56px] font-medium text-base text-text-title">
                                    4.7
                                </span>
                                <div className="mt-2">
                                    <StarRating rating={5} size="md" />
                                </div>
                                <p className="mt-2 font-public-sans text-sm font-normal text-text-body">
                                    Customer Rating{' '}
                                    <span className="font-public-sans text-base  font-normal  text-text-gray-300">(934,516)</span>
                                </p>
                            </div>

                            {/* Rating Breakdown */}
                            <div className="flex flex-1 flex-col justify-center gap-2">
                                {ratingBreakdown.map((row) => (
                                    <div key={row.stars} className="flex items-center gap-3">
                                        <div className="flex w-24 flex-shrink-0 items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    className={`h-3.5 w-3.5 ${index < row.stars
                                                            ? 'fill-text-star-rating text-text-star-rating'
                                                            : 'fill-gray-200 text-gray-200'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-text-star-rating"
                                                style={{ width: `${row.percentage}%` }}
                                            />
                                        </div>

                                        <div className="flex w-24 flex-shrink-0 items-center gap-1.5">
                                            <span className="font-public-sans text-sm font-semibold text-text-title">
                                                {row.percentage}%
                                            </span>
                                            <span className="font-public-sans text-xs font-normal text-text-gray-300">
                                                ({row.count})
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8 w-full border-b border-gray-100" />

                        {/* Feedback List */}
                        <h3 className="mb-6 font-public-sans text-base font-semibold text-text-title">
                            Customer Feedback
                        </h3>

                        <div className="max-w-2xl space-y-7">
                            {feedbacks.map((feedback) => (
                                <div key={`${feedback.name}-${feedback.time}`}>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                                            <img
                                                src={feedback.avatar}
                                                alt={feedback.name}
                                                className="h-full w-full object-cover"
                                                onError={(event) => {
                                                    (event.currentTarget as HTMLImageElement).style.display =
                                                        'none';
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-public-sans text-sm font-semibold text-text-title">
                                                {feedback.name}
                                            </span>
                                            <span className="text-xs text-text-gray-300">·</span>
                                            <span className="font-public-sans text-xs font-normal text-text-gray-300">
                                                {feedback.time}
                                            </span>
                                        </div>
                                    </div>

                                    <StarRating rating={feedback.rating} size="sm" />

                                    <p className="mt-1.5 font-aktiv-grotesk text-sm font-normal text-text-body">
                                        {feedback.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}