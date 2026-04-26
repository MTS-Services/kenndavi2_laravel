import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductDetail from '@/components/section/products/detail';
import ProductFeedback from '@/components/section/products/feedback';

type Product = {
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
};

type PageProps = {
    product: Product;
    calculated: {
        original_price: number;
        discount_value: number;
        discount_type: string;
        discount_amount: number;
        discounted_price: number;
        total_price: number;
        formatted_original_price: string;
        formatted_discounted_price: string;
        formatted_discount: string;
        has_discount: boolean;
        stock_status: string;
        stock_status_text: string;
        can_add_to_cart: boolean;
        stock_level: number;
    };
    feedbacks: Array<{
        id: number;
        name: string;
        time: string;
        rating: number;
        comment: string;
        image: string | null;
    }>;
    rating_breakdown: Array<{
        stars: number;
        percentage: number;
        count: number;
    }>;
    average_rating: number;
    total_reviews: number;
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

export default function ProductDetailsPage() {
    const {
        product,
        calculated,
        feedbacks,
        rating_breakdown,
        average_rating,
        total_reviews,
        pagination,
    } = usePage<PageProps>().props;

    const productImages = product.images?.map((img) => `/storage/${img.image}`) || [];
    const [selectedImage, setSelectedImage] = useState<string>(
        productImages[0] || 'https://placehold.co/600x400',
    );
    const [quantity, setQuantity] = useState<number>(1);

    const handleDecrease = (): void => setQuantity((current) => (current > 1 ? current - 1 : current));
    const handleIncrease = (): void => setQuantity((current) => current + 1);

    const handleImageSelect = (image: string) => {
        setSelectedImage(image);
    };

    const handlePageChange = (page: number) => {
        router.get(
            window.location.pathname,
            { feedback_page: page },
            {
                preserveState: true,
                preserveScroll: false,
                onSuccess: () => {
                    document.getElementById('customer-feedback')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                },
            },
        );
    };

    return (
        <FrontendLayout>
            <div className="">
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <ProductDetail
                        product={product}
                        calculated={calculated}
                        selectedImage={selectedImage}
                        quantity={quantity}
                        onImageSelect={handleImageSelect}
                        onQuantityDecrease={handleDecrease}
                        onQuantityIncrease={handleIncrease}
                        averageRating={average_rating}
                        totalReviews={total_reviews}
                    />

                    <ProductFeedback
                        currentPage={pagination.current_page}
                        totalPages={pagination.last_page}
                        onPageChange={handlePageChange}
                        feedbacks={feedbacks}
                        ratingBreakdown={rating_breakdown}
                        averageRating={average_rating}
                        totalReviews={total_reviews}
                    />
                </div>
            </div>
        </FrontendLayout>
    );
}