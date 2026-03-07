import React, { use } from 'react';
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
    email: string;
    is_default: boolean;
}

interface BillingAddressProps {
    address: Address[] | null;
    userEmail: string;
    userPhone: string;
}

export default function BillingAddress({ address, userEmail, userPhone }: BillingAddressProps) {


    const {data, setData, post, processing, errors} = useForm({
        full_name: address?.[0]?.full_name || '',
        address_line1: address?.[0]?.address_line1 || '',
        address_line2: address?.[0]?.address_line2 || '',
        city: address?.[0]?.city || '',
        state: address?.[0]?.state || '',
        postal_code: address?.[0]?.postal_code || '',
        country: address?.[0]?.country || '',
        email: address?.[0]?.email || '',
        phone: address?.[0]?.phone || '',
        user_email: userEmail,
        user_phone: userPhone,
    });



    const handleBillingSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(data);

        post(route('user.billing-address'));
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
                            defaultValue={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {errors.full_name && <div className="text-red-500 text-sm">{errors.full_name}</div>}
                    </div>
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address
                    </label>
                    <Input
                        type="text"
                        defaultValue={data.address_line1}
                        onChange={(e) => setData('address_line1', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.address_line1 && <div className="text-red-500 text-sm">{errors.address_line1}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address Line 2 (Optional)
                    </label>
                    <Input
                        type="text"
                        defaultValue={data.address_line2}
                        onChange={(e) => setData('address_line2', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.address_line2 && <div className="text-red-500 text-sm">{errors.address_line2}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Region/State
                    </label>
                    <Input
                        type="text"
                        defaultValue={data.state}
                        onChange={(e) => setData('state', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.state && <div className="text-red-500 text-sm">{errors.state}</div>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            City
                        </label>
                        <Input
                            type="text"
                            defaultValue={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {errors.city && <div className="text-red-500 text-sm">{errors.city}</div>}
                    </div>
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Zip Code
                        </label>
                        <Input
                            type="text"
                            defaultValue={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {errors.postal_code && <div className="text-red-500 text-sm">{errors.postal_code}</div>}
                    </div>
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Country
                    </label>
                    <Input
                        type="text"
                        defaultValue={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.country && <div className="text-red-500 text-sm">{errors.country}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Email
                    </label>
                    <Input
                        type="email"
                        defaultValue={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <div>
                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Phone Number
                    </label>
                    <Input
                        type="tel"
                        defaultValue={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                </div>
                <div className="mt-6">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full md:w-auto px-8 py-3 cursor-pointer bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}