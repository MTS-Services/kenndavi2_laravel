import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, ReceiptText } from 'lucide-react';

import FrontendLayout from '@/layouts/frontend-layout';

interface CancelPageProps {
    order: {
        order_number: string;
        total: number;
        order_status: string;
        payment_status: string;
        created_at: string;
    };
    errorMessage?: string | null;
    attemptsRemaining?: number;
    attemptCount?: number;
    maxAttempts?: number;
    canRetryPayment?: boolean;
}

export default function OrderPaymentFailedPage({
    order,
    errorMessage,
    attemptsRemaining = 0,
    attemptCount = 0,
    maxAttempts = 3,
    canRetryPayment = false,
}: CancelPageProps) {
    return (
        <FrontendLayout>
            <Head title="Payment Cancelled" />

            <div className="container mx-auto mb-12 px-4 py-10 sm:mb-28 lg:py-16">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                        <div className="mb-3 flex justify-center">
                            <AlertTriangle className="h-10 w-10 text-red-600" />
                        </div>
                        <h1 className="mb-1 font-public-sans text-3xl font-semibold text-text-title">
                            Payment Cancelled / Failed
                        </h1>
                        <p className="font-public-sans text-sm text-text-body">
                            We could not complete payment for{' '}
                            <span className="font-semibold">{order.order_number}</span>.
                        </p>
                    </div>

                    <div className="rounded-xl border border-text-gray-300 p-5">
                        <h2 className="mb-4 flex items-center gap-2 font-public-sans text-lg font-semibold text-text-title">
                            <ReceiptText className="h-5 w-5" />
                            Order Snapshot
                        </h2>
                        <div className="grid gap-2 text-sm text-text-body sm:grid-cols-2">
                            <p>Order: {order.order_number}</p>
                            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            <p>Order status: {order.order_status}</p>
                            <p>Payment status: {order.payment_status}</p>
                            <p className="sm:col-span-2">
                                Amount: ${Number(order.total).toFixed(2)} USD
                            </p>
                        </div>

                        {errorMessage ? (
                            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                {errorMessage}
                            </div>
                        ) : null}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {canRetryPayment ? (
                            <Link
                                href={route('user.checkout.gateway', { order: order.order_number })}
                                className="block bg-text-buy-now px-4 py-3 text-center font-bebas-neue text-xl uppercase text-white"
                            >
                                Try Again ({attemptsRemaining} left)
                            </Link>
                        ) : (
                            <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-center font-public-sans text-sm text-red-700">
                                Retry limit reached ({attemptCount}/{maxAttempts})
                            </div>
                        )}
                        <Link
                            href={route('user.orders')}
                            className="block border border-text-gray-300 px-4 py-3 text-center font-public-sans text-sm text-text-title"
                        >
                            Back to Orders
                        </Link>
                    </div>

                    <div className="text-center">
                        <Link
                            href={route('frontend.home')}
                            className="inline-flex items-center gap-2 font-public-sans text-sm text-text-body hover:text-text-title"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}

