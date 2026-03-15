import { X, ChevronDown, Package } from 'lucide-react';
import { useState } from 'react';
import type { StatusOption } from '@/pages/admin/order-management/index';

interface OrderDetailsProps {
    order: {
        id: string;
        order_number: string;
        buyer: string;
        amount: string;
        status: string;
        date: string;
        email: string;
        phone: string;
        address: string;
        
        subtotal: string;
        shipping: string;
        tax:      string;
        total:    string;
        order_items: Array<{ name: string; quantity: number; price: string; image: string }>;

    };
    statusOptions: StatusOption[];
    onClose: () => void;
    onStatusChange?: (value: string) => void;
}



export default function OrderDetails({ order, statusOptions, onClose, onStatusChange }: OrderDetailsProps) {
    const [currentValue, setCurrentValue] = useState(order.status);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const currentOpt  = statusOptions.find((o) => o.value === currentValue) ?? statusOptions[0];

    const handleStatusChange = (opt: StatusOption) => {
        setCurrentValue(opt.value);
        setDropdownOpen(false);
        onStatusChange?.(opt.value);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
                style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-poppins text-2xl font-normal text-text-title">
                        Order Details: <span>{order.order_number}</span>
                    </h2>
                    <button onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 cursor-pointer">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-5">

                    {/* Customer Information */}
                    <section>
                        <p className="text-text-body font-poppins font-normal text-sm mb-3">Customer Information</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="space-y-1">
                                <p className="text-[28px] font-poppins font-medium text-text-title">{order.buyer}</p>
                                <p className="text-xs font-poppins font-normal text-text-title">Email: {order.email}</p>
                                <p className="text-xs font-poppins font-normal text-text-title">Phone Number: {order.phone}</p>
                                <p className="text-xs font-poppins font-normal text-text-title">Order Date: {order.date}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-poppins font-normal text-text-title">Address: {order.address}</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-text-gray-300" />

                    {/* Items Ordered */}
                    <section>
                        <p className="text-base font-poppins font-normal text-text-title mb-3">Items Ordered</p>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-order-card-bg">
                                    {['Product Name', 'Quantity', 'Price'].map((h, i) => (
                                        <th key={h} className={`px-4 py-2.5 font-roboto font-normal text-text-title text-base ${i === 2 ? 'text-right' : 'text-left'}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-text-gray-300">
                                {order.order_items.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50">
                                        <td className="px-4 py-3.5 font-roboto font-normal text-text-title text-base">{item.name}</td>
                                        <td className="px-4 py-3.5 font-roboto font-normal text-text-title text-base">{item.quantity}</td>
                                        <td className="px-4 py-3.5 font-roboto font-normal text-text-title text-base text-right">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <hr className="border-text-gray-300" />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <span className="font-roboto font-normal text-text-title text-xs">Total</span>
                        <span className="text-base font-medium text-text-green font-poppins">{order.total}</span>
                    </div>

                    <hr className="border-text-gray-300" />

                    {/* Update Order Status — fully enum-driven */}
                    <section>
                        <p className="font-roboto font-normal text-text-title text-base mb-3">Update Order Status</p>
                        <div className="relative inline-block">
                            <button
                                onClick={() => setDropdownOpen((v) => !v)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all select-none hover:opacity-80 cursor-pointer`}
                            >
                                {currentOpt.label}
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute left-0 mt-1 w-44 bg-white border border-text-gray-300 rounded-xl shadow-lg overflow-hidden z-20">
                                    {statusOptions.map((opt) => {
                                        return (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleStatusChange(opt)}
                                                className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer`}
                                            >
                                                {/* {opt.value ?? <Package className="w-3.5 h-3.5" />} */}
                                                {opt.label}
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