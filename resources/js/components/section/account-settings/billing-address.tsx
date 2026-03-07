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

interface BillingAddressProps {
    addresses: Address[];
    userEmail: string;
    userPhone: string;
}

export default function BillingAddress({ addresses, userEmail, userPhone }: BillingAddressProps) {
    const billingForm = useForm({
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

    // Pre-fill form with existing billing address
    React.useEffect(() => {
        const billingAddress = addresses.find(addr => addr.type === 'billing');
        if (billingAddress) {
            billingForm.setData({
                full_name: billingAddress.full_name,
                address_line1: billingAddress.address_line1,
                address_line2: billingAddress.address_line2 || '',
                city: billingAddress.city,
                state: billingAddress.state,
                postal_code: billingAddress.postal_code,
                country: billingAddress.country,
                phone: billingAddress.phone,
                email: userEmail || '',
            });
        }
    }, [addresses, userEmail]);

    const handleBillingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        billingForm.post(route('user.billing-address'), {
            onSuccess: () => billingForm.reset(),
        });
    };

    return (
        <div className="rounded-sm border border-text-gray-300">
            <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
                Billing Address
            </h2>
            <form onSubmit={handleBillingSubmit} className="space-y-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Name
                        </label>
                        <Input
                            type="text"
                            value={billingForm.data.full_name}
                            onChange={(e) => billingForm.setData('full_name', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {billingForm.errors.full_name && <div className="text-red-500 text-sm">{billingForm.errors.full_name}</div>}
                    </div>
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Company Name (Optional)
                        </label>
                        <Input
                            type="text"
                            value={billingForm.data.company_name}
                            onChange={(e) => billingForm.setData('company_name', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {billingForm.errors.company_name && <div className="text-red-500 text-sm">{billingForm.errors.company_name}</div>}
                    </div>
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address
                    </label>
                    <Input
                        type="text"
                        value={billingForm.data.address_line1}
                        onChange={(e) => billingForm.setData('address_line1', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {billingForm.errors.address_line1 && <div className="text-red-500 text-sm">{billingForm.errors.address_line1}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address Line 2 (Optional)
                    </label>
                    <Input
                        type="text"
                        value={billingForm.data.address_line2}
                        onChange={(e) => billingForm.setData('address_line2', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {billingForm.errors.address_line2 && <div className="text-red-500 text-sm">{billingForm.errors.address_line2}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Region/State
                    </label>
                    <Input
                        type="text"
                        value={billingForm.data.state}
                        onChange={(e) => billingForm.setData('state', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {billingForm.errors.state && <div className="text-red-500 text-sm">{billingForm.errors.state}</div>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            City
                        </label>
                        <Input
                            type="text"
                            value={billingForm.data.city}
                            onChange={(e) => billingForm.setData('city', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {billingForm.errors.city && <div className="text-red-500 text-sm">{billingForm.errors.city}</div>}
                    </div>
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Zip Code
                        </label>
                        <Input
                            type="text"
                            value={billingForm.data.postal_code}
                            onChange={(e) => billingForm.setData('postal_code', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {billingForm.errors.postal_code && <div className="text-red-500 text-sm">{billingForm.errors.postal_code}</div>}
                    </div>
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Country
                    </label>
                    <Input
                        type="text"
                        value={billingForm.data.country}
                        onChange={(e) => billingForm.setData('country', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {billingForm.errors.country && <div className="text-red-500 text-sm">{billingForm.errors.country}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Email
                    </label>
                    <Input
                        type="email"
                        value={billingForm.data.email}
                        onChange={(e) => billingForm.setData('email', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {billingForm.errors.email && <div className="text-red-500 text-sm">{billingForm.errors.email}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Phone Number
                    </label>
                    <Input
                        type="tel"
                        value={billingForm.data.phone}
                        onChange={(e) => billingForm.setData('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {billingForm.errors.phone && <div className="text-red-500 text-sm">{billingForm.errors.phone}</div>}
                </div>
                <div className="mt-6">
                    <button 
                        type="submit" 
                        disabled={billingForm.processing}
                        className="w-full md:w-auto px-8 py-3 cursor-pointer bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase disabled:opacity-50"
                    >
                        {billingForm.processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}