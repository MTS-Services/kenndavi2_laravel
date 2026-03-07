import React from 'react';
import { useForm } from '@inertiajs/react';
import { PasswordInput } from '@/components/ui/password-input';

export default function ChangePassword() {
    const passwordForm = useForm({
        oldPassword: '',
        password: '',
        password_confirmation: '',
    });

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.post(route('user.change-password'), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <div className="rounded-sm border border-text-gray-300">
            <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
               Change Password
            </h2>
            
            <div className="">
                <form onSubmit={handlePasswordSubmit} className="space-y-4 p-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <PasswordInput
                                value={passwordForm.data.oldPassword}
                                onChange={(e) => passwordForm.setData('oldPassword', e.target.value)}
                                className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now pr-10"
                                placeholder="Enter current password"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <PasswordInput
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now pr-10"
                                placeholder="Enter new password"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <PasswordInput
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now pr-10"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    {/* Change Password Button */}
                    <div className="mt-6">
                        <button 
                            type="submit" 
                            disabled={passwordForm.processing}
                            className="w-full md:w-auto px-8 py-3 cursor-pointer bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase disabled:opacity-50"
                        >
                            {passwordForm.processing ? 'Changing...' : 'Change Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}