interface Feedback {
    message: string;
    rating: number;
    user: {
        name: string;
        title: string;
        image_url: string;
    };
}

interface Props {
    testimonial: Feedback;
}

export default function TestimonialCard({ testimonial }: Props) {  
    return (
        <div className="bg-bg-white shadow-lg px-5 py-8 rounded-sm border border-gray-100 h-full flex flex-col">
            {/* Star Rating */}
            <div className="flex mb-8">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-6 h-6 ${i < testimonial.rating ? 'text-text-testimonial fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>
            
            {/* Review Text */}
            <p className="text-base font-normal font-inter text-text-testimonial-desc mb-6 line-clamp-3 grow">
                {testimonial.message}
            </p>
            
            {/* Reviewer Info */}
            <div className="flex items-center">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <img 
                        src={testimonial.user.image_url} 
                        alt={testimonial.user.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Name and Title */}
                <div>
                    <h4 className="font-extrabold font-manrope text-text-black text-sm">— {testimonial.user.name}</h4> 
                    <p className="font-manrope text-text-testimonial-desc text-xs">{testimonial.user.title}</p>
                </div>
            </div>
        </div>
    );
}