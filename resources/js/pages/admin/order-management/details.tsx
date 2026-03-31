import AdminLayout from '@/layouts/admin-layout';
import { Head, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin, Package, Phone, User, Mail } from 'lucide-react';

interface Order {
    id: string;
    order_number: string;
    order_status: string;
    payment_status: string;
    total: number;
    created_at: string;
    updated_at: string;
    order_address: {
        full_name: string;
        email: string;
        phone: string;
        address_line1: string;
        address_line2?: string;
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
    payment?: {
        id: string;
        payment_method: string;
        transaction_id?: string;
        payment_intent_id?: string;
        amount: number;
        currency: string;
        status: string;
        paid_at?: string;
        created_at: string;
    };
}

interface PageProps {
    order: Order;
    statusOptions: Array<{
        value: string;
        label: string;
        color: string;
    }>;
}

export default function OrderManagementDetails() {
    const { props } = usePage<PageProps>();
    const order = props.order;
    const statusOptions = props.statusOptions || [];

    if (!order) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-gray-500">Order not found</p>
                </div>
            </AdminLayout>
        );
    }

    const getStatusColor = (status: string) => {
        const statusOption = statusOptions.find((opt) => opt.value === status);
        return statusOption?.color || 'text-gray-500';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const primaryImage = (item: Order['order_items'][0]) => {
        const primaryImg = item.product?.images?.find((img) => img.is_primary === true);
        if (primaryImg?.image) {
            return `/storage/${primaryImg.image}`;
        }
        
        const firstImg = item.product?.images?.[0];
        if (firstImg?.image) {
            return `/storage/${firstImg.image}`;
        }
        
        return '/assets/images/products/placeholder.png';
    };

    return (
        <AdminLayout activeSlug={'order-management'}>
            <Head title="Order Details" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Order Details</h1>
                
                <a 
                    href={route('admin.om.index')}
                    className="inline-flex items-center px-4 py-2 bg-bg-button text-white rounded-md hover:bg-bg-button/90 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 " />
                    Back to Orders
                </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Order Number</p>
                            <p className="text-lg font-semibold text-gray-900">{order.order_number}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium text-gray-500">Order Status</p>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                                {statusOptions.find((opt) => opt.value === order.order_status)?.label || order.order_status}
                            </span>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium text-gray-500">Order Date</p>
                            <p className="text-lg font-semibold text-gray-900">{formatDate(order.created_at)}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Amount</p>
                            <p className="text-lg font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                        </div>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Name</p>
                                    <p className="text-gray-900">{order.order_address.full_name}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="text-gray-900">{order.order_address.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                    <p className="text-gray-900">{order.order_address.phone}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Shipping Address</p>
                                    <p className="text-gray-900">
                                        {order.order_address.address_line1}
                                        {order.order_address.address_line2 && <br />}
                                        {order.order_address.city}, {order.order_address.state} {order.order_address.zip_code}
                                        <br />
                                        {order.order_address.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.order_items?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img
                                                        src={primaryImage(item)}
                                                        alt={item.product_name}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{item.product_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(item.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {formatCurrency(item.price * item.quantity)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Information */}
                {order.payment && (
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                                <p className="text-gray-900 capitalize">{order.payment.payment_method}</p>
                            </div>
                            
                            <div>
                                <p className="text-sm font-medium text-gray-500">Payment Status</p>
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium`}>
                                    {order.payment.status}
                                </span>
                            </div>
                            
                            <div>
                                <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                                <p className="text-gray-900 break-all">{order.payment.transaction_id || 'N/A'}</p>
                            </div>
                            

                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mt-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Payment Intent ID</p>
                                <p className="text-gray-900 text-sm">{order.payment.payment_intent_id || 'N/A'}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">Payment Date</p>
                                <p className="text-gray-900">
                                    {order.payment.paid_at ? formatDate(order.payment.paid_at) : 'Not paid yet'}
                                </p>
                            </div>
                            
                            <div>
                                <p className="text-sm font-medium text-gray-500">Payment Created</p>
                                <p className="text-gray-900">{formatDate(order.payment.created_at)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Order Summary */}
                <div className="px-6 py-4">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium text-gray-900">{formatCurrency(order.total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-medium text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax:</span>
                                <span className="font-medium text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="text-lg font-semibold text-gray-900">Total:</span>
                                <span className="text-lg font-bold text-gray-900">{formatCurrency(order.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}