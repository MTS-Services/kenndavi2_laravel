import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import FrontendLayout from '@/layouts/frontend-layout';
import { Link, usePage } from '@inertiajs/react';

interface User {
    id: number;
    email: string;
}

interface Address {
    id: number;
    full_name: string;
    user_id: number;
    type: 'shipping' | 'billing';
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
}

interface PageProps extends Record<string, any> {
    user?: User;
    addresses?: Address[];
}

export default function ShippingInformationPage() {
    const { user, addresses } = usePage<PageProps>().props;

    const shippingAddress = addresses?.find((addr) => addr.type === 'shipping');
    console.log(shippingAddress);

    const [form, setForm] = useState({
        name: shippingAddress?.full_name || '',
        email: user?.email || '',
        phone: shippingAddress?.phone || '',
        State: shippingAddress?.state || '',
        city: shippingAddress?.city || '',
        postalCode: shippingAddress?.postal_code || '',
        address_line1: shippingAddress?.address_line1 || '',
        address_line2: shippingAddress?.address_line2 || '',
        country: shippingAddress?.country || '',
    });

    useEffect(() => {
        if (shippingAddress) {
            setForm({
                name: shippingAddress?.full_name || '',
                email: user?.email || '',
                phone: shippingAddress?.phone || '',
                State: shippingAddress.state,
                city: shippingAddress.city,
                postalCode: shippingAddress.postal_code,
                address_line1: shippingAddress.address_line1,
                address_line2: shippingAddress.address_line2 || '',
                country: shippingAddress.country,
            });
        }
    }, [shippingAddress, user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const orderItem = {
        name: 'Sweet BBQ Sauces',
        quantity: 1,
        price: 70,
        image: '/assets/images/product/Rectangle 20.png',
    };

    const subTotal = orderItem.price * orderItem.quantity;
    const shipping = 20;
    const total = subTotal + shipping;

    return (
        <FrontendLayout>
            <div className="mb-12 sm:mb-28">
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] xl:gap-16">
                        {/* Left: Shipping Form */}
                        <div>
                            <h2 className="mb-8 font-bebas-neue text-3xl font-normal text-text-title uppercase">
                                Shipping Information
                            </h2>

                            <div className="space-y-5">
                                {/* First Name & Last Name */}
                                <div className="">
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            Name
                                        </label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Name"
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            Address
                                        </label>
                                        <Input
                                            type="text"
                                            name="address_line1"
                                            value={form.address_line1}
                                            onChange={handleChange}
                                            placeholder="Address"
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            Address Line 2 (Optional)
                                        </label>
                                        <Input
                                            type="text"
                                            name="address_line2"
                                            value={form.address_line2}
                                            onChange={handleChange}
                                            placeholder="Address Line 2 (Optional)"
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            readOnly
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            Phone Number
                                        </label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone"
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                </div>

                                {/* Region / City / Zip */}
                                <div className="grid grid-cols-3 gap-5">
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            Region/State
                                        </label>
                                        <Input
                                            type="text"
                                            name="State"
                                            value={form.State}
                                            onChange={handleChange}
                                            placeholder="State"
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            City
                                        </label>
                                        <Input
                                            type="text"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                            Zip Code
                                        </label>
                                        <Input
                                            type="text"
                                            name="postalCode"
                                            value={form.postalCode}
                                            onChange={handleChange}
                                            placeholder="Zip Code"
                                            className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="mb-1.5 block font-aktiv-grotesk text-sm font-normal text-text-title">
                                        Country
                                    </label>
                                    <Input
                                        type="text"
                                        name="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        placeholder="Country"
                                        className="placeholder-text-text-body w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body transition-colors outline-none focus:border-text-buy-now"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div>
                            <div className="border border-text-gray-300 p-6">
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

                                {/* Place Order Button */}
                                <Link
                                    href={route('frontend.order-confirmed')}
                                    type="button"
                                    className="flex w-full items-center justify-center gap-2 bg-text-buy-now px-6 py-4 font-bebas-neue text-xl font-normal text-text-white uppercase"
                                >
                                    Place order
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
