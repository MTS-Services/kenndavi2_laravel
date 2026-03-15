import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { Link, usePage } from '@inertiajs/react';

interface Product {
    id: string;
    product_name: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    image: string;
    shippingStatus: string;
    order_id: string;
    product_id: string;
}

export default function ProductToReview() {
    const { orders, feedbacks } = usePage().props as any;

    // Check if a product has already been reviewed
    const hasFeedback = (productId: string, orderId: string) => {
        return feedbacks?.some(
            (f: any) => f.product_id == productId && f.order_id == orderId,
        );
    };

    // Transform orders to get all individual order items
    const products: Product[] = [];
    orders?.forEach((order: any) => {
        order.order_items?.forEach((item: any) => {
            // Get product image with proper path
            let imagePath = '/assets/images/products/placeholder.png';
            if (item.product?.images && item.product.images.length > 0) {
                const primaryImage = item.product.images.find(
                    (img: any) => img.is_primary,
                );
                const image = primaryImage || item.product.images[0];
                imagePath = image.image.startsWith('/')
                    ? image.image
                    : `/storage/${image.image}`;
            }

            products.push({
                id: item.id,
                product_name:
                    item.product_name ||
                    item.product?.title ||
                    'Unknown Product',
                description:
                    item.product?.description || 'No description available',
                originalPrice: item.product?.price || 0,
                discountedPrice: item.price || 0,
                image: imagePath,
                shippingStatus: 'Delivered',
                order_id: order.id,
                product_id: item.product_id,
            });
        });
    });

    console.log('Transformed products:', products);

    return (
        <UserDashboardLayout>
            <div className="w-full border-order-card-bg sm:border">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <table className="w-full">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-order-card-bg">
                                <th className="px-6 py-2.5 text-left">
                                    <h3 className="font-public-sans text-xs font-medium text-text-title uppercase">
                                        Products
                                    </h3>
                                </th>
                                <th className="px-6 py-2.5 text-left">
                                    <h3 className="font-public-sans text-xs font-medium text-text-title uppercase">
                                        Price
                                    </h3>
                                </th>
                                <th className="px-6 py-2.5 text-left">
                                    <h3 className="font-public-sans text-xs font-medium text-text-title uppercase">
                                        Shipping Status
                                    </h3>
                                </th>
                                <th className="px-6 py-2.5 text-center">
                                    <h3 className="font-public-sans text-xs font-medium text-text-title uppercase">
                                        Action
                                    </h3>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {products.map((product: any, index: number) => (
                                <tr
                                    key={product.id}
                                    className={
                                        index !== products.length - 1 ? '' : ''
                                    }
                                >
                                    {/* Product Info */}
                                    <td className="w-1/2 px-3 py-3">
                                        <div className="flex gap-4">
                                            <div className="shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.product_name}
                                                    className="h-20 w-20 rounded-sm object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="mb-1 font-aktiv-grotesk text-xl font-normal text-text-title">
                                                    {product.product_name}
                                                </h4>
                                                <p className="line-clamp-2 font-aktiv-grotesk text-sm font-normal text-text-body">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2">
                                            {/* <span className="text-sm font-normal font-public-sans text-text-body line-through">
                                                ${product.originalPrice}
                                            </span> */}
                                            <span className="font-public-sans text-sm font-medium text-text-title">
                                                ${product.discountedPrice}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Shipping Status */}
                                    <td className="px-3 py-3 text-center">
                                        <span className="font-public-sans text-sm font-medium text-text-green">
                                            {product.shippingStatus}
                                        </span>
                                    </td>

                                    {/* Action Button */}
                                    <td className="px-3 py-3 text-center">
                                        {hasFeedback(
                                            product.product_id,
                                            product.order_id,
                                        ) ? (
                                            <a target="_blank"
                                                href={route('frontend.product-details', product.id)}
                                                className="inline-flex items-center justify-center bg-text-green w-full py-2 text-sm font-bold text-text-white uppercase xl:py-4"
                                            >
                                                Details
                                            </a>
                                        ) : (
                                            <Link
                                                href={route('user.fd.create', {
                                                    id: product.id,
                                                })}
                                                className="inline-flex items-center justify-center bg-text-buy-now w-full py-2 text-sm font-bold text-text-white uppercase xl:py-4"
                                            >
                                                Write a review
                                            </Link>
                                        )}
                                    </td>

                                    {/* <td className="px-3 py-3">
                                        <Link
                                            href={route('user.fd.create', {
                                                id: product.id,
                                            })}
                                            className="inline-flex items-center justify-center bg-text-buy-now px-3 py-2 font-public-sans text-sm font-bold text-text-white uppercase xl:py-4"
                                        >
                                            Write a review
                                        </Link>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 p-4 lg:hidden">
                    {products.map((product: any) => (
                        <div
                            key={product.id}
                            className="mb-6 border-b-2 border-order-card-bg"
                        >
                            {/* Product Image & Info */}
                            <div className="mb-2 flex gap-4">
                                <div className="shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.product_name}
                                        className="h-20 w-20 rounded-sm object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-2 text-base font-semibold text-text-title">
                                        {product.product_name}
                                    </h4>
                                    <p className="mb-3 text-sm text-text-body">
                                        {product.description}
                                    </p>
                                    <div className="mb-4 flex items-center gap-2">
                                        {/* <span className="text-gray-400 line-through text-sm">
                                            ${product.originalPrice}
                                        </span> */}
                                        <span className="text-lg font-bold text-text-title">
                                            ${product.discountedPrice}
                                        </span>
                                    </div>
                                    <Link
                                        href="#"
                                        className="inline-block bg-bg-button px-4 py-2 font-public-sans text-xs font-normal text-text-white uppercase"
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
                    <div className="py-8 text-center text-text-body">
                        No products to review found.
                    </div>
                )}
            </div>
        </UserDashboardLayout>
    );
}
