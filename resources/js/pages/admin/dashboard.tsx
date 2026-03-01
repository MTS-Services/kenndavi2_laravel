import AdminLayout from '@/layouts/admin-layout';
import { Head, usePage } from '@inertiajs/react';
import { DollarSign, Truck , ShoppingCart } from 'lucide-react';

type Props = {
    stats: {
        users: number;
        users_last_7_days: number;
    };
    userTypeCounts?: Record<string, { label: string; count: number }>;
};

const StatCard = ({
    title,
    value,
    subtext,
    icon: Icon,
    colorClass,
    trend,
    trendValue,
}: any) => (
    <div
        className={`flex flex-col justify-center gap-4 rounded-xl border border-text-gray-300 bg-bg-white p-6 shadow-sm transition-all hover:shadow-md`}
    >
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
            <p className="text-sm text-text-body font-normal font-poppins">
                <span className="text-text-green">{trendValue}</span> {subtext}
            </p>
        </div>
    </div>
);

export default function Index() {
    const { props } = usePage();
    const {
        stats = {
            users: 0,
            users_last_7_days: 0,
        },
        userTypeCounts = {},
    } = props as unknown as Props;

    return (
        <AdminLayout activeSlug={'dashboard'}>
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header Section */}
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
                    <div className="flex items-center justify-between">
                        <p className="font-poppins text-base font-normal text-text-title">
                            Last 30 days overview
                        </p>
                    </div>

                    {/* Stats Grid */}
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
            </div>
        </AdminLayout>
    );
}
