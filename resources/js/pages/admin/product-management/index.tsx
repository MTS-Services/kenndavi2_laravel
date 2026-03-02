import SaucesCardAdmin from '@/components/ui/sauces-card-admin';
import AdminLayout from '@/layouts/admin-layout';
import { Link } from '@inertiajs/react';

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
        <AdminLayout activeSlug={'product-management'}>
            <div className="flex items-center justify-between">
                <h2 className="font-poppins text-4xl font-medium text-text-title">
                    Manage your products
                </h2>
                <Link className="rounded-xl bg-bg-button px-6 py-4 font-inter text-xl font-medium text-text-white">
                    Add a new product
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {saucesData.map((sauce) => (
                    <SaucesCardAdmin key={sauce.id} sauce={sauce} />
                ))}
            </div>
            <div className="flex items-center justify-between py-4">
                <span className="font-poppins text-sm font-medium text-text-green">
                    Showing 1 to 10 of 50 results
                </span>

                <div className="flex gap-2">
                    <button className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green">
                        Previous
                    </button>

                    <button className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green">
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
