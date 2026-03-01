import { useState } from 'react';
import OrderDetails from './order-details';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export type Order = {
    id: string;
    buyer: string;
    amount: string;
    status: OrderStatus;
    date: string;
    email?: string;
    phone?: string;
    address?: string;
    items?: Array<{
        name: string;
        quantity: number;
        price: string;
        image: string;
    }>;
    subtotal?: string;
    shipping?: string;
    tax?: string;
    total?: string;
};

type Props = {
    orders: Order[];
};

const STATUS_STYLES: Record<OrderStatus, { text: string; bg: string; border: string }> = {
    Pending:   { text: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-200'   },
    Shipped:   { text: 'text-blue-500',    bg: 'bg-blue-50',    border: 'border-blue-200'    },
    Delivered: { text: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

const STATUS_COLORS: Record<OrderStatus, string> = {
    Pending:   'var(--amber-500)',
    Shipped:   'var(--blue-500)',
    Delivered: 'var(--emerald-500)',
};

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="var(--text-title)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        className="text-text-title">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const ChevronDown = ({ color }: { color: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const ITEMS_PER_PAGE = 7;

export default function OrderCard({ orders: initialOrders }: Props) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [page, setPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const visible = orders.slice(start, start + ITEMS_PER_PAGE);

    const handleStatusChange = (id: string, newStatus: OrderStatus) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
    };

    const handleViewOrder = (order: Order) => {
        // Create a detailed order object with mock data
        const detailedOrder = {
            ...order,
            email: `${order.buyer.toLowerCase().replace(' ', '.')}@example.com`,
            phone: '+1 (555) 123-4567',
            address: '123 Main St, Apt 4B, New York, NY 10001',
            items: [
                {
                    name: 'Premium Wireless Headphones',
                    quantity: 1,
                    price: '$89.99',
                    image: '/assets/images/products/headphones.jpg'
                },
                {
                    name: 'Smart Watch Series 5',
                    quantity: 2,
                    price: '$249.99',
                    image: '/assets/images/products/watch.jpg'
                },
                {
                    name: 'Laptop Stand Adjustable',
                    quantity: 1,
                    price: '$49.99',
                    image: '/assets/images/products/stand.jpg'
                }
            ],
            subtotal: '$639.96',
            shipping: '$12.00',
            tax: '$51.20',
            total: order.amount
        };
        setSelectedOrder(detailedOrder);
    };

    return (
        <>
            <div className="">
              
                {/* Table */}
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
                                const style = STATUS_STYLES[order.status];
                                return (
                                    <tr key={order.id} className="border-b border-text-gray-300 hover:bg-bg-card transition-colors bg-bg-white">
                                        <td className="px-6 py-4 text-text-title font-roboto text-base font-normal">{order.id}</td>
                                        <td className="px-6 py-4 text-text-title font-roboto text-base font-normal">{order.buyer}</td>
                                        <td className="px-6 py-4 text-text-title font-roboto text-base font-normal">{order.amount}</td>
                                        <td className="px-6 py-4">
                                            <div className="relative inline-flex items-center">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                    className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-medium border cursor-pointer focus:outline-none ${style.text} ${style.bg} ${style.border}`}
                                                    style={{ WebkitAppearance: 'none' }}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                                                    <ChevronDown color={STATUS_COLORS[order.status]} />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-text-title font-roboto text-base font-normal">{order.date}</td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => handleViewOrder(order)}
                                                className="p-1.5 rounded-full text-text-title font-roboto text-base font-normal hover:bg-bg-card transition-colors" 
                                                aria-label="View order"
                                            >
                                                <EyeIcon />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center justify-between">
                    <span className="text-sm text-text-green font-medium font-poppins">
                        Showing {start + 1} to {Math.min(start + ITEMS_PER_PAGE, orders.length)} of {orders.length} results
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-1.5 text-sm border border-text-green text-text-green rounded-lg hover:bg-bg-light-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-1.5 text-sm border border-text-green text-text-green rounded-lg hover:bg-bg-light-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetails 
                    order={selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                />
            )}
        </>
    );
}