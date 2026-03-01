import UserDashboardLayout from "@/layouts/user-dashboard-layout";
import { Camera, Eye } from 'lucide-react';

export default function AccountSettings(){
    return(
        <UserDashboardLayout>
            <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="rounded-sm border border-text-gray-300">
                    <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
                        Account Setting
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-40 h-40 rounded-full bg-bg-white flex items-center justify-center overflow-hidden border-2 border-text-gray-300  ">
                                <img
                                    src="/assets/images/user-dashboard/line-md_account.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-bg-white rounded-full p-2 shadow-md cursor-pointer">
                                    <Camera className="w-5 h-5 text-text-body" />
                                </div>
                            </div>
                            <span className="mt-4 text-lg font-semibold text-text-title">Kevin</span>
                        </div>

                        {/* Account Details Form */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Kevin"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Display name"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="customer@gmail.com"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue="+1-202-555-0118"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Region/State
                                    </label>
                                    <select
                                        defaultValue="Albama"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    >
                                        <option value="Albama">Albama</option>
                                        <option value="California">California</option>
                                        <option value="New York">New York</option>
                                        <option value="Texas">Texas</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        City
                                    </label>
                                    <select
                                        defaultValue="Montgomery"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    >
                                        <option value="Montgomery">Montgomery</option>
                                        <option value="Birmingham">Birmingham</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Huntsville">Huntsville</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="1000"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Road No. 13/x, House no. 1320/C, Flat No. 5D"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                            </div>
                            
                            {/* Save Button */}
                            <div className="mt-6">
                                <button className="w-full md:w-auto px-8 py-3 bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="rounded-sm border border-text-gray-300">
                    <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
                       Change Password
                    </h2>
                    
                    <div className="">
                        <div className="space-y-4 p-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now pr-10"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-body hover:text-text-title"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now pr-10"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-body hover:text-text-title"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now pr-10"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-body hover:text-text-title"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Change Password Button */}
                            <div className="mt-6">
                                <button className="w-full md:w-auto px-8 py-3 bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Billing & Shipping Address Section */}
            <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Billing Address */}
                    <div className="rounded-sm border border-text-gray-300">
                        <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
                            Billing Address
                        </h2>
                        <div className="space-y-4 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Kevin"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Gilbert"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Company Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Road No. 13/x, House no. 1320/C, Flat No. 5D"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Region/State
                                </label>
                                <select
                                    defaultValue="Select..."
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                >
                                    <option>Select...</option>
                                    <option value="Albama">Albama</option>
                                    <option value="California">California</option>
                                    <option value="New York">New York</option>
                                    <option value="Texas">Texas</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Montgomery"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="1000"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="customer@gmail.com"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    defaultValue="+1-202-555-0118"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div className="mt-6">
                                <button className="w-full md:w-auto px-8 py-3 bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="rounded-sm border border-text-gray-300">
                        <h2 className="font-public-sans text-sm font-medium text-text-title uppercase mb-8 border-b border-text-gray-300 p-4">
                            Shipping Address
                        </h2>
                        <div className="space-y-4 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Kevin"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Gilbert"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Company Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Road No. 13/x, House no. 1320/C, Flat No. 5D"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Region/State
                                </label>
                                <select
                                    defaultValue="Select..."
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                >
                                    <option>Select...</option>
                                    <option value="Albama">Albama</option>
                                    <option value="California">California</option>
                                    <option value="New York">New York</option>
                                    <option value="Texas">Texas</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Montgomery"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="1000"
                                        className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="customer@gmail.com"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-public-sans text-text-title font-normal mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    defaultValue="+1-202-555-0118"
                                    className="w-full px-3 py-2 border border-text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-buy-now"
                                />
                            </div>
                            <div className="mt-6">
                                <button className="w-full md:w-auto px-8 py-3 bg-text-buy-now text-text-white font-semibold font-public-sans hover:bg-text-buy-now/90 transition-colors uppercase">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    )
}