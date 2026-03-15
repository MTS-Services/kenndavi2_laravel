import { Textarea } from '@/components/ui/textarea';
import FrontendLayout from '@/layouts/frontend-layout';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Review() {
    const { id: productId, order_id } = usePage().props as any;
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: productId,
        order_id: order_id,
        rating: 0,
        message: '',
        
    });

    const StarRating = () => {
        return (
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= (hoveredStar || rating);
                    
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                setRating(starValue);
                                setData('rating', starValue);
                            }}
                            onMouseEnter={() => setHoveredStar(starValue)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="transition-colors"
                        >
                            <Star
                                className={`h-6 w-6 ${
                                    isFilled
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'fill-gray-200 text-gray-200'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        post(route('user.fd.store'), {
            onSuccess: () => {
                reset();
                setRating(0);
                toast.success('Review submitted successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to submit review. Please try again.');
            }
        });
    };

    return (
        <FrontendLayout>
            <div>
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="rounded-sm bg-bg-our-story p-6">
                        <div className="mb-8">
                            <h2 className="font-bebas-neue text-2xl font-normal text-text-title uppercase">
                                How was your experience?
                            </h2>
                            <p className="font-aktiv-grotesk text-base font-normal text-text-body">
                                Your review helps other customers make better choices
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8">
                                <h2 className="mb-4 font-bebas-neue text-xl font-normal text-text-title">
                                    Rating
                                </h2>
                                <StarRating />
                                {rating > 0 && (
                                    <p className="mt-2 font-aktiv-grotesk text-sm text-text-body">
                                        You rated this {rating} star{rating !== 1 ? 's' : ''}
                                    </p>
                                )}
                                {errors.rating && (
                                    <p className="mt-2 text-sm text-red-500">{errors.rating}</p>
                                )}
                            </div>
                            
                            <div className="mt-8">
                                <h2 className="mb-2 font-bebas-neue text-xl font-normal text-text-title">
                                    Review
                                </h2>
                                <Textarea 
                                    className="w-full rounded-md border bg-bg-white p-2 placeholder:text-text-body" 
                                    placeholder="Write your review here..."
                                    rows={4}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                />
                                {errors.message && (
                                    <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                                )}
                            </div>
                            
                            <div className="mt-8">
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-md bg-text-buy-now text-text-white py-3 font-poppins text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
