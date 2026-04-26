import { router, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import FrontendLayout from '@/layouts/frontend-layout';

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
    cart?: {
        id: number;
        items: any[];
    } | null;
    cartItems?: any[];
    order?: any;
    orderItems?: any[];
    shippingCost?: number;
    formattedShippingCost?: string;
    errors?: Record<string, string>;
}

export default function ShippingInformationPage() {
    const {
        user,
        addresses,
        cartItems,
        order,
        orderItems,
        errors,
        shippingCost,
        formattedShippingCost,
    } = usePage<PageProps>().props;

    const shippingAddress = addresses?.find((addr) => addr.type === 'shipping');

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            route('user.checkout.place-order'),
            {
                ...form,
            },
            {
                onSuccess: () => {
                    // Will be redirected to payment automatically
                },
                onError: (errors) => {
                    console.log(errors);
                },
            },
        );
    };

    const hasOrderItems = (orderItems?.length ?? 0) > 0;

    const summaryItems = hasOrderItems
        ? (orderItems || []).map((item: any) => {
              const imagePath = item.product?.images?.[0]?.image;
              const fullImagePath = imagePath
                  ? `/storage/${imagePath}`
                  : 'https://placehold.co/600x400';

              return {
                  ...item,
                  name: item.product_name,
                  price: parseFloat(item.price || 0),
                  original_price: parseFloat(item.product?.price || 0),
                  has_discount: parseFloat(item.discount || 0) > 0,
                  formatted_price: `$${parseFloat(item.price || 0).toFixed(2)}`,
                  formatted_original_price: `$${parseFloat(item.product?.price || 0).toFixed(2)}`,
                  image: fullImagePath,
              };
          })
        : (cartItems || []).map((item: any) => {
              const imagePath = item.product?.images?.[0]?.image;
              const fullImagePath = imagePath
                  ? `/storage/${imagePath}`
                  : 'https://placehold.co/600x400';
              const unitPrice =
                  item.calculated?.discounted_price ??
                  parseFloat(item.product?.price || 0);

              return {
                  ...item,
                  name: item.product_name,
                  price: unitPrice,
                  original_price:
                      item.calculated?.original_price ??
                      parseFloat(item.product?.price || 0),
                  has_discount: item.calculated?.has_discount || false,
                  formatted_price:
                      item.calculated?.formatted_discounted_price ??
                      `$${unitPrice.toFixed(2)}`,
                  image: fullImagePath,
              };
          });

    const subTotalFromCart = (cartItems || []).reduce(
        (sum: number, item: any) =>
            sum + parseFloat(item.calculated?.total_price ?? 0),
        0,
    );

    const subTotal = hasOrderItems
        ? parseFloat(order?.subtotal || 0)
        : subTotalFromCart;

    const shipping = hasOrderItems
        ? parseFloat(String(shippingCost ?? 0))
        : subTotalFromCart <= 1
          ? 0
          : parseFloat(String(shippingCost ?? 0));

    const total = subTotal + shipping;

    return (
        <FrontendLayout>
            <div className="mb-12 sm:mb-28">
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <form onSubmit={handleSubmit}>
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
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.name}
                                                </p>
                                            )}
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
                                            {errors.address_line1 && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.address_line1}
                                                </p>
                                            )}
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
                                            {errors.address_line2 && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.address_line2}
                                                </p>
                                            )}
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
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.email}
                                                </p>
                                            )}
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
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.phone}
                                                </p>
                                            )}
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
                                            {errors.State && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.State}
                                                </p>
                                            )}
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
                                            {errors.city && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.city}
                                                </p>
                                            )}
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
                                            {errors.postalCode && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.postalCode}
                                                </p>
                                            )}
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
                                        {errors.country && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.country}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Order Summary */}
                            <div>
                                <div className="border border-text-gray-300 p-6">
                                    <h2 className="mb-5 font-public-sans text-base font-medium text-text-title">
                                        Order Summery
                                    </h2>

                                    {/* Product Rows */}
                                    {summaryItems.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="mb-4 flex items-center gap-3"
                                        >
                                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-text-gray-300">
                                                <img
                                                    src={
                                                        item.image ||
                                                        '/assets/images/product/placeholder.png'
                                                    }
                                                    alt={item.name || 'Product'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-aktiv-grotesk text-base font-normal text-text-title">
                                                    {item.name}
                                                </p>
                                                <p className="mt-0.5 font-public-sans text-sm font-normal text-text-body">
                                                    {item.quantity} ×{' '}
                                                    {/* <Input type="hidden" name="formatted_price" value={product.formatted_price} /> */}
                                                    <span className="font-semibold text-text-green">
                                                        {item.formatted_price}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}

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
                                    <button
                                        type="submit"
                                        className="flex w-full cursor-pointer items-center justify-center gap-2 bg-text-buy-now px-6 py-4 font-bebas-neue text-xl font-normal text-text-white uppercase"
                                    >
                                        Place order
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </FrontendLayout>
    );
}
