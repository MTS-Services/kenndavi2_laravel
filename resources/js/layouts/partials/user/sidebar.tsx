import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, X, Home, Settings, FileText, LogOut, PlusCircle, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
    const { url, component } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;
    const [userType, setUserType] = useState(auth.user.user_type);

    const NavItem = ({
        href,
        label,
        icon,
        onClick,
    }: {
        href?: string;
        label: string;
        icon?: React.ReactNode;
        onClick?: () => void;
    }) => {
        const isActive = url === href || component === href?.replace('/user/', '');
        
        return (
            <Link
                href={href || '#'}
                onClick={onClick}
                className={cn(
                    'flex items-center gap-3 py-3 font-normal text-base font-aktiv-grotesk border-b border-text-body text-text-body',
                    isActive 
                        ? 'text-text-buy-now' 
                        : 'text-text-title'
                )}
            >
                {icon}
                {label}
            </Link>
        );
    };

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const confirmLogout = () => {
        router.post(route('user.logout'));
    };

    return (
        <div className="relative z-50">
            {/* Mobile toggle */}
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg bg-orange-500 p-2 text-white shadow-lg md:hidden"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <h4 className="text-lg font-semibold text-gray-900">
                    Dashboard
                </h4>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 md:hidden"
                />
            )}

            <aside
                className={cn(
                    'fixed top-0 left-0 z-50 h-full w-72 shadow-lg transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                {/* Mobile Close Button */}
                <div className="flex items-center justify-between p-4 border-b md:hidden">
                    <span className="text-lg font-semibold text-gray-900">
                        Menu
                    </span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* User Profile Section */}

                <nav className="p-4 space-y-1">
                    
                    <NavItem
                        href={route('user.dashboard')}
                        label="Dashboard "
                        
                        
                    />
                    <NavItem
                        href={route('user.orders')}
                        label="Orders"
                    />
                    <NavItem
                        href={route('user.product-to-review')}
                        label="Product to review"
                    />
                    <NavItem
                        href="/account/account-settings"
                        label="Account"
                    />

                    {/* Logout */}
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="flex w-full items-center gap-3 py-3 font-normal text-base font-aktiv-grotesk hover:text-text-buy-now cursor-pointer"
                    >
                        Log out
                    </button>
                </nav>
            </aside>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
                    <div className="w-[92%] max-w-sm scale-100 transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all">
                        {/* Top Icon / Header Section */}
                        <div className="mb-4 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                                <LogOut className="h-7 w-7 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                                Confirm Logout
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                Are you sure you want to sign out of your
                                account? You'll need to login again to access
                                your data.
                            </p>
                        </div>

                        {/* Buttons Section */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 cursor-pointer rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 active:scale-95"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
