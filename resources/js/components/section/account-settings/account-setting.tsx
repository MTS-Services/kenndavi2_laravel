import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

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
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        accountForm.post(route('user.account-settings.update'), {
            onSuccess: () => {
                toast.success('Account settings updated successfully');
                // Reset image field after successful submission
                accountForm.setData('image', null);
                setImagePreview(null);
                // Reload page to show updated image
                window.location.reload();
            },
            onError: (errors) => {
                console.log('Form submission errors:', errors);
                toast.error('Failed to update account settings');
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            accountForm.setData('image', file);
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
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
                            src={imagePreview || user?.image_url || "/assets/images/user-dashboard/line-md_account.png"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-bg-white rounded-full p-2 shadow-md cursor-pointer">
                            <Label htmlFor="image" className="cursor-pointer">
                                <Camera className="w-5 h-5 text-text-body" />
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </Label>
                        </div>
                    </div>
                    <span className="mt-4 text-lg font-semibold text-text-title">{user?.name || 'User'}</span>
                    {accountForm.data.image && (
                        <p className="mt-2 text-sm text-green-600">New image selected: {accountForm.data.image.name}</p>
                    )}
                </div>

                {/* Account Details Form */}
                <div className="lg:col-span-2 space-y-4">
                    <form onSubmit={handleAccountSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    value={accountForm.data.name}
                                    onChange={(e) => accountForm.setData('name', e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                                    placeholder="Your name"
                                />
                                {accountForm.errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{accountForm.errors.name}</p>
                                )}
                            </div>
                            
                            <div>
                                <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Email
                                </Label>
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
                                <Label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Phone Number
                                </Label>
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