import { AdminMenuContent } from '@/components/admin-menu-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Bell, Menu, X } from 'lucide-react';
import * as React from 'react';

interface AdminHeaderProps {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdminHeader({
    isCollapsed,
    setIsCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: AdminHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="relative z-50 border-b border-gray-200 bg-white">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2">
                        {/* Left side - Logo and mobile menu toggle */}
                        <div className="flex items-center">
                            {/* Mobile menu toggle button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset md:hidden"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                            <div className="shrink-0">
                                <img
                                    className="h-20 w-auto"
                                    src="/assets/images/logo.png"
                                    alt="Logo"
                                />
                            </div>
                        </div>

                        {/* Right side - Notifications and user menu */}
                        <div className="flex items-center space-x-4">
                            {/* Notifications button */}
                            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                                <Bell className="h-6 w-6" />
                            </button>

                            {/* User dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="inline-flex text-start items-center justify-center p-2 text-gray-600 "
                                    >
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage
                                                src="/assets/images/8.png"
                                                alt={auth.admin.name || 'Admin'}
                                            />
                                            <AvatarFallback className="bg-gray-300 text-gray-700">
                                                {getInitials(
                                                    auth.admin.name || 'Admin',
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="">
                                            <h2 className="font-poppins text-base font-medium text-text-title">
                                                Atik adnan
                                            </h2>
                                            <h2 className="font-poppins text-sm font-normal text-text-title">
                                                Admin
                                            </h2>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-48"
                                    align="end"
                                >
                                    <AdminMenuContent admin={auth.admin} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
