export default function OurStory() {
    return (
        <div className="bg-bg-button py-12 sm:py-16 lg:py-20 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-[100px] lg:grid-cols-2 xl:gap-[120px]">
                    {/* Left Column */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6 flex items-center lg:justify-center">
                            <div className="mr-4 h-24 w-4 bg-gradient-to-b from-[#CC1610] to-[#E6F5F0]"></div>
                            <div>
                                <p className="text-text-white text-sm font-normal mb-4">
                                    Our Story
                                </p>
                                <h2 className="font-bebas-neue text-3xl sm:text-4xl font-normal text-text-white">
                                    GREETINGS FAMILY,
                                    <br />
                                    THE TASTE OF THA NORTHSIDE
                                </h2>
                            </div>
                        </div>
                        <img
                            src="/assets/images/home/Rectangle 4336.png"
                            alt="Grandmother preparing food"
                            className="mb-6 w-full max-w-md lg:max-w-lg"
                        />
                        <p className="mb-4 font-aktiv-grotesk text-lg sm:text-xl lg:text-2xl font-normal text-text-white">
                            Just remember when you are enjoying every savory
                            taste of my bar-b-que sauce you are tasting…{' '}
                            <span className="text-lg sm:text-xl lg:text-2xl font-normal text-text-white">
                                Legacy in Every Drop.
                            </span>
                        </p>
                        <div className="text-left lg:text-center">
                            <p className="font-aguafina-script text-2xl font-bold text-text-white">
                                Kenneth Davis II
                            </p>
                            <p className="text-text-gray/40 font-inter text-sm font-normal text-text-white">
                                Grandson/Son
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6 flex flex-col sm:flex-row gap-4 lg:justify-center">
                            <img
                                src="/assets/images/home/Rectangle 4339.png"
                                alt="Family member 1"
                                className="w-full sm:w-1/2 max-w-full"
                            />
                            <img
                                src="/assets/images/home/Rectangle 4338.png"
                                alt="Family member 2"
                                className="w-full sm:w-1/2 max-w-full"
                            />
                        </div>
                        <p className="mb-8 font-aktiv-grotesk text-base lg:text-lg text-text-white">
                            Aces In DA Hole was created to celebrate a brotherhood built over 30+ years, not by blood, but by loyalty. Through every setback, hardship, and triumph, we've stood together, uplifted each other, and grown stronger as one. Our brand reflects that same standard, crafted to stand the test of time, just like real brotherhood does. Aces In DA Hole - "Built on Loyalty Designed to Last".
                        </p>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            <div className="text-center">
                                <h3 className="font-bebas-neue text-4xl sm:text-5xl lg:text-6xl font-normal text-text-white">
                                    15K {'+'}
                                </h3>
                                <p className="font-aktiv-grotesk text-lg sm:text-xl lg:text-2xl font-normal text-text-white">
                                    Satisfied Customer
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bebas-neue text-4xl sm:text-5xl lg:text-6xl font-normal text-text-white">
                                    30 YEARS {'+'}
                                </h3>
                                <p className="font-aktiv-grotesk text-lg sm:text-xl lg:text-2xl font-normal text-text-white">
                                    Experience
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}