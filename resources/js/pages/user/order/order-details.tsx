import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { usePage } from '@inertiajs/react';

interface Order {
    id: string;
    order_number: string;
    order_status: string;
    payment_method?: string;
    total: number;
    created_at: string;
    order_address: {
        full_name: string;
        email: string;
        phone: string;
        address_line1: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
    order_items: Array<{
        product_name: string;
        quantity: number;
        price: number;
        product?: {
            images: Array<{
                image: string;
                is_primary: boolean;
            }>;
        };
    }>;
}

interface PageProps {
    [key: string]: any;
    order: Order;
    statusOptions: Array<{
        value: string;
        label: string;
        color: string;
    }>;
}

export default function OrderDetails() {
    const { props } = usePage<PageProps>();
    const order = props.order;
    const statusOptions = props.statusOptions || [];

    if (!order) {
        return (
            <UserDashboardLayout>
                <div className="text-center py-12">
                    <p className="text-gray-500">Order not found</p>
                </div>
            </UserDashboardLayout>
        );
    }

    const opt = statusOptions.find((o) => o.value === order.order_status);

    const primaryImage = (item: Order['order_items'][0]) => {
        const primaryImg = item.product?.images?.find((img) => img.is_primary === true);
        if (primaryImg?.image) {
            return `/storage/${primaryImg.image}`;
        }
        
        const firstImg = item.product?.images?.[0];
        if (firstImg?.image) {
            return `/storage/${firstImg.image}`;
        }
        
        return '/assets/images/products/placeholder.png';
    };

    return (
        <UserDashboardLayout>
            <div className="flex flex-col gap-4 px-4 pb-6 md:px-6">
                <div
                    key={order.order_number}
                    className="overflow-hidden border border-red-200"
                    style={{ backgroundColor: 'var(--color-order-card-bg)' }}
                >
                    <div className="px-6 py-5 bg-bg-button/10">
                        <h2 className="font-inter text-2xl font-semibold text-text-title">
                            Order Details
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-[200px_1fr_180px_180px] items-center px-6 py-2.5 bg-bg-button/20">
                        <div>
                            <p className="font-inter text-base font-normal uppercase text-text-title/70">
                                Order Number :
                            </p>
                            <p className="font-inter text-base font-bold text-text-title">
                                {order.order_number}
                            </p>
                        </div>
                        <div>
                            <p className="font-inter text-base font-normal uppercase text-text-title/70">
                                Products
                            </p>
                        </div>
                        <div>
                            <p className="font-inter text-base font-normal uppercase text-text-title/70">
                                Order Total : ${order.total}
                            </p>
                        </div>
                        <div>
                            <p className="font-inter text-base font-normal uppercase text-text-title/70">
                                Shipping Status
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr_180px_180px] items-start px-6 py-5 bg-bg-button/10">
                        <div className="flex flex-col gap-4 pr-5 border-r border-red-200">
                            <div>
                                <p className="font-inter text-base font-medium text-text-title">
                                    Order Date :
                                </p>
                                <p className="font-inter text-base font-normal text-text-title/80">
                                    {order.created_at
                                        ? new Date(order.created_at).toLocaleDateString('en-US', {
                                              month: '2-digit',
                                              day: '2-digit',
                                              year: 'numeric',
                                          })
                                        : '—'}
                                </p>
                            </div>
                            <div>
                                <p className="font-inter text-base font-medium text-text-title">
                                    Payment Method :
                                </p>
                                <p className="font-inter text-base font-normal text-text-title/80 capitalize">
                                    {order.payment_method || 'Card'}
                                </p>
                            </div>
                            <div>
                                <p className="font-inter text-base font-medium text-text-title">
                                    Shipping Address :
                                </p>
                                <p className="font-inter text-base font-normal text-text-title/80 leading-6">
                                    {order.order_address?.address_line1 && (
                                        <>{order.order_address.address_line1}<br /></>
                                    )}
                                    {order.order_address?.city && (
                                        <>{order.order_address.city},<br /></>
                                    )}
                                    {order.order_address?.state && (
                                        <>{order.order_address.state},<br /></>
                                    )}
                                    {order.order_address?.zip_code && (
                                        <>{order.order_address.zip_code}<br /></>
                                    )}
                                    {order.order_address?.country && (
                                        <>{order.order_address.country}</>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col pl-5 gap-5">
                            {order.order_items?.map((item, idx) => {
                                const img = primaryImage(item);
                                return (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="shrink-0 overflow-hidden w-[70px] h-[70px] bg-white">
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt={item.product_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-[#f0e0e0]">
                                                    <span className="text-xs text-text-title/30">img</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-inter text-base font-normal text-text-title">
                                                {item.product_name}
                                            </p>
                                            <p className="font-inter text-base font-normal text-text-title/70">
                                                QTY : {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col gap-5">
                            {order.order_items?.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center"
                                    style={{ height: '70px' }}
                                >
                                    <p className="font-inter text-base font-normal text-text-title">
                                        ${item.price}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-start" style={{ height: '70px' }}>
                            <span
                                className={`font-inter text-base font-normal ${
                                    opt?.color?.startsWith('text-') ? opt.color : ''
                                }`}
                                style={
                                    !opt?.color?.startsWith('text-')
                                        ? { color: opt?.color || '#e53e3e' }
                                        : undefined
                                }
                            >
                                {opt?.label || order.order_status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}