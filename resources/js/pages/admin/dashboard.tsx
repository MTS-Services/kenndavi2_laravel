import OrderCard, { Order } from '@/components/ui/order-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, usePage } from '@inertiajs/react';
import { DollarSign, ShoppingCart, Truck } from 'lucide-react';

type Props = {
    stats: {
        users: number;
        users_last_7_days: number;
    };
    userTypeCounts?: Record<string, { label: string; count: number }>;
};

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
        <div className="flex items-center justify-between">
            <p className="font-poppins text-sm font-normal text-text-body">
                <span className="text-text-green">{trendValue}</span> {subtext}
            </p>
        </div>
    </div>
);

// ✅ Orders data defined directly in Index — no controller needed
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

export default function Index() {
    const { props } = usePage();
    const { stats = { users: 0, users_last_7_days: 0 }, userTypeCounts = {} } =
        props as unknown as Props;

    return (
        <AdminLayout activeSlug={'dashboard'}>
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h2 className="font-poppins text-[40px] font-medium text-text-title">
                        General Overview
                    </h2>
                    <p className="font-inter text-base font-normal text-text-body">
                        Monitor your customer service performance
                    </p>
                </div>

                {/* Last 30 days overview */}
                <div className="space-y-4">
                    <p className="font-poppins text-base font-normal text-text-title">
                        Last 30 days overview
                    </p>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <StatCard
                            title="Total Revenue"
                            value="$45,231"
                            subtext="from last month"
                            icon={DollarSign}
                            trendValue="20.1%"
                        />
                        <StatCard
                            title="Total Orders"
                            value="2,350"
                            subtext="from last month"
                            icon={ShoppingCart}
                            trendValue="180.1%"
                        />
                        <StatCard
                            title="Products Sold"
                            value="12,234"
                            subtext="from last month"
                            icon={Truck}
                            trendValue="19%"
                        />
                    </div>
                </div>

                {/* ✅ orders prop passed directly from Index */}
               <div className="bg-white rounded-2xl shadow-sm border  overflow-hidden w-full">
                 <div className="">
                    <h2 className="font-poppins text-2xl font-semibold text-text-title p-6">
                        Recent Orders
                    </h2>
                </div>
                <OrderCard orders={orders} />
               </div>
            </div>
        </AdminLayout>
    );
}
