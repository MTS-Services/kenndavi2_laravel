import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    image_url: string;
}

interface AccountSettingProps {
    user: User;
}

export default function AccountSetting({ user }: AccountSettingProps) {
    const accountForm = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    const imageForm = useForm({
        image: null as File | null,
    });

    const handleAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        accountForm.post(route('user.account-settings.update'), {
            onSuccess: () => {
                // Form will reset automatically on success
            },
        });
    };

    const handleImageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (imageForm.data.image) {
            imageForm.post(route('user.image-update'), {
                onSuccess: () => {
                    imageForm.reset();
                    // Page will refresh with new image
                },
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            imageForm.setData('image', e.target.files[0]);
            handleImageSubmit(e as any);
        }
    };

    return (
        <div className="rounded-sm border border-text-gray-300">
            <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
                Account Setting
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 rounded-full bg-bg-white flex items-center justify-center overflow-hidden border-2 border-text-gray-300">
                        <img
                            src={user?.image_url || "/assets/images/user-dashboard/line-md_account.png"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-bg-white rounded-full p-2 shadow-md cursor-pointer">
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <Camera className="w-5 h-5 text-text-body" />
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                    <span className="mt-4 text-lg font-semibold text-text-title">{user?.name || 'User'}</span>
                </div>

                {/* Account Details Form */}
                <div className="lg:col-span-2 space-y-4">
                    <form onSubmit={handleAccountSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    value={accountForm.data.name}
                                    onChange={(e) => accountForm.setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                                {accountForm.errors.name && <div className="text-red-500 text-sm">{accountForm.errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    value={accountForm.data.email}
                                    onChange={(e) => accountForm.setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    disabled
                                />
                                {accountForm.errors.email && <div className="text-red-500 text-sm">{accountForm.errors.email}</div>}
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Phone Number
                                </label>
                                <Input
                                    type="tel"
                                    value={accountForm.data.phone}
                                    onChange={(e) => accountForm.setData('phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                                {accountForm.errors.phone && <div className="text-red-500 text-sm">{accountForm.errors.phone}</div>}
                            </div>
                        </div>
                        
                        {/* Save Button */}
                        <div className="mt-6">
                            <button 
                                type="submit" 
                                disabled={accountForm.processing}
                                className="w-full md:w-auto px-8 py-3 cursor-pointer bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase disabled:opacity-50"
                            >
                                {accountForm.processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}