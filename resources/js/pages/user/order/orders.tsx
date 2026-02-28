import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { Link } from '@inertiajs/react';

export default function Orders() {
    // Sample data - you can replace this with props from your controller
    const orders = [
        {
            id: "ord-001",
            status: "Pending",
            productName: "Teriyanaki BBQ Sauces",
            description: "A rich blend of savory soy, subtle sweetness, and smoky BBQ flavor. Perfect for glazing, grilling, and adding a bold Asian twist to any dish.",
            price: 199,
            image: "/assets/images/user-dashboard/Rectangle 4342.png"
        },
        {
            id: "ord-002",
            status: "Pending",
            productName: "Spicy Honey Glaze",
            description: "Sweet heat meets savory goodness in this versatile glaze perfect for wings, ribs, and vegetables.",
            price: 199,
            image: "/assets/images/user-dashboard/Rectangle 4342 (1).png"
        },
        {
            id: "ord-003",
            status: "Pending",
            productName: "Spicy Honey Glaze",
            description: "Sweet heat meets savory goodness in this versatile glaze perfect for wings, ribs, and vegetables.",
            price: 199,
            image: "/assets/images/user-dashboard/Rectangle 4342 (2).png"
        },

    ];

    return (
        <UserDashboardLayout>
            <div className="w-full space-y-4">
                {orders.map((order) => (
                    <div 
                        key={order.id}
                        className="bg-order-card-bg px-5 py-2.5 rounded-xl"
                    >
                        {/* Mobile Layout - Vertical */}
                        <div className="flex flex-col gap-4 md:hidden">
                            {/* Product Image - Full Width */}
                            <div className="w-full">
                                <img
                                    src={order.image}
                                    alt="Product Image"
                                    className="w-full h-[200px] object-cover rounded-sm"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col gap-3">
                                {/* Order ID & Status */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-body">Order ID: #{order.id}</span>
                                    <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                                        {order.status}
                                    </span>
                                </div>

                                {/* Product Name */}
                                <h2 className="font-aktiv-grotesk text-xl font-bold text-text-title">
                                    {order.productName}
                                </h2>

                                {/* Product Description */}
                                <p className="font-aktiv-grotesk text-sm text-text-body leading-relaxed">
                                    {order.description}
                                </p>

                                {/* Price */}
                                <h6 className="font-aktiv-grotesk text-2xl font-bold text-text-title">
                                    ${order.price}
                                </h6>

                                {/* Cancel Order Button */}
                                <Link
                                    href="#"
                                    className="w-full bg-bg-button text-text-white font-bebas-neue font-normal text-xl py-3 px-4 rounded-sm text-center block"
                                >
                                    Cancel Order
                                </Link>
                            </div>
                        </div>

                        {/* Desktop Layout - Horizontal */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={order.image}
                                    alt="Product Image"
                                    className="w-[224px] h-[200px] object-cover rounded-sm"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col gap-2">
                                {/* Order ID & Status */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-body">Order ID: #{order.id}</span>
                                    <span className="text-sm font-medium">{order.status}</span>
                                </div>

                                {/* Product Name */}
                                <h2 className="font-aktiv-grotesk text-2xl font-normal text-text-title">
                                    {order.productName}
                                </h2>

                                {/* Product Description */}
                                <p className="font-aktiv-grotesk text-sm font-normal text-text-body">
                                    {order.description}
                                </p>

                                {/* Price */}
                                <h6 className="font-aktiv-grotesk text-2xl font-normal text-text-title">
                                    ${order.price}
                                </h6>

                                {/* Cancel Order Button */}
                                <Link
                                    href="#"
                                    className="w-fit bg-bg-button text-text-white font-bebas-neue font-normal text-xl py-2 px-4 rounded-sm inline-block"
                                >
                                    Cancel Order
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </UserDashboardLayout>
    );
}