import AdminLayout from '@/layouts/admin-layout';
import { Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        bio: 'Passionate admin with 5+ years of experience in managing systems and teams.',
        avatar: null as File | null,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                avatar: file,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Profile updated:', formData);
        setIsEditing(false);
    };

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
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 rounded-sm bg-bg-button px-6 py-3 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90"
                    >
                        
                       Save
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

                                    {/* Email */}
                                    <div>
                                        <label className="mb-2 block font-poppins text-base font-normal text-text-title">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            
                                            className="w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="mb-2 block font-poppins text-base font-normal text-text-title">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            
                                            className="w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title"
                                        />
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <label className="mb-2 block font-poppins text-base font-normal text-text-title">
                                            Old Password
                                        </label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            value={formData.oldPassword}
                                            onChange={handleInputChange}
                                            
                                            className="w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title"
                                        />
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <label className="mb-2 block font-poppins text-base font-normal text-text-title">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            
                                            className="w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title"
                                        />
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <label className="mb-2 block font-poppins text-base font-normal text-text-title">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            
                                            className="w-full rounded-lg border border-text-gray-300 px-4 py-3 text-text-title"
                                        />
                                    </div>


                        
                                </div>

                                {/* Submit Button */}
                                {isEditing && (
                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="rounded-lg border border-text-gray-300 px-6 py-3 font-medium text-text-title transition-colors hover:bg-bg-card"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-lg bg-bg-button px-6 py-3 font-medium text-text-white transition-opacity hover:opacity-90"
                                        >
                                            Save Changes
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
