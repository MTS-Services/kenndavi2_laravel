import OrderCard from '@/components/ui/order-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, usePage } from '@inertiajs/react';
import { Clock, ShoppingCart, Truck, X } from 'lucide-react';

export type StatusOption = {
    value: string;
    label: string;
    color: string;
};

// const StatCard = ({ title, value, icon: Icon }: any) => (
//     <div className="flex flex-col justify-center gap-4 rounded-xl border border-text-gray-300 bg-bg-white p-6 shadow-sm transition-all hover:shadow-md">
//         <div className="flex items-start justify-between">
//             <div className="flex flex-col gap-2">
//                 <div className="font-roboto text-sm font-normal text-text-title">{title}</div>
//                 <div className="font-poppins text-2xl font-semibold text-text-title">{value}</div>
//             </div>
//             <div className="rounded-lg bg-bg-button/10 p-3">
//                 <Icon className="size-6 text-text-buy-now" />
//             </div>
//         </div>
//     </div>
// );

export default function Index() {
    // const { orders, statusOptions } = usePage<PageProps>().props;
    // const transformedOrders = transformOrders(orders);

    const { orders, statusOptions } = usePage().props as any;
    

    return (
        <AdminLayout activeSlug={'order-management'}>
            <Head title="Admin Order Management" />

            <div className="flex flex-col gap-2">
                <h2 className="font-poppins text-[40px] font-medium text-text-title">Order Management</h2>
                <p className="font-inter text-base font-normal text-text-body">
                    Track and fulfill customer orders globally.
                </p>
            </div>

            {/* <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Pending"       value="200"    icon={Clock} />
                    <StatCard title="Shipped"        value="300"    icon={Truck} />
                    <StatCard title="Completed"      value="677"    icon={ShoppingCart} />
                    <StatCard title="Cancel Orders"  value="12,234" icon={X} />
                </div>
            </div> */}

            <div className="w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="p-6">
                    <h2 className="font-poppins text-2xl font-semibold text-text-title">Orders List</h2>
                </div>
                <OrderCard orders={orders} statusOptions={statusOptions} />
            </div>
        </AdminLayout>
    );
}