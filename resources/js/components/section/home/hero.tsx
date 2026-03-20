import { BicepsFlexed, Clock, Users, Utensils } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative h-[calc(100vh-118px)]">
            <img
                src="/assets/images/home/banner.jpg"
                alt="Hero Banner"
                className="h-full w-full object-cover"
            />
            {/* Black overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Bottom fade to white  */}
            <div className="absolute right-0 bottom-0 left-0 h-4 bg-linear-to-t from-white to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 top-1/2 flex -translate-y-1/2 items-center">
                <div className="container px-4 text-text-white">
                    <h1 className="mb-4 sm:mb-6 font-bebas-neue text-4xl leading-tight font-normal sm:text-6xl md:text-8xl lg:text-9xl">
                        Welcome to Northside
                    </h1>
                    <p className="mb-4 max-w-xl font-inter text-lg leading-relaxed md:text-xl">
                        Whatever you're slapping on the grill make it better with northside legendary Texas flavor and love.
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
    );
}

