import { X, ChevronDown, Package, Truck, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

interface OrderDetailsProps {
    order: {
        id: string;
        buyer: string;
        amount: string;
        status: OrderStatus;
        date: string;
        email: string;
        phone: string;
        address: string;
        state?: string;
        city?: string;
        zipCode?: string;
        fullAddress?: string;
        items: Array<{
            name: string;
            quantity: number;
            price: string;
            image: string;
        }>;
        subtotal: string;
        shipping: string;
        tax: string;
        total: string;
    };
    onClose: () => void;
    onStatusChange?: (status: OrderStatus) => void;
}

const STATUS_OPTIONS: OrderStatus[] = ['Pending', 'Shipped', 'Delivered'];

export default function OrderDetails({ order, onClose, onStatusChange }: OrderDetailsProps) {
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleStatusChange = (status: OrderStatus) => {
        setCurrentStatus(status);
        setDropdownOpen(false);
        onStatusChange?.(status);
    };

    const getStatusStyle = (status: OrderStatus) => {
        switch (status) {
            case 'Pending':  return { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' };
            case 'Shipped':  return { bg: 'bg-sky-50',    text: 'text-sky-700',    border: 'border-sky-200' };
            case 'Delivered':return { bg: 'bg-emerald-50',text: 'text-emerald-700',border: 'border-emerald-200' };
        }
    };

    const statusStyle = getStatusStyle(currentStatus);

    // Parse address parts from the address string if specific fields not provided
    const state = order.state ?? '';
    const city = order.city ?? '';
    const zipCode = order.zipCode ?? '';
    const fullAddress = order.fullAddress ?? order.address;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div
                className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
                style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
            >
                {/* ── Header ── */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-normal text-text-title text-2xl font-poppins ">
                        Order Details: <span className="text-text-title">{order.id}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-5">

                    {/* ── Customer Information ── */}
                    <section>
                        <p className="text-text-body font-poppins font-normal text-sm mb-3">
                            Customer Information
                        </p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {/* Left column */}
                            <div className="space-y-1 col-span-1">
                                <p className="text-[28px] font-poppins font-medium text-text-title ">{order.buyer}</p>
                                <p className="text-xs font-poppins font-normal text-text-title">Email: {order.email}</p>
                                <p className="text-xs font-poppins font-normal text-text-title">Phone Number: {order.phone}</p>
                                <p className="text-xs font-poppins font-normal text-text-title">Order Date: {order.date}</p>
                            </div>
                            {/* Right column */}
                            <div className="space-y-1 col-span-1">
                                {state && <p className="text-sm font-poppins font-normal text-text-title">State: {state}</p>}
                                {city && <p className="text-sm font-poppins font-normal text-text-title">City: {city}</p>}
                                {zipCode && <p className="text-sm font-poppins font-normal text-text-title">ZIP Code: {zipCode}</p>}
                                {fullAddress && (
                                    <p className="text-sm font-poppins font-normal text-text-title">Full Address: {fullAddress}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ── Divider ── */}
                    <hr className="border-text-gray-300" />

                    {/* ── Items Ordered ── */}
                    <section>
                        <p className="text-base font-poppins font-normal text-text-title mb-3">Items Ordered</p>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-order-card-bg">
                                    <th className="text-left px-4 py-2.5 font-roboto font-normal text-text-title text-base">
                                        Product Name
                                    </th>
                                    <th className="text-left px-4 py-2.5 font-roboto font-normal text-text-title text-base">
                                        Quantity
                                    </th>
                                    <th className="text-right px-4 py-2.5 font-roboto font-normal text-text-title text-base">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-text-gray-300">
                                {order.items.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3.5 font-roboto font-normal text-text-title text-base">{item.name}</td>
                                        <td className="px-4 py-3.5 font-roboto font-normal text-text-title text-base">{item.quantity}</td>
                                        <td className="px-4 py-3.5 font-roboto font-normal text-text-title text-base text-right">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    {/* ── Divider ── */}
                    <hr className="border-text-gray-300" />

                    {/* ── Total ── */}
                    <div className="flex items-center justify-between">
                        <span className="font-roboto font-normal text-text-title text-xs">Total</span>
                        <span className="text-base font-medium text-text-green font-poppins">{order.total}</span>
                    </div>

                    {/* ── Divider ── */}
                    <hr className="border-text-gray-300" />

                    {/* ── Update Order Status ── */}
                    <section>
                        <p className="font-roboto font-normal text-text-title text-base mb-3">Update Order Status</p>
                        <div className="relative inline-block">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={`
                                    inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                                    transition-all duration-150 select-none
                                    ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}
                                    hover:opacity-80
                                `}
                            >
                                {currentStatus}
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute left-0 mt-1 w-40 bg-white border border-text-gray-300 rounded-xl shadow-lg overflow-hidden z-20">
                                    {STATUS_OPTIONS.map((s) => {
                                        const st = getStatusStyle(s);
                                        return (
                                            <button
                                                key={s}
                                                onClick={() => handleStatusChange(s)}
                                                className={`
                                                    w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2
                                                    hover:bg-gray-50 transition-colors
                                                    ${s === currentStatus ? 'bg-gray-50' : ''}
                                                    ${st.text}
                                                `}
                                            >
                                                {s === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                                                {s === 'Shipped' && <Truck className="w-3.5 h-3.5" />}
                                                {s === 'Delivered' && <CheckCircle className="w-3.5 h-3.5" />}
                                                {s}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}