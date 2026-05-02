import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import ProductDetailAdmin from '@/components/ui/product-detail-admin';
import ProductFeedbackAdmin from '@/components/ui/product-feedback-admin';

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
    frontendUrl: string;
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
        frontendUrl,
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
        <AdminLayout>
            <div className="">
                 <div className="flex items-center justify-between">
                <h2 className="font-poppins xl sm:text-4xl font-medium text-text-title">
                    Products Details
                </h2>
                <Link href={route('admin.pm.create')}
                    className="rounded-xl bg-bg-button px-3 sm:px-6 py-2 sm:py-4 font-inter text-base sm:text-xl font-medium text-text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                    Add a new product
                </Link>
            </div>
                <div className="">
                    <ProductDetailAdmin
                        product={product}
                        selectedImage={selectedImage}
                        onImageSelect={handleImageSelect}
                        averageRating={average_rating}
                        totalReviews={total_reviews}
                        frontendUrl={frontendUrl}
                    />

                    <ProductFeedbackAdmin
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
        </AdminLayout>
    );
}