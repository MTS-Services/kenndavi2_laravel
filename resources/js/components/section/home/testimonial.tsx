import TestimonialCard from '@/components/ui/testimonial-card';

const testimonialData = [
    {
        id: 1,
        review: 'This is hands down the best BBQ sauce I’ve ever tried. The perfect balance of sweet and smoky flavor makes every grilled dish taste amazing. Highly recommended!',
        reviewerName: 'Rahim A.',
        reviewerTitle: 'Honda Rider',
        image: '/assets/images/home/Ellipse 1.png',
    },
    {
        id: 2,
        review: 'The Honey BBQ sauce is incredibly smooth and rich. It gives my chicken wings a beautiful glaze and an unforgettable taste. My family loves it!',
        reviewerName: 'Rahim A.',
        reviewerTitle: 'Honda Rider',
        image: '/assets/images/home/Ellipse 1.png',
    },
    {
        id: 3,
        review: 'The Teriyaki BBQ sauce adds a bold, savory twist to my grilled dishes. It’s now a must-have in my kitchen for marinades and stir-fries.',
        reviewerName: 'Rahim A.',
        reviewerTitle: 'Honda Rider',
        image: '/assets/images/home/Ellipse 1.png',
    },
];

export default function Testimonial() {
    return (
        <div className="mt-12 sm:mt-28 ">
            <div className="container mx-auto px-4">
                <p className="font-imter text-center text-base font-medium tracking-[15px] text-text-testimonial">
                    Testimonial
                </p>
                <h2 className="text-center font-bebas-neue text-3xl sm:text-[56px] font-normal text-text-main-title">
                    What Our Customer Says
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {testimonialData.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
                {/* Navigation */}
                <div className="mt-8 flex gap-4 items-center justify-center">
                    {/* Left Arrow */}
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-text-testimonial">
                        <svg  className="h-5 w-5 text-text-testimonial" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Progress Indicator */}
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((line) => (
                            <div
                                key={line}
                                className={`h-1 w-8 rounded ${
                                    line === 3
                                        ? 'bg-text-testimonial'
                                        : 'bg-text-testimonial opacity-30'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-text-testimonial">
                        <svg  className="h-5 w-5 text-white" fill="none"stroke="currentColor" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
