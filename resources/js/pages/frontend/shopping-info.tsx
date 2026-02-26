import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import FrontendLayout from '@/layouts/frontend-layout';
import { Link } from '@inertiajs/react';

export default function ShippingInformationPage() {
    const [shipDifferent, setShipDifferent] = useState<boolean>(false);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        region: '',
        city: '',
        zipCode: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <div className="">
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] xl:gap-16">

                        {/* Left: Shipping Form */}
                        <div>
                            <h2 className="font-bebas-neue text-3xl uppercase text-text-title font-normal mb-8">
                                Shipping Information
                            </h2>

                            <div className="space-y-5">
                                {/* First Name & Last Name */}
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            className="w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body placeholder-text-text-body outline-none focus:border-text-buy-now transition-colors"
                                        />
                                    </div>
                                    <div> 
                                        <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            className="w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body placeholder-text-text-body outline-none focus:border-text-buy-now transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder=""
                                            className="w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body placeholder-text-text-body outline-none focus:border-text-buy-now transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder=""
                                            className="w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body placeholder-text-text-body outline-none focus:border-text-buy-now transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Region / City / Zip */}
                                <div className="grid grid-cols-3 gap-5">
                                    <div>
                                        <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                            Region/State
                                        </label>
                                        <select
                                            name="region"
                                            value={form.region}
                                            onChange={handleChange}
                                            className="w-full border border-gray-200 px-4 py-3 font-public-sans text-sm text-gray-400 outline-none focus:border-text-buy-now transition-colors bg-white appearance-none"
                                        >
                                            <option value="" disabled>Select...</option>
                                            <option value="ca">California</option>
                                            <option value="ny">New York</option>
                                            <option value="tx">Texas</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                            City
                                        </label>
                                        <select
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            className="w-full border border-gray-200 px-4 py-3 font-public-sans text-sm text-gray-400 outline-none focus:border-text-buy-now transition-colors bg-white appearance-none"
                                        >
                                            <option value="" disabled>Select...</option>
                                            <option value="la">Los Angeles</option>
                                            <option value="nyc">New York City</option>
                                            <option value="houston">Houston</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={form.zipCode}
                                            onChange={handleChange}
                                            placeholder=""
                                            className="w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body placeholder-text-text-body outline-none focus:border-text-buy-now transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block font-aktiv-grotesk text-sm font-normal text-text-title mb-1.5">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder=""
                                        className="w-full border border-text-gray-300 px-4 py-3 font-public-sans text-sm text-text-body placeholder-text-text-body outline-none focus:border-text-buy-now transition-colors"
                                    />
                                </div>

                                {/* Ship to different address */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="shipDifferent"
                                        checked={shipDifferent}
                                        onChange={(e) => setShipDifferent(e.target.checked)}
                                        className="h-4 w-4 border border-text-gray-300 accent-text-buy-now cursor-pointer"
                                    />
                                    <label
                                        htmlFor="shipDifferent"
                                        className="font-public-sans text-sm font-normal text-text-title cursor-pointer"
                                    >
                                        Ship into different address
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div>
                            <div className="border border-text-gray-300 p-6">
                                <h2 className="font-public-sans text-base font-medium text-text-title mb-5">
                                    Order Summery
                                </h2>

                                {/* Product Row */}
                                <div className="flex items-center gap-3 mb-6">
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
                                        <p className="font-public-sans text-sm font-normal text-text-body mt-0.5">
                                            {orderItem.quantity} ×{' '}
                                            <span className="font-semibold text-text-green">
                                                ${orderItem.price}
                                            </span>
                                        </p>
                                    </div>
                                </div>


                                {/* Price Rows */}
                                <div className="space-y-3 mb-4">
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
                                <div className="w-full border-b border-text-gray-300 mb-4"></div>

                                {/* Total */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-aktiv-grotesk text-base font-semibold text-text-title">
                                        Total
                                    </span>
                                    <span className="font-aktiv-grotesk text-base font-semibold text-text-title">
                                        ${total.toFixed(2)} USD
                                    </span>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-center gap-2 bg-text-buy-now px-6 py-4 font-bebas-neue text-xl font-normal uppercase text-text-white"
                                >
                                    Place order
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                {/* Back Button */}
                                <Link
                                    href="#"
                                    className="mt-3 flex w-full items-center justify-center border border-text-buy-now px-6 py-4  font-bebas-neue text-xl font-normal uppercase text-text-buy-now tracking-widest"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}