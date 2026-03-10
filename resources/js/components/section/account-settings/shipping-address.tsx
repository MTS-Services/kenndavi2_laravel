import React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

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
    email: string;
}

interface ShippingAddressProps {
    address: Address | null;
    userEmail: string;
    userPhone: string;
}

export default function ShippingAddress({ address, userEmail, userPhone }: ShippingAddressProps) {
    const {data, setData, post, processing, errors} = useForm({
        full_name: address?.full_name || '',
        address_line1: address?.address_line1 || '',
        address_line2: address?.address_line2 || '',
        city: address?.city || '',
        state: address?.state || '',
        postal_code: address?.postal_code || '',
        country: address?.country || '',
        email: address?.email || userEmail || '',
        phone: address?.phone || userPhone || '',
    });

   const handleShippingSubmit = (e: React.FormEvent) => {
           e.preventDefault();
   
           console.log(data);
   
           post(route('user.shipping-address'), {
               onSuccess: () => {
                   toast.success('Shipping address updated successfully');
               },
               onError: (errors) => {
                   console.log(errors);
                   toast.error('Failed to update shipping address');
               }
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
                        <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Name
                        </Label>
                        <Input
                            type="text"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {errors.full_name && <div className="text-red-500 text-sm">{errors.full_name}</div>}
                    </div>
                </div>
                <div>
                    <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address
                    </Label>
                    <Input
                        type="text"
                        value={data.address_line1}
                        onChange={(e) => setData('address_line1', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.address_line1 && <div className="text-red-500 text-sm">{errors.address_line1}</div>}
                </div>
                <div>
                    <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Address Line 2 (Optional)
                    </Label>
                    <Input
                        type="text"
                        value={data.address_line2}
                        onChange={(e) => setData('address_line2', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.address_line2 && <div className="text-red-500 text-sm">{errors.address_line2}</div>}
                </div>
                <div>
                    <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Region/State
                    </Label>
                    <Input
                        type="text"
                        value={data.state}
                        onChange={(e) => setData('state', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.state && <div className="text-red-500 text-sm">{errors.state}</div>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            City
                        </Label>
                        <Input
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {errors.city && <div className="text-red-500 text-sm">{errors.city}</div>}
                    </div>
                    <div>
                        <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Zip Code
                        </Label>
                        <Input
                            type="number"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                        />
                        {errors.postal_code && <div className="text-red-500 text-sm">{errors.postal_code}</div>}
                    </div>
                </div>
                <div>
                    <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Country
                    </Label>
                    <Input
                        type="text"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.country && <div className="text-red-500 text-sm">{errors.country}</div>}
                </div>
                <div>
                    <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Email
                    </Label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <div>
                    <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                        Phone Number
                    </Label>
                    <Input
                        type="tel"
                        value={data.phone}
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