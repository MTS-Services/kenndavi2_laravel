import UserDashboardLayout from "@/layouts/user-dashboard-layout";
import { Link } from '@inertiajs/react';

export default function ProductToReview(){
    // Sample data - you can replace this with props from your controller
    const products = [
        {
            id: 1,
            name: "Teriyanaki BBQ Sauces",
            description: "A rich blend of savory soy, subtle sweetness, and smoky BBQ flavor. Perfect for glazing, grilling, and adding a bold Asian twist to any dish.",
            originalPrice: 299,
            discountedPrice: 199,
            image: "/assets/images/user-dashboard/Rectangle 4342.png",
            shippingStatus: "Delivery"
        },
        {
            id: 2,
            name: "Spicy Honey Glaze",
            description: "Sweet heat meets savory goodness in this versatile glaze perfect for wings, ribs, and vegetables.",
            originalPrice: 249,
            discountedPrice: 149,
            image: "/assets/images/user-dashboard/Rectangle 4342 (1).png",
            shippingStatus: "Delivery"
        },
        {
            id: 3,
            name: "Garlic Butter Sauce",
            description: "Creamy garlic butter sauce with herbs, perfect for pasta, seafood, and bread dipping.",
            originalPrice: 189,
            discountedPrice: 99,
            image: "/assets/images/user-dashboard/Rectangle 4342 (2).png",
            shippingStatus: "Delivery"
        }
    ];

    return (
        <UserDashboardLayout>
            <div className="w-full sm:border border-order-card-bg">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <table className="w-full">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-order-card-bg">
                                <th className="px-6 py-2.5 text-left">
                                    <h3 className="font-medium font-public-sans text-text-title text-xs uppercase">Products</h3>
                                </th>
                                <th className="px-6 py-2.5 text-left">
                                    <h3 className="font-medium font-public-sans text-text-title text-xs uppercase">Price</h3>
                                </th>
                                <th className="px-6 py-2.5 text-left">
                                    <h3 className="font-medium font-public-sans text-text-title text-xs uppercase">Shipping Status</h3>
                                </th>
                                <th className="px-6 py-2.5 text-center">
                                    <h3 className="font-medium font-public-sans text-text-title text-xs uppercase">Action</h3>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className={index !== products.length - 1 ? "" : ""}>
                                    {/* Product Info */}
                                    <td className="px-6 py-6 w-1/2">
                                        <div className="flex gap-4">
                                            <div className="shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-20 h-20 object-cover rounded-sm"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-normal font-aktiv-grotesk text-text-title mb-1">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-text-body font-aktiv-grotesk font-normal line-clamp-2">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-6">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-sm font-normal font-public-sans text-text-body line-through">
                                                ${product.originalPrice}
                                            </span>
                                            <span className="text-sm font-medium font-public-sans text-text-title">
                                                ${product.discountedPrice}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Shipping Status */}
                                    <td className="px-6 py-6">
                                        <span className="font-public-sans text-sm font-medium text-text-green">
                                            {product.shippingStatus}
                                        </span>
                                    </td>

                                    {/* Action Button */}
                                    <td className="px-6 py-6">
                                        <Link
                                            href="#"
                                            className="inline-flex items-center justify-center px-6 py-4 bg-text-buy-now text-text-white font-bold text-sm font-public-sans uppercase"
                                        >
                                            Write a review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                    {products.map((product) => (
                        <div key={product.id} className="mb-6 border-b-2 border-order-card-bg">
                            {/* Product Image & Info */}
                            <div className="flex gap-4 mb-2">
                                <div className="shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-base font-semibold text-text-title mb-2">
                                        {product.name}
                                    </h4>
                                    <p className="text-sm text-text-body mb-3">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-gray-400 line-through text-sm">
                                            ${product.originalPrice}
                                        </span>
                                        <span className="text-lg font-bold text-text-title">
                                            ${product.discountedPrice}
                                        </span>
                                    </div>
                                    <Link
                                        href="#"
                                        className="inline-block bg-bg-button uppercase font-public-sans text-text-white px-4 py-2 text-xs font-normal"
                                    >
                                        Write a review
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="text-center py-8 text-text-body">
                        No products to review found.
                    </div>
                )}
            </div>
        </UserDashboardLayout>
    )
}