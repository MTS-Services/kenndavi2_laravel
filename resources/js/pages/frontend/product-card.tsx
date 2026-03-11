import FrontendLayout from '@/layouts/frontend-layout';
import { Link, usePage, router } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    checked?: boolean;
    product?: {
        id: number;
        title: string;
        price: number;
        image?: string;
    };
}

interface CartData {
    cart: {
        id: number;
        items: CartItem[];
    } | null;
    cartItems: CartItem[];
}

export default function ProductCard() {
    const { props } = usePage();
    const cartData = props as any;
    const { cart, cartItems } = cartData;
    
    // Add checked property to cart items
    const initialProducts = (cartItems || []).map((item: any) => {
        const imagePath = item.product?.images?.[0]?.image;
        const fullImagePath = imagePath ? `/storage/${imagePath}` : '/assets/images/product/placeholder.png';
        
        return {
            ...item,
            checked: true,
            name: item.product_name,
            price: parseFloat(item.product?.price || 0),
            image: fullImagePath
        };
    });
    
    const [products] = useState(initialProducts);

    const updateQuantity = (id: number, change: number) => {
        const newQuantity = Math.max(1, products.find((p: any) => p.id === id)?.quantity + change || 1);
        
        router.post('/cart/update', {
            cart_item_id: id,
            quantity: newQuantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Failed to update cart:', errors);
            }
        });
    };

    const removeProduct = (id: number) => {
        router.delete(`/cart/remove/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Failed to remove item:', errors);
            }
        });
    };

    // Calculate totals dynamically
    const subTotal = products.reduce((total: number, product: any) => {
        if (product.checked) {
            const price = parseFloat(product.price) || 0;
            const quantity = parseInt(product.quantity) || 0;
            return total + (price * quantity);
        }
        return total;
    }, 0);
    
    const shipping = subTotal > 0 ? 20 : 0; // Free shipping if no items
    const total = subTotal + shipping;
    return (
        <FrontendLayout>
            <div>
                <div className="container mx-auto px-4 py-10 lg:py-16 mb-12 sm:mb-28">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] xl:gap-16">
                        {/* Left Column - Shipping Table */}
                        <div className="rounded-sm border border-text-gray-300 p-6">
                            <h2 className="mb-8 font-bebas-neue text-4xl font-normal text-text-title uppercase">
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
                            {products.map((product: any, index: number) => (
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
                                                className="h-5 w-5 text-text-title"
                                                strokeWidth={2}
                                            />
                                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-text-gray-300">
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
                                        <div className="col-span-2 font-aktiv-grotesk text-lg font-normal text-text-title">
                                            ${parseFloat(product.price || 0).toFixed(2)}
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
                                                className="mt-1 h-5 w-5 flex-shrink-0 text-text-title"
                                                strokeWidth={2}
                                            />
                                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-text-gray-300">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="mb-2 line-clamp-1 font-aktiv-grotesk text-base font-normal text-text-title">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-aktiv-grotesk text-base font-normal text-text-title">
                                                        ${parseFloat(product.price || 0).toFixed(2)}
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
                                <h2 className="mb-5 font-public-sans text-lg font-medium text-text-title">
                                    Order Summery
                                </h2>

                                {/* Product Rows */}
                                {products.map((product: any) => (
                                    <div key={product.id} className="mb-4 flex items-center gap-3">
                                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-sm border border-text-gray-300">
                                            <img
                                                src={product.image || '/assets/images/product/placeholder.png'}
                                                alt={product.name || 'Product'}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-aktiv-grotesk text-sm font-normal text-text-title">
                                                {product.name}
                                            </p>
                                            <p className="mt-0.5 font-public-sans text-xs font-normal text-text-body">
                                                {product.quantity} ×{' '}
                                                <span className="font-semibold text-text-green">
                                                    ${parseFloat(product.price || 0).toFixed(2)}
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
