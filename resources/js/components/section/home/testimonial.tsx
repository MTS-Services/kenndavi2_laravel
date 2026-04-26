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
    const maxSlidesPerView = totalSlides >= 3 ? 3 : totalSlides >= 2 ? 2 : 1;
    const shouldLoop = totalSlides > maxSlidesPerView;

    // Dot count: actual slides, max 3
    const dotCount = Math.min(3, totalSlides);

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
                        autoplay={
                            shouldLoop
                                ? {
                                      delay: 5000,
                                      disableOnInteraction: false,
                                      pauseOnMouseEnter: true,
                                  }
                                : false
                        }
                        loop={shouldLoop}
                        loopAdditionalSlides={shouldLoop ? maxSlidesPerView : 0}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.realIndex)
                        }
                        breakpoints={{
                            768: {
                                slidesPerView: Math.min(2, totalSlides),
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: maxSlidesPerView,
                                spaceBetween: 30,
                            },
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

                {/* Custom Navigation — শুধু একাধিক slide থাকলে দেখাবে */}
                {totalSlides > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-4">
                        {/* Left Arrow */}
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-text-testimonial transition-colors duration-200 hover:bg-text-testimonial"
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

                        {/* Progress Dots */}
                        <div className="flex space-x-2">
                            {Array.from({ length: dotCount }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        if (shouldLoop) {
                                            swiperRef.current?.slideToLoop(i);
                                        } else {
                                            swiperRef.current?.slideTo(i);
                                        }
                                    }}
                                    className={`h-1 w-8 cursor-pointer rounded bg-text-testimonial transition-all duration-300 ${
                                        i === activeIndex % dotCount
                                            ? 'opacity-100'
                                            : 'opacity-30'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-text-testimonial transition-colors duration-200 hover:bg-text-testimonial"
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
                )}
            </div>
        </div>
    );
}