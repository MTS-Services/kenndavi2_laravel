
import OurSauces from '@/components/section/recipes/our-sauces';
import FrontendLayout from '@/layouts/frontend-layout';


const ingredients = [
    '1 kg chicken wings.',
    '½ cup Sweet BBQ Sauce',
    '1 tsp salt',
    '½ tsp black pepper',
    '1 tsp garlic powder',
];
const steps = [
    'Preheat grill to medium heat.',
    'Season chicken wings with salt, pepper, and garlic powder.',
    'Place wings on grill, cook 20–25 min, turning occasionally.',
    'Brush Sweet BBQ Sauce generously on wings, cook 5 more min.',
    'Serve hot with extra sauce on the side.',
];

export default function RecipeDetails() {
    return (
        <FrontendLayout>
            <div>
                <div className="">
                    <img
                        src="/assets/images/product/Rectangle 3292 (2).png"
                        alt="Hero Banner"
                        className="h-[430px] w-full object-cover sm:h-full"
                    />
                </div>
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div>
                        <h2 className="mb-4 font-bebas-neue text-4xl font-normal text-text-title sm:text-[56px]">
                            Grilled BBQ Chicken Wings
                        </h2>
                        <h4 className="font-bebas-neue text-lg font-normal text-text-title">
                            <span className="font-bebas-neue text-lg font-normal text-text-body">
                                Sauce Used:{' '}
                            </span>{' '}
                            Sweet BBQ Sauce
                        </h4>
                    </div>
                    <div>
                        <h2 className="font-aktiv-grotesk  text-2xl font-normal text-text-title mt-4">
                           Ingredients:
                        </h2>
                        <div className="mt-3 space-y-2 font-aktiv-grotesk text-base font-normal text-text-body">
                            {ingredients.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="font-aktiv-grotesk  text-2xl font-normal text-text-title mt-4">
                           Steps:
                        </h2>
                        <div className="mt-3 space-y-2 font-aktiv-grotesk text-base font-normal text-text-body">
                            {steps.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <span className="">
                                        {index + 1}.
                                    </span>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <OurSauces />
                </div>
            </div>
        </FrontendLayout>
    );
}
