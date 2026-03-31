import Logout from '@/components/logout';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, X, Home, Settings, FileText, LogOut, PlusCircle, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;
    const [userType, setUserType] = useState(auth.user.user_type);

    const NavItem = ({href, label, icon, onClick,}: {
        href?: string;
        label: string;
        icon?: React.ReactNode;
        onClick?: () => void;
    }) => {

        const currentUrl = usePage().url;
        const hrefPath = href ? new URL(href, window.location.origin).pathname : '';
        const isActive = hrefPath ? currentUrl.startsWith(hrefPath) : false;
        
        return (
            <Link
                href={href || '#'}
                onClick={onClick}
                className={cn(
                    'flex items-center gap-3 py-3 font-normal text-base font-aktiv-grotesk border-b border-text-body text-text-body hover:text-text-buy-now',
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
                    className="rounded-lg bg-bg-button p-2 text-white shadow-lg md:hidden"
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
                    'fixed top-0 left-0 z-50 h-full w-52 shadow-lg transition-transform bg-bg-white duration-300 md:relative md:translate-x-0 md:shadow-none',
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

                <nav className="space-y-1">
                    
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
                        href={route('user.account-settings')}
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
                <Logout show={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={confirmLogout} />  
            )}
        </div>
    );
}
