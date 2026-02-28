import FrontendLayout from '@/layouts/frontend-layout';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialProducts = [
    {
        id: 1,
        name: 'Sweet BBQ Sauces',
        price: 70,
        quantity: 1,
        image: '/assets/images/home/04.png',
        checked: true,
    },
    {
        id: 2,
        name: 'Teriyaki BBQ Sauces',
        price: 250,
        quantity: 3,
        image: '/assets/images/home/fb87184304aaa733c0da92fab04e9ebd14294505.jpg',
        checked: true,
    },
    {
        id: 3,
        name: 'Honey BBQ Sauces',
        price: 180,
        quantity: 2,
        image: '/assets/images/home/513f91e933b9cf0b47a9e4627c132b20f4bf15b6.jpg',
        checked: true,
    },
];

export default function ProductCard() {
    const [products, setProducts] = useState(initialProducts);

    const updateQuantity = (id: number, change: number) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          quantity: Math.max(1, product.quantity + change),
                      }
                    : product,
            ),
        );
    };

    const toggleCheckbox = (id: number) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? { ...product, checked: !product.checked }
                    : product,
            ),
        );
    };

    const removeProduct = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
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
            <div>
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] xl:gap-16">
                        {/* Left Column - Shipping Table */}
                        <div className="rounded-sm border border-text-gray-300 p-6">
                            <h2 className="mb-8 font-bebas-neue text-xl font-normal text-text-title uppercase">
                                Shopping Cart
                            </h2>
                            {/* Header - Hidden on mobile */}
                            <div className="hidden grid-cols-12 px-6 py-4 md:grid">
                                <div className="col-span-6 font-aktiv-grotesk text-base font-normal text-text-title">
                                    Products
                                </div>
                                <div className="col-span-2 font-aktiv-grotesk text-base font-normal text-text-title">
                                    Price
                                </div>
                                <div className="col-span-2 font-aktiv-grotesk text-base font-normal text-text-title">
                                    Quantity
                                </div>
                                <div className="col-span-2"></div>
                            </div>

                            {/* Product Rows */}
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={`my-2 px-0 py-0 sm:px-6 sm:py-4 ${
                                        index < products.length - 1
                                            ? 'border-b border-text-gray-300'
                                            : ''
                                    }`}
                                >
                                    {/* Desktop Layout */}
                                    <div className="hidden grid-cols-12 items-center md:grid">
                                        <div className="col-span-6 flex items-center gap-4">
                                            <CheckCircle
                                                className="h-6 w-6 text-text-title"
                                                strokeWidth={2}
                                            />
                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-text-gray-300">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <h3 className="font-aktiv-grotesk text-xl font-normal text-text-title">
                                                {product.name}
                                            </h3>
                                        </div>
                                        <div className="col-span-2 font-aktiv-grotesk text-xl font-normal text-text-title">
                                            ${product.price}
                                        </div>
                                        <div className="col-span-2">
                                            <div className="flex items-center border border-text-gray-300">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            product.id,
                                                            -1,
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center font-aktiv-grotesk text-base font-medium text-text-body"
                                                >
                                                    <Minus className="h-5 w-5 text-text-title" />
                                                </button>
                                                <span className="flex h-9 w-9 items-center justify-center font-aktiv-grotesk text-base font-medium text-text-title">
                                                    {product.quantity
                                                        .toString()
                                                        .padStart(2, '0')}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            product.id,
                                                            1,
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center font-aktiv-grotesk text-base font-medium text-text-body"
                                                >
                                                    <Plus className="h-5 w-5 text-text-title" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex justify-center">
                                            <button
                                                onClick={() =>
                                                    removeProduct(product.id)
                                                }
                                                className="hover:text-buy-now text-text-title transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden">
                                        <div className="flex items-start gap-4">
                                            <CheckCircle
                                                className="mt-1 h-6 w-6 flex-shrink-0 text-text-title"
                                                strokeWidth={2}
                                            />
                                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-text-gray-300">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="mb-2 line-clamp-1 font-aktiv-grotesk text-lg font-normal text-text-title">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-aktiv-grotesk text-lg font-normal text-text-title">
                                                        ${product.price}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            removeProduct(
                                                                product.id,
                                                            )
                                                        }
                                                        className="hover:text-buy-now text-text-title transition-colors"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 mb-2 flex items-center justify-end gap-2">
                                            <span className="mr-2 font-aktiv-grotesk text-sm text-text-title">
                                                Quantity:
                                            </span>
                                            <div className="flex items-center border border-text-gray-300">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            product.id,
                                                            -1,
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center font-aktiv-grotesk text-sm font-medium text-text-body"
                                                >
                                                    <Minus className="h-4 w-4 text-text-title" />
                                                </button>
                                                <span className="flex h-8 w-8 items-center justify-center font-aktiv-grotesk text-sm font-medium text-text-title">
                                                    {product.quantity
                                                        .toString()
                                                        .padStart(2, '0')}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            product.id,
                                                            1,
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center font-aktiv-grotesk text-sm font-medium text-text-body"
                                                >
                                                    <Plus className="h-4 w-4 text-text-title" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column - Order Summary */}
                        <div>
                            <div className="rounded-sm border border-text-gray-300 p-6">
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
                                    href={route('frontend.shopping-info')}
                                    type="button"
                                    className="flex w-full items-center justify-center gap-2 bg-text-buy-now px-6 py-4 font-bebas-neue text-xl font-normal text-text-white uppercase"
                                >
                                    Proceed to Checkout
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
