import OrderCard from '@/components/ui/order-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Clock, DollarSign, ShoppingCart, Truck, X } from 'lucide-react';



const orders: Order[] = [
    {
        id: '#ord-001',
        buyer: 'Arlene McCoy',
        amount: '$219.78',
        status: 'Pending',
        date: '07/05/2016',
    },
    {
        id: '#ord-002',
        buyer: 'Cody Fisher',
        amount: '$219.78',
        status: 'Shipped',
        date: '07/05/2016',
    },
    {
        id: '#ord-003',
        buyer: 'Jacob Jones',
        amount: '$219.78',
        status: 'Delivered',
        date: '07/05/2016',
    },
    {
        id: '#ord-004',
        buyer: 'Jenny Wilson',
        amount: '$219.78',
        status: 'Pending',
        date: '07/05/2016',
    },
    {
        id: '#ord-005',
        buyer: 'Guy Hawkins',
        amount: '$219.78',
        status: 'Pending',
        date: '07/05/2016',
    },
    {
        id: '#ord-006',
        buyer: 'Robert Fox',
        amount: '$219.78',
        status: 'Pending',
        date: '07/05/2016',
    },
    {
        id: '#ord-007',
        buyer: 'Cameron Diaz',
        amount: '$219.78',
        status: 'Delivered',
        date: '07/05/2016',
    },
];


const StatCard = ({ title, value, subtext, icon: Icon, trendValue }: any) => (
    <div className="flex flex-col justify-center gap-4 rounded-xl border border-text-gray-300 bg-bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
                <div className="font-roboto text-sm font-normal text-text-title">
                    {title}
                </div>
                <div className="font-poppins text-2xl font-semibold text-text-title">
                    {value}
                </div>
            </div>
            <div className="rounded-lg bg-bg-button/10 p-3">
                <Icon className="size-6 text-text-buy-now" />
            </div>
        </div>
    </div>
);

export default function Index() {
    return (
        <AdminLayout activeSlug={'order-management'}>
            <Head title="Admin Order Management" />








             {/* Header */}
                <div className="flex flex-col gap-2">
                    <h2 className="font-poppins text-[40px] font-medium text-text-title">
                       Order Management
                    </h2>
                    <p className="font-inter text-base font-normal text-text-body">
                        Track and fulfill customer orders globally.
                    </p>
                </div>

                {/* Last 30 days overview */}
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Pending"
                            value="200"
                            icon={Clock}
                        />
                        <StatCard
                            title="Shipped"
                            value="300"
                            icon={Truck}
                        />
                        <StatCard
                            title="Completed"
                            value="677"
                            icon={ShoppingCart}
                        />
                        <StatCard
                            title="Cancel Orders"
                            value="12,234"
                            icon={X}

                        />
                    </div>
                </div>












            <div className="w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="">
                    <h2 className="p-6 font-poppins text-2xl font-semibold text-text-title">
                        Orders List
                    </h2>
                </div>
                <OrderCard orders={orders} />
            </div>
        </AdminLayout>
    );
}
