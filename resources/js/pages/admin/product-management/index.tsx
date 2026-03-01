import SaucesCard from "@/components/ui/sauces-card";

const saucesData = [
    {
        id: '1',
        name: 'Savory Fusion. Smoky Twist.',
        description:
            'A delicious blend of classic teriyaki flavor and smoky BBQ richness. Sweet, savory, and perfect for marinades, stir-fry, and grilled dishes.',
        price: '$40.00',
        image: '/assets/images/home/19534e4b7e7bb9999e7570eceacd260d5cd8696d.png',
        category: 'Sweet',
        href: route('frontend.details'),
    },
    {
        id: '2',
        name: 'Honey BBQ Glaze',
        description:
            'Sweet honey combined with tangy BBQ flavors creates the perfect glaze for ribs, chicken, and pork. Great for grilling and baking.',
        price: '$35.00',
        image: '/assets/images/home/513f91e933b9cf0b47a9e4627c132b20f4bf15b6.jpg',
        category: 'Honey',
        href: route('frontend.details'),
    },
    {
        id: '3',
        name: 'Spicy Texas Heat',
        description:
            'Bold and spicy with authentic Texas flavors. Perfect for those who like their BBQ with a kick of heat and smoky goodness.',
        price: '$42.00',
        image: '/assets/images/home/fb87184304aaa733c0da92fab04e9ebd14294505.jpg',
        category: 'Spicy',
        href: route('frontend.details'),
    },
];

export default function Index() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {saucesData.map((sauce) => (
                <SaucesCard key={sauce.id} sauce={sauce} />
            ))}
        </div>
    );
}
