import { Head, Link } from '@inertiajs/react';
import { Calendar, CheckCircle2, CreditCard, MapPin, ReceiptText } from 'lucide-react';

import FrontendLayout from '@/layouts/frontend-layout';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
    product?: {
        images?: Array<{
            image: string;
        }>;
    };
}

interface OrderAddress {
    full_name: string;
    email: string;
    phone: string;
    address_line1: string;
    address_line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

interface OrderSummary {
    order_number: string;
    subtotal: number;
    shipping_cost: number;
    total: number;
    created_at: string;
    order_status: string;
    payment_status: string;
}

interface SuccessPageProps {
    order: OrderSummary;
    orderItems: OrderItem[];
    orderAddress?: OrderAddress | null;
    paymentMethod?: string | null;
}

const imageOf = (item: OrderItem) => {
    const path = item.product?.images?.[0]?.image;
    return path ? `/storage/${path}` : '/assets/images/product/Rectangle 20.png';
};

export default function OrderSuccessPage({
    order,
    orderItems,
    orderAddress,
    paymentMethod,
}: SuccessPageProps) {
    return (
        <FrontendLayout>
            <Head title="Order Success" />

            <div className="container mx-auto mb-12 px-4 py-10 sm:mb-28 lg:py-16">
                <div className="mx-auto max-w-5xl space-y-6">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                        <div className="mb-3 flex justify-center">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <h1 className="mb-1 font-public-sans text-3xl font-semibold text-text-title">
                            Payment Successful
                        </h1>
                        <p className="font-public-sans text-sm text-text-body">
                            Order <span className="font-semibold">{order.order_number}</span> has been confirmed.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
                        <div className="space-y-6">
                            <div className="rounded-xl border border-text-gray-300 p-5">
                                <h2 className="mb-3 flex items-center gap-2 font-public-sans text-lg font-semibold text-text-title">
                                    <ReceiptText className="h-5 w-5" />
                                    Order Details
                                </h2>
                                <div className="grid gap-2 text-sm text-text-body sm:grid-cols-2">
                                    <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        {paymentMethod || 'N/A'}
                                    </p>
                                    <p>Status: {order.order_status}</p>
                                    <p>Payment: {order.payment_status}</p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-text-gray-300 p-5">
                                <h2 className="mb-3 flex items-center gap-2 font-public-sans text-lg font-semibold text-text-title">
                                    <MapPin className="h-5 w-5" />
                                    Delivery Address
                                </h2>
                                {orderAddress ? (
                                    <div className="space-y-1 text-sm text-text-body">
                                        <p className="font-semibold text-text-title">{orderAddress.full_name}</p>
                                        <p>{orderAddress.email}</p>
                                        <p>{orderAddress.phone}</p>
                                        <p>
                                            {orderAddress.address_line1}
                                            {orderAddress.address_line2 ? `, ${orderAddress.address_line2}` : ''}
                                        </p>
                                        <p>
                                            {orderAddress.city}, {orderAddress.state} {orderAddress.postal_code},{' '}
                                            {orderAddress.country}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-text-body">Address information unavailable.</p>
                                )}
                            </div>

                            <div className="rounded-xl border border-text-gray-300 p-5">
                                <h2 className="mb-4 font-public-sans text-lg font-semibold text-text-title">
                                    Items
                                </h2>
                                <div className="space-y-4">
                                    {orderItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <img
                                                src={imageOf(item)}
                                                alt={item.product_name}
                                                className="h-14 w-14 rounded border border-text-gray-300 object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="font-public-sans text-sm font-medium text-text-title">
                                                    {item.product_name}
                                                </p>
                                                <p className="text-xs text-text-body">
                                                    {item.quantity} x ${Number(item.price).toFixed(2)}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold text-text-title">
                                                ${Number(item.total).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="rounded-xl border border-text-gray-300 p-5">
                                <h2 className="mb-4 font-public-sans text-lg font-semibold text-text-title">
                                    Summary
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-body">Sub-total</span>
                                        <span className="text-text-title">
                                            ${Number(order.subtotal).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-body">Shipping</span>
                                        <span className="text-text-title">
                                            ${Number(order.shipping_cost).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="my-2 border-b border-text-gray-300" />
                                    <div className="flex justify-between text-base font-semibold">
                                        <span className="text-text-title">Total</span>
                                        <span className="text-text-title">
                                            ${Number(order.total).toFixed(2)} USD
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Link
                                        href={route('user.orders')}
                                        className="block w-full bg-text-buy-now px-4 py-3 text-center font-bebas-neue text-xl uppercase text-white"
                                    >
                                        View Orders
                                    </Link>
                                    <Link
                                        href={route('frontend.home')}
                                        className="block w-full border border-text-gray-300 px-4 py-3 text-center font-public-sans text-sm text-text-title"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}

