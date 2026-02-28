import RecipesCard from '@/components/ui/recipes-card';
import FrontendLayout from '@/layouts/frontend-layout';


const RecipeData = [
    {
        id: '1',
        title: 'Savory Fusion. Smoky Twist.',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/Rectangle 2393.png',
    },
    {
        id: '2',
        title: 'Smoky Sweet BBQ Chicken Sandwich',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/7a40b080b42ed3257b1f3deaa67e4b37242e5a78.jpg',
    },
    {
        id: '3',
        title: 'Sweet & Smoky Teriyaki Salmon',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/Rectangle 2393 (1).png',
    },
    {
        id: '4',
        title: 'Teriyaki BBQ Glazed Drumsticks',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/Rectangle 2393 (2).png',
    },
    {
        id: '5',
        title: 'Sweet BBQ Pulled Chicken Sliders',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/980ed0898dad79b94cf500512533d3b3b39003cf.jpg',
    },
    {
        id: '6',
        title: 'Honey BBQ Meatballs',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/8bd07c5f6cdc177459fe53330c7e8b26696b835f.jpg',
    },
    {
        id: '4',
        title: 'Teriyaki BBQ Glazed Drumsticks',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/Rectangle 2393 (2).png',
    },
    {
        id: '5',
        title: 'Sweet BBQ Pulled Chicken Sliders',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/980ed0898dad79b94cf500512533d3b3b39003cf.jpg',
    },
    {
        id: '6',
        title: 'Honey BBQ Meatballs',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/8bd07c5f6cdc177459fe53330c7e8b26696b835f.jpg',
    },
    {
        id: '4',
        title: 'Teriyaki BBQ Glazed Drumsticks',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/Rectangle 2393 (2).png',
    },
    {
        id: '5',
        title: 'Sweet BBQ Pulled Chicken Sliders',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/980ed0898dad79b94cf500512533d3b3b39003cf.jpg',
    },
    {
        id: '6',
        title: 'Honey BBQ Meatballs',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/8bd07c5f6cdc177459fe53330c7e8b26696b835f.jpg',
    },
    {
        id: '4',
        title: 'Teriyaki BBQ Glazed Drumsticks',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/Rectangle 2393 (2).png',
    },
    {
        id: '5',
        title: 'Sweet BBQ Pulled Chicken Sliders',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/980ed0898dad79b94cf500512533d3b3b39003cf.jpg',
    },
    {
        id: '6',
        title: 'Honey BBQ Meatballs',
        description: 'Prep time 4 min | Cook 4h',
        image: '/assets/images/home/8bd07c5f6cdc177459fe53330c7e8b26696b835f.jpg',
    },
];

export default function SauceRecipes() {
    return (
        <FrontendLayout>
            <div className="mt-12 sm:mt-28">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-text-main-title text-center font-bebas-neue text-4xl font-normal sm:text-[56px] mb-8">
                           The Ultimate BBQ Sauce Recipes
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {RecipeData.map((recipe) => (
                            <RecipesCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
