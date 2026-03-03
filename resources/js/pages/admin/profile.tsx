import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Admin {
    id: number;
    name: string;
    email: string;
    phone: string;
    image_url: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    admin: Admin;
}

export default function EditAdmin({ admin }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        id: admin.id,
        name: admin.name || '',
        phone: admin.phone || '',
        email: admin.email || '',
        oldPassword: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.profile.update'));
        setIsEditing(false);
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleCancel() {
        setIsEditing(false);
        // Reset form data to original values
        setData('name', admin.name || '');
        setData('phone', admin.phone || '');
        setData('email', admin.email || '');
        setData('oldPassword', '');
        setData('password', '');
        setData('password_confirmation', '');
    }
    return (
        <AdminLayout activeSlug="profile">
            <div className="">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-poppins text-[40px] font-medium text-text-title">
                            Settings
                        </h2>
                        <p className="font-inter text-base font-normal text-text-body">
                            Manage your account settings and preferences
                        </p>
                    </div>
                    <button 
                        onClick={handleEdit}
                        className="flex cursor-pointer items-center gap-2 rounded-sm bg-bg-button px-6 py-3 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90"
                    >
                        {isEditing ? 'Editing...' : 'Edit'}
                    </button>
                </div>

                <div className="">
                    <div className="space-y-8 lg:col-span-2">
                        {/* Profile Form */}
                        <div className="rounded-2xl bg-bg-white p-8 shadow-sm">
                            <h3 className="mb-6 font-poppins text-2xl font-semibold text-text-title">
                                Personal Details
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="">
                                    {/* Name */}
                                    <div>
                                        <Label
                                            htmlFor="name"
                                            className="mt-3 block font-poppins text-base font-normal text-text-title"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            readOnly={!isEditing}
                                            className={`w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title! ${!isEditing ? 'bg-muted cursor-not-allowed' : ''}`}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Label
                                            htmlFor="email"
                                            className="mt-3 block font-poppins text-base font-normal text-text-title"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className={`w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title! ${!isEditing ? 'bg-muted cursor-not-allowed' : ''}`}
                                            readOnly={!isEditing}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <Label
                                            htmlFor="phone"
                                            className="mt-3 block font-poppins text-base font-normal text-text-title"
                                        >
                                            Phone
                                        </Label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            className={`w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title ${!isEditing ? 'bg-muted cursor-not-allowed' : ''}`}
                                            readOnly={!isEditing}
                                        />
                                        <InputError message={errors.phone} />
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <Label
                                            htmlFor="oldPassword"
                                            className="mt-3 block font-poppins text-base font-normal text-text-title"
                                        >
                                            Old Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type={showOldPassword ? 'text' : 'password'}
                                                name="oldPassword"
                                                value={data.oldPassword}
                                                onChange={(e) =>
                                                    setData(
                                                        'oldPassword',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title ${!isEditing ? 'bg-muted cursor-not-allowed' : ''} pr-12`}
                                                readOnly={!isEditing}
                                            />
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            )}
                                        </div>
                                        <InputError
                                            message={errors.oldPassword}
                                        />
                                    </div>
                                    
                                    {/* Password */}
                                    <div>
                                        <Label
                                            htmlFor="password"
                                            className="mt-3 block font-poppins text-base font-normal text-text-title"
                                        >
                                            New Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title ${!isEditing ? 'bg-muted cursor-not-allowed' : ''} pr-12`}
                                                readOnly={!isEditing}
                                            />
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            )}
                                        </div>
                                        <InputError
                                            message={errors.password}
                                        />
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <Label
                                            htmlFor="password_confirmation"
                                            className="mt-3 block font-poppins text-base font-normal text-text-title"
                                        >
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) =>
                                                    setData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title ${!isEditing ? 'bg-muted cursor-not-allowed' : ''} pr-12`}
                                                readOnly={!isEditing}
                                            />
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            )}
                                        </div>
                                        <InputError
                                            message={errors.password_confirmation}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                {isEditing && (
                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="rounded-lg border border-text-gray-300 px-6 py-3 font-medium text-text-title transition-colors hover:bg-bg-card cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-lg bg-bg-button px-6 py-3 font-medium text-text-white transition-opacity hover:opacity-90 cursor-pointer"
                                        >
                                            {processing ? 'Updating…' : 'Save Changes'}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
