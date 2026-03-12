import { Link } from '@inertiajs/react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

interface Props {
    activePage?: string;
    subPage?: string;
    cartImage?: string | null;
}

function FrontendHeader({ activePage, subPage, cartImage }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth, cart_count } = usePage().props as any;
    const user = auth?.user;

    return (
        <header className="bg-bg-header py-0.5 md:py-1 lg:py-2">
            <div className="container mx-auto px-4">
                 {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                     {/* left Logo */}
                    <div className="flex transform flex-col items-center">
                       <Link href="/" className="text-text-white transition-colors hover:text-gray-300">
                            <img src="/assets/images/logo.png" alt="logo" className="max-w-40 max-h-40" />
                        </Link>
                    </div>
               
                    {/* center Navigation */}
                    <nav className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`font-normal text-text-white text-4xl transition-colors font-bebas-neue border-b-2 ${
                                activePage === 'home'
                                    ? 'border-white'
                                    : 'border-transparent hover:border-gray-400'
                            }`}
                        >
                            HOME
                        </Link>
                        <Link
                            href="#our-sauces"
                            className={`font-normal text-text-white text-4xl transition-colors font-bebas-neue border-b-2 uppercase ${
                                activePage === 'sauce-recipes'
                                    ? 'border-white'
                                    : 'border-transparent hover:border-gray-400'
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById('our-sauces');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            Sauces
                        </Link>
                    </nav>

                   

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <Link href={route('frontend.cart.index')} className="relative text-text-white transition-colors hover:text-gray-300">
                            <ShoppingCart size={24} />
                            {cart_count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {cart_count > 99 ? '99+' : cart_count}
                                </span>
                            )}
                        </Link>
                        
                        <Link href={route('login')} className="text-text-white transition-colors hover:text-gray-300">
                            {/* Show user image if authenticated, otherwise show user icon */}
                            {user ? (
                                <img src={user.image_url} alt="User" className="w-10 h-10 rounded-full border-2 border-text-buy-now" />
                            ) : (
                                <User size={24} />
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex items-center justify-between">
                    {/* Logo on left */}
                    <div className="flex transform flex-col items-center">
                       <Link href="/" className="text-text-white transition-colors hover:text-gray-300">
                            <img src="/assets/images/logo.png" alt="logo" className="max-w-25 max-h-25" />
                        </Link>
                    </div>

                    {/* Menu icon on right */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-text-white hover:text-gray-300 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-gray-600">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className={`border-b-2 border-text-white font-normal text-text-white text-xl transition-colors font-bebas-neue ${
                                    activePage === 'home'
                                    ? 'border-white'
                                    : 'border-transparent hover:border-gray-400'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                HOME
                            </Link>
                            <Link
                                href="#our-sauces"
                                className={`font-normal text-text-white text-xl transition-colors font-bebas-neue ${
                                    activePage === 'sauce-recipes'
                                        ? 'border-b-2 border-text-white'
                                        : 'hover:border-gray-400'
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('our-sauces');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Sauces
                            </Link>
                            <div className="flex items-center space-x-4 pt-4">
                                <Link className="text-text-white transition-colors hover:text-gray-300">
                                    <ShoppingCart size={24} />
                                   
                                </Link>
                                <Link href={route('login')} className="text-text-white transition-colors hover:text-gray-300">
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
