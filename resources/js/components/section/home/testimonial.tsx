import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import TestimonialCard from '@/components/ui/testimonial-card';
import 'swiper/css';
import 'swiper/css/pagination';

// Custom styles for Swiper navigation
const testimonialData = [
    {
        id: 1,
        review: "This is hands down the best BBQ sauce I've ever tried. The perfect balance of sweet and smoky flavor makes every grilled dish taste amazing. Highly recommended!",
        reviewerName: 'Rahim A.',
        reviewerTitle: 'Honda Rider',
        image: '/assets/images/home/Ellipse 1.png',
    },
    {
        id: 2,
        review: 'The Honey BBQ sauce is incredibly smooth and rich. It gives my chicken wings a beautiful glaze and an unforgettable taste. My family loves it!',
        reviewerName: 'Karim B.',
        reviewerTitle: 'Honda Rider',
        image: '/assets/images/home/Ellipse 1.png',
    },
    {
        id: 3,
        review: 'The Teriyaki BBQ sauce adds a bold, savory twist to my grilled dishes. It is now a must-have in my kitchen for marinades and stir-fries.',
        reviewerName: 'Jamal C.',
        reviewerTitle: 'Honda Rider',
        image: '/assets/images/home/Ellipse 1.png',
    },
    {
        id: 4,
        review: 'Absolutely love the Spicy BBQ sauce! It has the perfect kick without being overpowering. Great for ribs and brisket.',
        reviewerName: 'Ahmed D.',
        reviewerTitle: 'Food Blogger',
        image: '/assets/images/home/Ellipse 2.png',
    },
    {
        id: 5,
        review: 'The Original BBQ sauce brings back childhood memories. Authentic flavor that pairs perfectly with everything.',
        reviewerName: 'Sami E.',
        reviewerTitle: 'Chef',
        image: '/assets/images/home/Ellipse 3.png',
    },
    {
        id: 6,
        review: 'The Original BBQ sauce brings back childhood memories. Authentic flavor that pairs perfectly with everything.',
        reviewerName: 'Omar F.',
        reviewerTitle: 'Chef',
        image: '/assets/images/home/Ellipse 3.png',
    },
    {
        id: 7,
        review: 'The Original BBQ sauce brings back childhood memories. Authentic flavor that pairs perfectly with everything.',
        reviewerName: 'Yusuf G.',
        reviewerTitle: 'Chef',
        image: '/assets/images/home/Ellipse 3.png',
    },
    {
        id: 8,
        review: 'The Original BBQ sauce brings back childhood memories. Authentic flavor that pairs perfectly with everything.',
        reviewerName: 'Hassan H.',
        reviewerTitle: 'Chef',
        image: '/assets/images/home/Ellipse 3.png',
    },
];

export default function Testimonial() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = testimonialData.length;
    return (
        <>
            <div className="my-12 sm:my-28">
                <div className="container mx-auto px-4">
                    <p className="font-imter text-center text-base font-medium tracking-[15px] text-text-testimonial">
                        Testimonial
                    </p>
                    <h2 className="text-text-main-title text-center font-bebas-neue text-3xl font-normal sm:text-[56px]">
                        What Our Customer Says
                    </h2>

                    <div className="mt-12">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            loop={true}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={(swiper) =>
                                setActiveIndex(swiper.realIndex)
                            }
                            breakpoints={{
                                768: { slidesPerView: 2, spaceBetween: 30 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                        >
                            {testimonialData.map((testimonial) => (
                                <SwiperSlide key={testimonial.id}>
                                    <TestimonialCard
                                        testimonial={testimonial}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Custom Navigation */}
                    <div className="mt-8 flex items-center justify-center gap-4 ">
                        {/* Left Arrow */}
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-text-testimonial transition-colors duration-200 hover:bg-text-testimonial cursor-pointer"
                        >
                            <svg
                                className="h-5 w-5 text-text-testimonial transition-colors duration-200 group-hover:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Progress Indicator */}
                        <div className="flex space-x-2">
                            {Array.from({ length: Math.min(3, totalSlides) }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() =>
                                        swiperRef.current?.slideToLoop(i)
                                    }
                                    className={`h-1 w-8 rounded bg-text-testimonial transition-all duration-300 cursor-pointer ${
                                        i === activeIndex % 3
                                            ? 'opacity-100'
                                            : 'opacity-30'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-text-testimonial transition-colors duration-200 hover:bg-text-testimonial cursor-pointer"
                        >
                            <svg
                                className="h-5 w-5 text-text-testimonial transition-colors duration-200 group-hover:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
