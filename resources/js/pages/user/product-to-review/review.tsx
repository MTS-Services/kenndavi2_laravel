import { Textarea } from '@/components/ui/textarea';
import FrontendLayout from '@/layouts/frontend-layout';
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function Review() {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

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
                            onClick={() => setRating(starValue)}
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
                        </div>
                        
                        <div className="mt-8">
                            <h2 className="mb-2 font-bebas-neue text-xl font-normal text-text-title">
                                Review
                            </h2>
                            <Textarea 
                                className="w-full rounded-md border bg-bg-white p-2 placeholder:text-text-body" 
                                placeholder="Write your review here..."
                                rows={4}
                            />
                        </div>
                        
                        <div className="mt-8">
                            <button className="w-full rounded-md bg-text-buy-now text-text-white py-3 font-poppins text-base font-medium">
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
