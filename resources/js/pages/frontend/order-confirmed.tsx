import FrontendLayout from '@/layouts/frontend-layout';
import { Calendar, CheckCircle, Clock, Mail, MapPin } from 'lucide-react';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
     product: {
        images: Array<{
            image: string;
            is_primary: boolean;
        }>;
    };
}



interface OrderAddress {
    full_name: string;
    phone: string;
    email: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

interface Order {
    id: number;
    order_number: string;
    user_id: number;
    subtotal: number;
    shipping_cost: number;
    tax: number;
    total: number;
    discount: number;
    currency: string;
    order_status: string;
    payment_status: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    order_address: OrderAddress;
    order_items: OrderItem[];
    payment: Payment | null;
}

interface Payment {
    id: number;
    order_id: number;
    user_id: number;
    payment_method: string;
    transaction_id: string | null;
    amount: number;
    currency: string;
    status: string;
    paid_at: string | null;
    created_at: string;
    updated_at: string;
}

interface PaymentMethodOption {
    value: string;
    label: string;
}

const primaryImage = (items: OrderItem[]) => {
    const cartProducts = (items || []).map((item: any) => {
        const imagePath = item.product?.images?.[0]?.image;
        const fullImagePath = imagePath ? `/storage/${imagePath}` : '/assets/images/product/Rectangle 20.png';
        return fullImagePath;
    });
    return cartProducts;
};

const getPaymentMethodLabel = (paymentMethodValue: string, paymentMethods: PaymentMethodOption[]): string => {
    const method = paymentMethods.find(m => m.value === paymentMethodValue);
    return method?.label || 'N/A';
};

export default function OrderConfirmed({ order, paymentMethod }: { order?: Order; paymentMethod?: PaymentMethodOption[] }) {

    return (
        <FrontendLayout>
            <div className="mb-12 sm:mb-28">
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    {!order ? (
                        <div className="text-center">
                            <h1 className="mb-4 font-montserrat text-3xl font-medium text-text-title">
                                Order Not Found
                            </h1>
                            <p className="font-roboto text-lg text-text-black-50">
                                Unable to find your order information.
                            </p>
                        </div>
                    ) : (
                        <div className="">
                            {/* Success Icon & Header */}
                            <div className="mb-10 text-center">
                                <div className="relative mb-6 inline-flex items-center justify-center">
                                    <div className="absolute h-20 w-20 animate-ping rounded-full bg-primary/10 opacity-30" />
                                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                                        <CheckCircle className="h-10 w-10 text-primary" strokeWidth={2} />
                                    </div>
                                </div>
                                <h1 className="mb-2 font-montserrat text-[56px] font-medium text-text-title sm:text-4xl">
                                    Order Confirmed!
                                </h1>
                                <p className="font-roboto text-2xl font-normal text-text-black-50">
                                    Thank you for your purchase
                                </p>
                            </div>

                            {/* Main Content */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                                {/* Left Column */}
                                <div className="space-y-6 lg:col-span-3">

                                    {/* Order Number Card */}
                                    <div className="bg-bg-order-card rounded-xl border border-border p-5">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <h2 className="font-public-sans text-2xl font-medium text-text-title">
                                                    Order Number: {order.order_number}
                                                </h2>
                                                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1.5 font-inter text-base font-normal text-text-black-50">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-inter text-base font-normal text-text-black-50">
                                                        <Mail className="h-4 w-4" />
                                                        {order.order_address?.email || 'No email provided'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipment Card */}
                                    <div className="rounded-xl border border-border bg-bg-order-card p-5">
                                        <h2 className="font-poppins text-2xl font-medium text-text-title mb-3">
                                            Shipped to Your Address
                                        </h2>
                                        <p className="font-inter text-base font-normal text-text-black-50 mb-5">
                                            {order.order_items?.length ?? 0} items in this shipment
                                        </p>

                                        <div className="space-y-5 rounded-xl">
                                            <div className="flex items-start gap-3 bg-bg-white p-4 rounded-md">
                                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full mb-5">
                                                    <MapPin className="h-5 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-base font-normal font-poppins text-text-title">
                                                        Delivery Address
                                                    </p>
                                                    <p className="mt-2 font-inter text-base font-normal text-text-black-50">
                                                        {order.order_address
                                                            ? `${order.order_address.address_line1}, ${order.order_address.city}, ${order.order_address.state} ${order.order_address.postal_code}, ${order.order_address.country}`
                                                            : 'No shipping address provided'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 bg-bg-white p-4 rounded-md">
                                                <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                                                    <Clock className="h-5 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-base font-normal font-poppins text-text-title">
                                                        Estimated delivery date
                                                    </p>
                                                    <p className="mt-2 font-inter text-base font-normal text-text-black-50">
                                                        Oct 8, 2025 - Oct 12, 2025
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Order Summary */}
                                <div className="lg:col-span-2">
                                    <div className="rounded-md border border-text-gray-300 p-6">
                                        <h2 className="mb-5 font-public-sans text-base font-medium text-text-title">
                                            Order Summary
                                        </h2>

                                        {/* Product Row */}
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm border border-text-gray-300">
                                                <img
                                                    src={primaryImage(order?.order_items || [])[0]}
                                                    alt={order?.order_items?.[0]?.product_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-aktiv-grotesk text-base font-normal text-text-title">
                                                    {order?.order_items?.[0]?.product_name || 'Product Name'}
                                                </p>
                                                <p className="mt-0.5 font-public-sans text-sm font-normal text-text-body">
                                                    {order?.order_items?.[0]?.quantity} ×{' '}
                                                    <span className="font-semibold text-text-green">
                                                        ${order?.order_items?.[0]?.price || '0.00'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price Rows */}
                                        <div className="mb-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-body">Sub-total</span>
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-title">${Number(order.subtotal).toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-body">Shipping</span>
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-title">${Number(order.shipping_cost).toFixed(2)}</span>
                                            </div>
                                            {/* {order.discount > 0 && (
                                                <div className="flex items-center justify-between">
                                                    <span className="font-aktiv-grotesk text-sm font-normal text-text-body">Discount</span>
                                                    <span className="font-aktiv-grotesk text-sm font-normal text-red-500">-${Number(order.discount).toFixed(2)}</span>
                                                </div>
                                            )} */}
                                        </div>

                                        <div className="mb-4 w-full border-b border-text-gray-300"></div>

                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="font-aktiv-grotesk text-base font-semibold text-text-title">Total</span>
                                            <span className="font-aktiv-grotesk text-base font-semibold text-text-title">${Number(order.total).toFixed(2)} USD</span>
                                        </div>

                                        <div className="mb-4 w-full border-b border-text-gray-300"></div>

                                        <div>
                                            <h4 className="text-center font-public-sans text-lg font-medium text-bg-button">
                                                Payment Method : {getPaymentMethodLabel(order.payment?.payment_method || '', paymentMethod || [])}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FrontendLayout>
    );
}