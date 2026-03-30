import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Order {
    id: string;
    order_number: string;
    order_status: string;
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
    orders: Order[];
    statusOptions: Array<{
        value: string;
        label: string;
        color: string;
    }>;
}

const ITEMS_PER_PAGE = 7;

export default function Orders() {
    const { props } = usePage<PageProps>();
    const [page, setPage] = useState(1);

    const orders = props.orders || [];
    const statusOptions = props.statusOptions || [];
    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const visible = orders.slice(start, start + ITEMS_PER_PAGE);

    return (
        <UserDashboardLayout>
            <div className="w-full overflow-x-auto">
                <div className="bg-bg-button/10 px-6 py-7">
                    <h2 className="font-poppins text-2xl font-semibold text-text-title">
                        Orders List
                    </h2>
                    {props.errors && Object.keys(props.errors).length > 0 && (
                        <div className="text-red-500">
                            {Object.values(props.errors).flat().join(', ')}
                        </div>
                    )}
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-bg-card">
                            {['Order ID', 'Amount', 'Status', 'Date', 'Action'].map((col) => (
                                <th
                                    key={col}
                                    className="px-6 py-3 font-roboto text-base font-normal text-text-title text-center"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((order) => {
                            const opt = statusOptions.find((o) => o.value === order.order_status);

                            return (
                                <tr
                                    key={order.order_number}
                                    className="border-b border-text-gray-300 bg-bg-white transition-colors hover:bg-bg-card text-center"
                                >
                                    <td className="px-6 py-4 font-roboto text-base font-normal text-text-title">
                                        {order.order_number}
                                    </td>
                                    <td className="px-6 py-4 font-roboto text-base font-normal text-text-title">
                                        ${order.total}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${opt?.color || 'bg-gray-100 text-gray-800'}`}>
                                            {opt?.label || order.order_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-roboto text-base font-normal text-text-title">
                                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={route('user.order-details', order.id)}
                                            className="inline-flex w-full items-center justify-center bg-text-buy-now py-2 text-sm font-bold text-text-white uppercase xl:py-4"
                                        >
                                            View details
                                        </Link>
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
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="cursor-pointer rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="cursor-pointer rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </UserDashboardLayout>
    );
}