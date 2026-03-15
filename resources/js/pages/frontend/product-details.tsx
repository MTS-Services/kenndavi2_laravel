import { useState } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductDetail from '@/components/section/products/detail';
import ProductFeedback from '@/components/section/products/feedback';
import { usePage } from '@inertiajs/react';

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
};

const allFeedbacks = [
    { name: 'Darrell Steward', time: 'Just now', rating: 5, comment: 'This sweet BBQ sauce completely changed my grilling game. The flavor is rich, smoky, and perfectly balanced!', avatar: '/assets/images/avatars/01.png' },
    { name: 'Brooklyn Simmons', time: '2 mins ago', rating: 5, comment: 'I used it on chicken wings and everyone asked for the recipe. Absolutely delicious!', avatar: '/assets/images/avatars/02.png' },
    { name: 'Kathryn Murphy', time: '21 mins ago', rating: 5, comment: 'Not too sweet, not too smoky — just perfect. My family loves it.', avatar: '/assets/images/avatars/03.png' },
    { name: 'Guy Hawkins', time: '1 hour ago', rating: 5, comment: "Best BBQ sauce I've tried so far. The texture is smooth and coats the meat beautifully.", avatar: '/assets/images/avatars/04.png' },
    { name: 'Robert Fox', time: '1 day ago', rating: 5, comment: 'I even use it as a dip for fries and nuggets. So addictive!', avatar: '/assets/images/avatars/05.png' },
    { name: 'Esther Howard', time: '1 day ago', rating: 5, comment: "The flavor tastes premium and natural. You can really tell it's made with quality ingredients.", avatar: '/assets/images/avatars/06.png' },
    { name: 'Esther Howard', time: '1 day ago', rating: 5, comment: 'My weekend BBQ parties are incomplete without this sauce now.', avatar: '/assets/images/avatars/06.png' },
    { name: 'Esther Howard', time: '1 day ago', rating: 5, comment: 'It caramelizes perfectly on the grill. Gives that restaurant-style finish.', avatar: '/assets/images/avatars/06.png' },
];
// const feedbacks = product.feedbacks || [];

const TOTAL_PAGES = 10;

export default function ProductDetailsPage() {
    const { product, calculated, feedbacks, rating_breakdown, average_rating, total_reviews } = usePage<PageProps>().props;
    const productImages = product.images?.map(img => `/storage/${img.image}`) || [];
    const [selectedImage, setSelectedImage] = useState<string>(productImages[0] || '/assets/images/product/Rectangle 20.png');
    const [quantity, setQuantity] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Transform feedback data for the component
    const transformedFeedbacks = feedbacks?.map((feedback: any) => ({
        name: feedback.user?.name || 'Anonymous User',
        time: new Date(feedback.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }),
        rating: feedback.rating,
        comment: feedback.message,
        image: feedback.user?.image,
    })) || [];

    console.log(transformedFeedbacks);

    const handleDecrease = (): void => setQuantity((current) => (current > 1 ? current - 1 : current));
    const handleIncrease = (): void => setQuantity((current) => current + 1);

    const handleImageSelect = (image: string) => {
        setSelectedImage(image);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to feedback section
        document.getElementById('customer-feedback')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                        currentPage={currentPage}
                        totalPages={TOTAL_PAGES}
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