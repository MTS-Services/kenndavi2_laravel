export default function Hero() {
    return (
        <div className="relative">
            {/* Background Image */}
            <div className="relative">
                <img
                    src="/assets/images/home/banner.png"
                    alt="Hero Banner"
                    className="h-[430px] sm:h-full w-full object-cover"
                />

                {/* Bottom fade to white  */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="container px-4 text-text-white pb-8">
                        <h1 className="mb-6 font-bebas-neue text-3xl sm:text-5xl font-normal md:text-9xl">
                            Welcome to Northside
                        </h1>
                        <p className="max-w-3xl font-inter text-lg md:text-xl">
                            Whatever you're slapping on the grill make it better
                            with northside legendary Texas flavor and love.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}