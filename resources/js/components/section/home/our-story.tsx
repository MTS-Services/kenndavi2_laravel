export default function OurStory() {
    return (
        <div className="bg-bg-our-story py-20 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-[100px] lg:grid-cols-2">
                    {/* Left Column */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 h-24 w-4 bg-gradient-to-b from-[#CC1610] to-[#E6F5F0]"></div>
                            <div>
                                <p className="text-black-200 text-sm font-normal">
                                    Our Story
                                </p>
                                <h2 className="font-bebas-neue text-4xl font-normal text-text-black">
                                    GREETINGS FAMILY,
                                    <br />
                                    THE TASTE OF THA NORTHSIDE
                                </h2>
                            </div>
                        </div>
                        <img
                            src="/assets/images/home/Rectangle 4336.png"
                            alt="Grandmother preparing food"
                            className="g mb-6 w-full"
                        />
                        <p className="mb-4 font-inter text-2xl font-normal text-text-black">
                            Just remember when you are enjoying every savory
                            taste of my bar-b-que sauce you are tasting…{' '}
                            <span className="text-2xl font-normal text-bg-button">
                                Legacy in Every Drop.
                            </span>
                        </p>
                        <div className="text-left">
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
                        <div className="mb-6 flex gap-4">
                            <img
                                src="/assets/images/home/Rectangle 4339.png"
                                alt="Family member 1"
                                className=""
                            />
                            <img
                                src="/assets/images/home/Rectangle 4338.png"
                                alt="Family member 2"
                                className=""
                            />
                        </div>
                        <p className="mb-8 font-inter text-base text-xl text-text-black">
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
                        <div className="grid grid-cols-2 gap-8">
                            <div className="text-center">
                                <h3 className="font-bebas-neue text-6xl font-normal text-text-black">
                                    15K +
                                </h3>
                                <p className="font-inter text-2xl font-normal text-text-black">
                                    Satisfied Customer
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bebas-neue text-6xl font-normal text-text-black">
                                    10 YEARS +
                                </h3>
                                <p className="font-inter text-2xl font-normal text-text-black">
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