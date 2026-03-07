import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import UserDashboardLayout from "@/layouts/user-dashboard-layout";
import AccountSetting from '@/components/section/account-settings/account-setting';
import ChangePassword from '@/components/section/account-settings/change-password';
import BillingAddress from '@/components/section/account-settings/billing-address';
import ShippingAddress from '@/components/section/account-settings/shipping-address';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    image_url: string;
}

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

interface PageProps {
    user: User;
    addresses: Address[];
    [key: string]: any;
}

export default function AccountSettings(){
    const { props } = usePage<PageProps>();
    const { user, addresses } = props;

    return(
        <UserDashboardLayout>
            <Head title="Account Settings" />
            
            <div className="container mx-auto px-4 pb-10 lg:pb-16">
                {/* Account Settings Section */}
                <AccountSetting user={user} />
            </div>

            {/* Change Password Section */}
            <div className="container mx-auto px-4 py-10 lg:py-16">
                <ChangePassword />
            </div>

            {/* Billing & Shipping Address Section */}
            <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Billing Address */}
                    <BillingAddress 
                        addresses={addresses} 
                        userEmail={user?.email || ''} 
                        userPhone={user?.phone || ''} 
                    />

                    {/* Shipping Address */}
                    <ShippingAddress 
                        addresses={addresses} 
                        userEmail={user?.email || ''} 
                        userPhone={user?.phone || ''} 
                    />
                </div>
            </div>
        </UserDashboardLayout>
    );
}
