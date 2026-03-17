import { useState } from 'react';
import { router } from '@inertiajs/react';
import OrderDetails from './order-details';
import type { StatusOption } from '@/pages/admin/order-management/index';
import { toast } from 'sonner';

export type Order = {
    id: string;
    order_number: string;
    order_status: string;
    total: number;
    created_at: string;
    updated_at: string;
    order_address: {
        full_name: string;
        email: string;
        phone: string;
        address_line1: string;
        address_line2: string;
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
};

// Type for OrderDetails component
export type OrderDetailData = {
    id: string;
    buyer: string;
    amount: string;
    order_status: string;
    date: string;
    email: string;
    phone: string;
    address: string;
    order_items: Array<{ name: string; quantity: number; price: string; image: string }>;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
};

type Props = {
    orders:        Order[];
    statusOptions: StatusOption[];
};


const ITEMS_PER_PAGE = 7;


export default function OrderCard({ orders: initialOrders, statusOptions }: Props) {
    const [orders] = useState<Order[]>(initialOrders);
    const [page, setPage]     = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetailData | null>(null);

    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const start      = (page - 1) * ITEMS_PER_PAGE;
    const visible    = orders.slice(start, start + ITEMS_PER_PAGE);

    const handleViewOrder = (order: Order) => {
        const detailedOrder = {
            id: order.id,
            order_number: order.order_number,
            buyer: order.order_address?.full_name || 'Unknown',
            amount: `$${Number(order.total).toFixed(2)}`,
            order_status: order.order_status,
            date: order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            }).replace(/\//g, '/') : '',
            email: order.order_address?.email || 'Unknown',
            phone: order.order_address?.phone || 'Unknown',
            address: `${order.order_address?.address_line1}, ${order.order_address?.city}, ${order.order_address?.state} ${order.order_address?.zip_code}, ${order.order_address?.country}`,
            order_items: order.order_items?.map((item) => ({
                name: item.product_name,
                quantity: item.quantity,
                price: `$${Number(item.price).toFixed(2)}`,
                image: item.product?.images?.find((img) => img.is_primary)?.image ?? 
                       item.product?.images?.[0]?.image ?? 
                       '/assets/images/products/placeholder.png'
            })) || [{
                name: 'Product Item',
                quantity: 1,
                price: `$${Number(order.total).toFixed(2)}`,
                image: '/assets/images/products/placeholder.png'
            }],
            subtotal: `$${Number(order.total).toFixed(2)}`,
            shipping: '$0.00',
            tax: '$0.00',
            total: `$${Number(order.total).toFixed(2)}`
        };
        setSelectedOrder(detailedOrder);
    };

    const handleStatusChange = (id: string, order_status: string) => {
        router.post(
            route('admin.om.update-status', {id}),
            { order_status },
            {
                onSuccess: () => {
                    toast.success('Status updated successfully');
                    // Reload the page to refresh data
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error(errors);
                }
            }
        );
    };

    const handleDetailsStatusChange = (order_id: string, new_status: string) => {
        handleStatusChange(order_id, new_status);
    };

    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-bg-card border-t border-text-gray-300">
                            {['Order ID', 'Buyer', 'Amount', 'Status', 'Date', 'Action'].map((col) => (
                                <th key={col} className="px-6 py-3 text-left text-text-title font-roboto text-base font-normal">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((order) => {
                            const opt   = statusOptions.find((o) => o.value === order.order_status);

                            return (
                                <tr key={order.order_number} className="border-b border-text-gray-300 hover:bg-bg-card transition-colors bg-bg-white">
                                    <td className="px-6 py-4 font-roboto text-base font-normal text-text-title">{order.order_number}</td>
                                    <td className="px-6 py-4 font-roboto text-base font-normal text-text-title">{order.order_address?.full_name || 'N/A'}</td>
                                    <td className="px-6 py-4 font-roboto text-base font-normal text-text-title">{order.total}</td>
                                    <td className="px-6 py-4">
                                       <select
                                            value={order.order_status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-medium border cursor-pointer focus:outline-none ${opt?.color} `}
                                        >
                                            {statusOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 font-roboto text-base font-normal text-text-title">{order.created_at?(new Date(order.created_at)).toLocaleDateString():''}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleViewOrder(order)}
                                            className="p-1.5 rounded-full text-text-title hover:bg-bg-card transition-colors cursor-pointer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between px-6 py-4">
                <span className="font-poppins text-sm font-medium text-text-green">
                    Showing {start + 1} to {Math.min(start + ITEMS_PER_PAGE, orders.length)} of {orders.length} results
                </span>
                <div className="flex gap-2">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                        className="px-4 py-1.5 text-sm border border-text-green text-text-green rounded-lg hover:bg-bg-light-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer">
                        Previous
                    </button>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                        className="px-4 py-1.5 text-sm border border-text-green text-text-green rounded-lg hover:bg-bg-light-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer">
                        Next
                    </button>
                </div>
            </div>

            {selectedOrder && (
                <OrderDetails
                    order={selectedOrder}
                    statusOptions={statusOptions}
                    onClose={() => setSelectedOrder(null)}
                    onStatusChange={(new_status) => handleDetailsStatusChange(selectedOrder.id, new_status)}
                />
            )}
        </>
    );
}