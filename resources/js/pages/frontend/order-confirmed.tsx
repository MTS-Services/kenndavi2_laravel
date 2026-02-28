import FrontendLayout from '@/layouts/frontend-layout';
import { ArrowRight, Calendar, CheckCircle, Clock, Link, Mail, MapPin } from 'lucide-react';


    const orderItem = {
        name: 'Sweet BBQ Sauces',
        quantity: 1,
        price: 70,
        image: '/assets/images/product/Rectangle 20.png',
    };

    const subTotal = orderItem.price * orderItem.quantity;
    const shipping = 20;
    const total = subTotal + shipping;

export default function OrderConfirmed() {
    return (
        <FrontendLayout>
            <div>
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="">
                        {/* Success Icon & Header */}
                        <div className="mb-10 text-center">
                            <div className="relative mb-6 inline-flex items-center justify-center">
                                <div className="absolute h-20 w-20 animate-ping rounded-full bg-primary/10 opacity-30" />
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                                    <CheckCircle
                                        className="h-10 w-10 text-primary"
                                        strokeWidth={2}
                                    />
                                </div>
                            </div>
                            <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
                                Order Confirmed!
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Thank you for your purchase
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                            {/* Left Column - Order Details */}
                            <div className="space-y-6 lg:col-span-3">
                                {/* Order Number Card */}
                                <div className="rounded-xl border border-border bg-bg-order-card p-5 sm:p-6">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h2 className="font-public-sans text-2xl font-medium text-text-title">
                                                Order Number#45897
                                            </h2>
                                            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="h-4 w-4" />
                                                    Oct 5, 2025
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="h-4 w-4" />
                                                    customer@gmail.com
                                                </span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                            A confirmation email has been sent
                                            to your inbox
                                        </div>
                                    </div>
                                </div>

                                {/* Shipment Card */}
                                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                                    <h2 className="mb-1 text-lg font-semibold text-foreground">
                                        Shipped to Your Address
                                    </h2>
                                    <p className="mb-5 text-sm text-muted-foreground">
                                        2 items in this shipment
                                    </p>

                                    <div className="space-y-5 rounded-xl bg-secondary/60 p-5">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                <MapPin className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    Delivery Address
                                                </p>
                                                <p className="mt-0.5 text-sm text-muted-foreground">
                                                    4517 Washington Ave.
                                                    Manchester, Kentucky 39495
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t border-border" />

                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                <Clock className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    Estimated delivery date
                                                </p>
                                                <p className="mt-0.5 text-sm text-muted-foreground">
                                                    Oct 8, 2025 - Oct 12, 2025
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="lg:col-span-2">
                                <div>
                                    <div className="border border-text-gray-300 p-6 rounded-md">
                                        <h2 className="mb-5 font-public-sans text-base font-medium text-text-title">
                                            Order Summery
                                        </h2>

                                        {/* Product Row */}
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm border border-text-gray-300">
                                                <img
                                                    src={orderItem.image}
                                                    alt={orderItem.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-aktiv-grotesk text-base font-normal text-text-title">
                                                    {orderItem.name}
                                                </p>
                                                <p className="mt-0.5 font-public-sans text-sm font-normal text-text-body">
                                                    {orderItem.quantity} ×{' '}
                                                    <span className="font-semibold text-text-green">
                                                        ${orderItem.price}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price Rows */}
                                        <div className="mb-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-body">
                                                    Sub-total
                                                </span>
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-title">
                                                    ${subTotal.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-body">
                                                    Shipping
                                                </span>
                                                <span className="font-aktiv-grotesk text-sm font-normal text-text-title">
                                                    ${shipping.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="mb-4 w-full border-b border-text-gray-300"></div>

                                        {/* Total */}
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="font-aktiv-grotesk text-base font-semibold text-text-title">
                                                Total
                                            </span>
                                            <span className="font-aktiv-grotesk text-base font-semibold text-text-title">
                                                ${total.toFixed(2)} USD
                                            </span>
                                        </div>

                                          {/* Divider */}
                                        <div className="mb-4 w-full border-b border-text-gray-300"></div>
                                       
                                       
                                       <div className="">
                                        <h4 className="font-public-sans text-lg text-bg-button font-medium text-center">Payment Method : Online Payment</h4>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
