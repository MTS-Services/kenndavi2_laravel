import React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';

interface Address {
    id: number;
    type: string;
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

interface ShippingAddressProps {
    addresses: Address[];
    userEmail: string;
    userPhone: string;
}

export default function ShippingAddress({ addresses, userEmail, userPhone }: ShippingAddressProps) {
    const shippingForm = useForm({
        full_name: '',
        company_name: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        email: userEmail || '',
        phone: userPhone || '',
    });

    // Pre-fill form with existing shipping address
    React.useEffect(() => {
        const shippingAddress = addresses.find(addr => addr.type === 'shipping');
        if (shippingAddress) {
            shippingForm.setData({
                full_name: shippingAddress.full_name,
                address_line1: shippingAddress.address_line1,
                address_line2: shippingAddress.address_line2 || '',
                city: shippingAddress.city,
                state: shippingAddress.state,
                postal_code: shippingAddress.postal_code,
                country: shippingAddress.country,
                phone: shippingAddress.phone,
                email: userEmail || '',
            });
        }
    }, [addresses, userEmail]);

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        shippingForm.post(route('user.shipping-address'), {
            onSuccess: () => shippingForm.reset(),
        });
    };

    return (
        <div className="rounded-sm border border-text-gray-300">
            <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
                Shipping Address
            </h2>
            <form onSubmit={handleShippingSubmit} className="space-y-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Name
                        </label>
                        <Input
                            type="text"
                            value={shippingForm.data.full_name}
                            onChange={(e) => shippingForm.setData('full_name', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {shippingForm.errors.full_name && <div className="text-red-500 text-sm">{shippingForm.errors.full_name}</div>}
                    </div>
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Company Name (Optional)
                        </label>
                        <Input
                            type="text"
                            value={shippingForm.data.company_name}
                            onChange={(e) => shippingForm.setData('company_name', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {shippingForm.errors.company_name && <div className="text-red-500 text-sm">{shippingForm.errors.company_name}</div>}
                    </div>
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address
                    </label>
                    <Input
                        type="text"
                        value={shippingForm.data.address_line1}
                        onChange={(e) => shippingForm.setData('address_line1', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {shippingForm.errors.address_line1 && <div className="text-red-500 text-sm">{shippingForm.errors.address_line1}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address Line 2 (Optional)
                    </label>
                    <Input
                        type="text"
                        value={shippingForm.data.address_line2}
                        onChange={(e) => shippingForm.setData('address_line2', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {shippingForm.errors.address_line2 && <div className="text-red-500 text-sm">{shippingForm.errors.address_line2}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Region/State
                    </label>
                    <Input
                        type="text"
                        value={shippingForm.data.state}
                        onChange={(e) => shippingForm.setData('state', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {shippingForm.errors.state && <div className="text-red-500 text-sm">{shippingForm.errors.state}</div>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            City
                        </label>
                        <Input
                            type="text"
                            value={shippingForm.data.city}
                            onChange={(e) => shippingForm.setData('city', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {shippingForm.errors.city && <div className="text-red-500 text-sm">{shippingForm.errors.city}</div>}
                    </div>
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Zip Code
                        </label>
                        <Input
                            type="text"
                            value={shippingForm.data.postal_code}
                            onChange={(e) => shippingForm.setData('postal_code', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {shippingForm.errors.postal_code && <div className="text-red-500 text-sm">{shippingForm.errors.postal_code}</div>}
                    </div>
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Country
                    </label>
                    <Input
                        type="text"
                        value={shippingForm.data.country}
                        onChange={(e) => shippingForm.setData('country', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {shippingForm.errors.country && <div className="text-red-500 text-sm">{shippingForm.errors.country}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Email
                    </label>
                    <Input
                        type="email"
                        value={shippingForm.data.email}
                        onChange={(e) => shippingForm.setData('email', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {shippingForm.errors.email && <div className="text-red-500 text-sm">{shippingForm.errors.email}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Phone Number
                    </label>
                    <Input
                        type="tel"
                        value={shippingForm.data.phone}
                        onChange={(e) => shippingForm.setData('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {shippingForm.errors.phone && <div className="text-red-500 text-sm">{shippingForm.errors.phone}</div>}
                </div>
                <div className="mt-6">
                    <button 
                        type="submit" 
                        disabled={shippingForm.processing}
                        className="w-full md:w-auto px-8 py-3 cursor-pointer bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase disabled:opacity-50"
                    >
                        {shippingForm.processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}