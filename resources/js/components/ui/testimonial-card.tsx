interface TestimonialData {
    review: string;
    reviewerName: string;
    reviewerTitle: string;
    image: string;
}

interface Props {
    testimonial: TestimonialData;
}

export default function TestimonialCard({ testimonial }: Props) {
    return (
        <div className="bg-bg-white  px-5 py-8">
            {/* Star Rating */}
            <div className="flex mb-8">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-6 h-6 text-text-testimonial fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>
            
            {/* Review Text */}
            <p className="text-base font-normal font-inter text-text-testimonial-desc mb-6">
                {testimonial.review}
            </p>
            
            {/* Reviewer Info */}
            <div className="flex items-center">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <img 
                        src={testimonial.image} 
                        alt={testimonial.reviewerName}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Name and Title */}
                <div>
                    <h4 className="font-extrabold font-manrope text-text-black text-sm">— {testimonial.reviewerName}</h4> 
                    <p className="font-manrope text-text-testimonial-desc text-xs">{testimonial.reviewerTitle}</p>
                </div>
            </div>
        </div>
    );
}