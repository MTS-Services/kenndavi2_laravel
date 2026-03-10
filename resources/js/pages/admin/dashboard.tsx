import OrderCard, { Order } from '@/components/ui/order-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, usePage } from '@inertiajs/react';
import { DollarSign, ShoppingCart, Truck } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#f97316',
      bodyColor: '#111',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      callbacks: {
        title: (items: any) => items[0].label,
        label: (item: any) => `$${item.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#9ca3af', font: { size: 12 } },
    },
    y: {
      grid: { color: '#f3f4f6' },
      border: { display: false },
      ticks: { color: '#9ca3af', font: { size: 12 } },
    },
  },
};
const labels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];


const gradientPlugin = {
  id: 'customGradient',
  beforeDatasetDraw(chart: any) {
    const { ctx, chartArea: { top, bottom } } = chart;
    const gradient = ctx.createLinearGradient(0, top, 0, bottom);
    gradient.addColorStop(0, 'rgba(249, 115, 22, 0.5)');  
    gradient.addColorStop(1, 'rgba(249, 115, 22, 0.0)'); 
    chart.data.datasets[0].backgroundColor = gradient;
    // Remove chart.update('none') to prevent infinite loop
  },
};

export const data = {
  labels: [
    'W1','W2','W3','W4','W5','W6','W7','W8',
    'W9','W10','W11','W12','W13','W14','W15','W16',
    'W17','W18','W19','W20','W21','W22','W23','W24',
  ],
  datasets: [
    {
      fill: true,
      label: 'Revenue',
      data: [
        47000, 30000, 38000, 25000, 21000, 35000,
        33000, 31000, 28000, 42000, 40000, 38000,
        43000, 36000, 38000, 37000, 35000, 25000,
        27000, 26000, 24000, 26000, 28000, 26000,
      ],
      borderColor: '#f97316',
      backgroundColor: 'transparent',
      borderWidth: 2.5,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#f97316',
    },
  ],
};

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

//  Orders data defined directly in Index — no controller needed
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

                <div  style={{ height: '300px', width: '100%' }}>
                    <div className="flex items-center justify-between px-6 py-3">
                        <h2 className="font-poppins text-2xl font-medium text-text-title">Sales Performance</h2>
                        <select className="bg-[#F5F6F7] px-2.5 py-1.5 rounded-sm" name="timeframe" id="timeframe">
                            <option value="7d">This year</option>
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>   
                        </select>
                    </div>
                    <Line options={options} data={data} plugins={[gradientPlugin]} />
                </div>

                {/* orders prop passed directly from Index */}
               <div className="bg-white rounded-2xl shadow-sm border  overflow-hidden w-full mt-20">
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
