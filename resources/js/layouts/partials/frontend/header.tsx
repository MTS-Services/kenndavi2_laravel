import { Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    activePage?: string;
    subPage?: string;
    cartImage?: string | null;
}

function FrontendHeader({ activePage, subPage, cartImage }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth, cart_count } = usePage().props as any;
    const user = auth?.user;

    // Handle smooth scrolling for hash fragments
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#our-sauces') {
            // Small delay to ensure the page is fully loaded
            setTimeout(() => {
                const element = document.getElementById('our-sauces');
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }, 300); // Increased delay for Inertia navigation
        }
    }, []);

    return (
        <header className="bg-bg-header py-0.5 md:py-1 lg:py-2">
            <div className="container mx-auto px-4">
                {/* Desktop Layout */}
                <div className="hidden items-center justify-between md:flex">
                    {/* left Logo */}
                    <div className="flex transform flex-col items-center">
                        <Link
                            href="/"
                            className="text-text-white transition-colors hover:text-gray-300"
                        >
                            <img
                                src="/assets/images/logo.png"
                                alt="logo"
                                className="max-h-40 max-w-40"
                            />
                        </Link>
                    </div>

                    {/* center Navigation */}
                    <nav className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`border-b-2 font-bebas-neue text-4xl font-normal text-text-white transition-colors ${
                                activePage === 'home'
                                    ? 'border-white'
                                    : 'border-transparent hover:border-gray-400'
                            }`}
                        >
                            HOME
                        </Link>
                        <Link
                            href="/#our-sauces"
                            className={`border-b-2 font-bebas-neue text-4xl font-normal text-text-white uppercase transition-colors ${
                                activePage === 'sauce-recipes'
                                    ? 'border-white'
                                    : 'border-transparent hover:border-gray-400'
                            }`}
                            onClick={(e) => {
                                // If we're already on the home page, just scroll smoothly
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    const element =
                                        document.getElementById('our-sauces');
                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: 'smooth',
                                        });
                                    }
                                }
                                // If we're on another page, let Inertia handle navigation
                                // The useEffect will handle the smooth scroll after navigation
                            }}
                        >
                            Sauces
                        </Link>
                        <Link
                            href={route('frontend.sauce-recipes')}
                            className={`border-b-2 font-bebas-neue text-4xl font-normal text-text-white transition-colors ${
                                activePage === 'recipes'
                                    ? 'border-white'
                                    : 'border-transparent hover:border-gray-400'
                            }`}
                        >
                            Recipes
                        </Link>
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('frontend.cart.index')}
                            className="relative text-text-white transition-colors hover:text-gray-300"
                        >
                            <ShoppingCart size={24} />
                            {cart_count > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {cart_count > 99 ? '99+' : cart_count}
                                </span>
                            )}
                        </Link>

                        <Link
                            href={route('login')}
                            className="text-text-white transition-colors hover:text-gray-300"
                        >
                            {/* Show user image if authenticated, otherwise show user icon */}
                            {user ? (
                                <img
                                    src={user.image_url}
                                    alt="User"
                                    className="h-10 w-10 rounded-full border-2 border-text-buy-now"
                                />
                            ) : (
                                <User size={24} />
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex items-center justify-between md:hidden">
                    {/* Logo on left */}
                    <div className="flex transform flex-col items-center">
                        <Link
                            href="/"
                            className="text-text-white transition-colors hover:text-gray-300"
                        >
                            <img
                                src="/assets/images/logo.png"
                                alt="logo"
                                className="max-h-25 max-w-25"
                            />
                        </Link>
                    </div>

                    {/* Menu icon on right */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-text-white transition-colors hover:text-gray-300"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mt-4 border-t border-gray-600 py-4 md:hidden">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className={`border-b-2 border-text-white font-bebas-neue text-xl font-normal text-text-white transition-colors ${
                                    activePage === 'home'
                                        ? 'border-white'
                                        : 'border-transparent hover:border-gray-400'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                HOME
                            </Link>
                            <Link
                                href="/#our-sauces"
                                className={`font-bebas-neue text-xl font-normal text-text-white transition-colors ${
                                    activePage === 'sauce-recipes'
                                        ? 'border-b-2 border-text-white'
                                        : 'hover:border-gray-400'
                                }`}
                                onClick={(e) => {
                                    // If we're already on the home page, just scroll smoothly
                                    if (window.location.pathname === '/') {
                                        e.preventDefault();
                                        const element =
                                            document.getElementById(
                                                'our-sauces',
                                            );
                                        if (element) {
                                            element.scrollIntoView({
                                                behavior: 'smooth',
                                            });
                                        }
                                    }
                                    // Close mobile menu
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Sauces
                            </Link>
                            <Link
                                href={route('frontend.sauce-recipes')}
                                className={`border-b-2 border-text-white font-bebas-neue text-xl font-normal text-text-white transition-colors ${
                                    activePage === 'recipes'
                                        ? 'border-white'
                                        : 'border-transparent hover:border-gray-400'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Recipes
                            </Link>
                            <div className="flex items-center space-x-4 pt-4">
                                <Link
                                    href={route('frontend.cart.index')}
                                    className="relative text-text-white transition-colors hover:text-gray-300"
                                >
                                    <ShoppingCart size={24} />
                                    {cart_count > 0 && (
                                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                            {cart_count > 99
                                                ? '99+'
                                                : cart_count}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="text-text-white transition-colors hover:text-gray-300"
                                >
                                    <User size={24} />
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default FrontendHeader;
