export default function Hero() {
    return (
        <div className="relative h-[calc(100vh-118px)]">
            <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
            >
                <source src="/video/hero-section-video.mp4" type="video/mp4" />
            </video>
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
                        No matter what's on your grill, make it unforgettable with The Taste of Tha Northside legendary St. Louis flavor Bar-B-Que sauce.
                    </p>
                </div>
            </div>
        </div>
    );
}

