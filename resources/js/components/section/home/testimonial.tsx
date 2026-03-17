import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import TestimonialCard from '@/components/ui/testimonial-card';
import 'swiper/css';

export default function Testimonial({ feedbacks }: { feedbacks?: any }) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = feedbacks?.length || 0;
    
    return (
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
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        breakpoints={{
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        className="swiper-equal-height"
                    >
                        {feedbacks?.map((feedback: any) => (
                            <SwiperSlide key={feedback.id}>
                                <TestimonialCard testimonial={feedback} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Custom Navigation */}
                <div className="mt-8 flex items-center justify-center gap-4">
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
                                onClick={() => swiperRef.current?.slideToLoop(i)}
                                className={`h-1 w-8 rounded bg-text-testimonial transition-all duration-300 cursor-pointer ${
                                    i === activeIndex % 3 ? 'opacity-100' : 'opacity-30'
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
    );
}
