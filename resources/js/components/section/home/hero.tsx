import { BicepsFlexed, Clock, Star, Users, Utensils } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';

export default function Hero() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Static hero slides data
    const heroSlides = [
        {
            id: 1,
            title: "Welcome to Northside",
            description: "Whatever you're slapping on the grill make it better with northside legendary Texas flavor and love.",
            rating: "4.6 Rating from 500+ Clients",
            image: "/assets/images/home/banner.png"
        },
        {
            id: 2,
            title: "Premium Quality Products",
            description: "Experience the best flavors with our carefully selected ingredients and authentic recipes.",
            rating: "4.8 Rating from 1000+ Reviews",
            image: "/assets/images/home/banner2.png"
        },
        {
            id: 3,
            title: "Fast Delivery Service",
            description: "Get your favorite products delivered quickly to your doorstep with our reliable service.",
            rating: "4.7 Rating from 800+ Customers",
            image: "/assets/images/home/banner3.jpg"
        }
    ];
    return (
        <div>
            {/* Background Image */}
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
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                breakpoints={{
                    768: { slidesPerView: 1, spaceBetween: 30 },
                    1024: { slidesPerView: 1, spaceBetween: 30 },
                }}
            >
                {heroSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-[calc(100vh-118px)]">
                            <img
                                src={slide.image}
                                alt="Hero Banner"
                                className="h-full w-full object-cover"
                            />
                            {/* Bottom fade to white  */}
                            <div className="absolute right-0 bottom-0 left-0 h-4 bg-linear-to-t from-white to-transparent"></div>

                            {/* Text Overlay */}
                            <div className="absolute inset-0 top-1/2 flex -translate-y-1/2 items-center">
                                <div className="container px-4 text-text-white">
                                    <div className="">
                                        <div className="mb-16 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/51 px-3 py-1.5 backdrop-blur-xs">
                                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bebas-neue text-base font-normal text-text-buy-now uppercase">
                                                {slide.rating}
                                            </span>
                                        </div>
                                        <h1 className="mb-6 font-bebas-neue text-4xl leading-tight font-normal sm:text-6xl md:text-8xl lg:text-9xl">
                                            {slide.title}
                                        </h1>
                                        <p className="mb-4 max-w-xl font-inter text-lg leading-relaxed md:text-xl">
                                            {slide.description}
                                        </p>

                                        <div className="grid w-full grid-cols-2 gap-4 sm:max-w-2xl sm:grid-cols-4">
                                            <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-white/40 py-3 text-center backdrop-blur-xs sm:w-32">
                                                <Utensils className="h-9 w-9" />
                                                <p className="font-bebas-neue text-base font-normal text-text-white uppercase">
                                                    {' '}
                                                    Infinity <br />
                                                    Test
                                                </p>
                                            </div>
                                            <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-white/40 py-3 text-center backdrop-blur-xs sm:w-32">
                                                <Users className="h-9 w-9" />
                                                <p className="font-bebas-neue text-base font-normal text-text-white uppercase">
                                                    15k <br /> Clients
                                                </p>
                                            </div>
                                            <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-white/40 py-3 text-center backdrop-blur-xs sm:w-32">
                                                <Clock className="h-9 w-9" />
                                                <p className="font-bebas-neue text-base font-normal text-text-white uppercase">
                                                    24 HOURs <br /> open to order
                                                </p>
                                            </div>
                                            <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-white/40 py-3 text-center backdrop-blur-xs sm:w-32">
                                                <BicepsFlexed className="h-9 w-9" />
                                                <p className="font-bebas-neue text-base font-normal text-text-white uppercase">
                                                    10 years+ <br /> Experience
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Custom Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (swiperRef.current) {
                                swiperRef.current.slideTo(index);
                            }
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            activeIndex === index 
                                ? 'bg-white' 
                                : 'bg-black/50 hover:bg-black/70'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

