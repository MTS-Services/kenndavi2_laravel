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
import { AdminMenuContent } from '@/components/admin-menu-content';

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
    setIsMobileMenuOpen 
}: AdminHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="bg-white border-b border-gray-200 relative z-50">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2">
                        {/* Left side - Logo and mobile menu toggle */}
                        <div className="flex items-center">
                            {/* Mobile menu toggle button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                            <div className="shrink-0">
                                <img className="h-20 w-auto" src="/assets/images/logo.png" alt="Logo" />
                            </div>
                        </div>

                        {/* Right side - Notifications and user menu */}
                        <div className="flex items-center space-x-4">
                            {/* Notifications button */}
                            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Bell className="h-6 w-6" />
                            </button>

                            {/* User dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={'/'}
                                                alt={auth.admin.name}
                                            />
                                            <AvatarFallback className="bg-gray-300 text-gray-700">
                                                {getInitials(auth.admin.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48" align="end">
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