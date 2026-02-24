export default function OurStory() {
    return (
        <div className="bg-bg-our-story py-12 sm:py-16 lg:py-20 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-[100px] lg:grid-cols-2 xl:gap-[120px]">
                    {/* Left Column */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6 flex items-center lg:justify-center">
                            <div className="mr-4 h-24 w-4 bg-gradient-to-b from-[#CC1610] to-[#E6F5F0]"></div>
                            <div>
                                <p className="text-black-200 text-sm font-normal">
                                    Our Story
                                </p>
                                <h2 className="font-bebas-neue text-3xl sm:text-4xl font-normal text-text-black">
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
                        <p className="mb-4 font-inter text-lg sm:text-xl lg:text-2xl font-normal text-text-black">
                            Just remember when you are enjoying every savory
                            taste of my bar-b-que sauce you are tasting…{' '}
                            <span className="text-lg sm:text-xl lg:text-2xl font-normal text-bg-button">
                                Legacy in Every Drop.
                            </span>
                        </p>
                        <div className="text-left lg:text-center">
                            <p className="font-bebas-neue text-2xl font-bold">
                                Kenneth Davis II
                            </p>
                            <p className="text-text-gray/40 font-inter text-sm font-normal">
                                Grandson/Son
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6 flex gap-4 lg:justify-center">
                            <img
                                src="/assets/images/home/Rectangle 4339.png"
                                alt="Family member 1"
                                className="w-1/2 max-w-[200px] lg:max-w-[250px]"
                            />
                            <img
                                src="/assets/images/home/Rectangle 4338.png"
                                alt="Family member 2"
                                className="w-1/2 max-w-[200px] lg:max-w-[250px]"
                            />
                        </div>
                        <p className="mb-8 font-inter text-base lg:text-lg text-xl text-text-black">
                            I have created a brand-new twist to a great family
                            bar-b-que sauce recipe.  The recipe was originally
                            made by my grandmother “Sylvia.”  She passed the
                            recipe down to my father “Kenneth Sr.”  My dad did
                            not know I was watching him and my grandmother the
                            whole time in the kitchen making it from scratch. I
                            thought of a great way to honor my family legacy by
                            adding my twist to the family recipe by creating
                            three new favors from my grandma’s original
                            recipe. So, I would like to introduce you to the
                            following three new flavors of Sweet, Honey,
                            Teriyaki.  Each bottle is a celebration of where we
                            come from…shared meals, laughter around the table,
                            and generations connecting through food.
                        </p>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            <div className="text-center">
                                <h3 className="font-bebas-neue text-4xl sm:text-5xl lg:text-6xl font-normal text-text-black">
                                    15K {'+'}
                                </h3>
                                <p className="font-inter text-lg sm:text-xl lg:text-2xl font-normal text-text-black">
                                    Satisfied Customer
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bebas-neue text-4xl sm:text-5xl lg:text-6xl font-normal text-text-black">
                                    10 YEARS {'+'}
                                </h3>
                                <p className="font-inter text-lg sm:text-xl lg:text-2xl font-normal text-text-black">
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