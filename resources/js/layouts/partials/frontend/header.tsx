import { Link } from '@inertiajs/react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
    activePage?: string;
    subPage?: string;
}

function FrontendHeader({ activePage, subPage }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-bg-header py-1.5 md:py-3 lg:py-6">
            <div className="container mx-auto px-4">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Left Navigation */}
                    <nav className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`border-b-2 border-text-white font-normal text-text-white text-4xl transition-colors font-bebas-neue ${
                                activePage === 'home'
                                    ? ''
                                    : 'hover:border-gray-400'
                            }`}
                        >
                            HOME
                        </Link>
                        <Link
                            href="/sauce-recipes"
                            className={`font-normal text-text-white text-4xl transition-colors font-bebas-neue ${
                                activePage === 'recipes'
                                    ? 'border-b-2 border-white'
                                    : 'hover:border-gray-400'
                            }`}
                        >
                            RECIPES
                        </Link>
                    </nav>

                    {/* Center Logo */}
                    <div className="flex transform flex-col items-center">
                       <img src="/assets/images/logo.png" alt="logo" className="max-w-[100px] max-h-[100px]" />
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <Link className="text-text-white transition-colors hover:text-gray-300">
                            <ShoppingCart size={24} />
                        </Link>
                        <Link className="text-text-white transition-colors hover:text-gray-300">
                            <User size={24} />
                        </Link>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex items-center justify-between">
                    {/* Logo on left */}
                    <div className="flex transform flex-col items-center">
                       <img src="/assets/images/logo.png" alt="logo" className="max-w-20 max-h-20" />
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
                                className={`border-b-2 border-text-white font-normal text-text-white text-2xl transition-colors font-bebas-neue ${
                                    activePage === 'home'
                                        ? ''
                                        : 'hover:border-gray-400'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                HOME
                            </Link>
                            <Link
                                href="/recipes"
                                className={`font-normal text-text-white text-2xl transition-colors font-bebas-neue ${
                                    activePage === 'recipes'
                                        ? 'border-b-2 border-text-white'
                                        : 'hover:border-gray-400'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                RECIPES
                            </Link>
                            <div className="flex items-center space-x-4 pt-4">
                                <Link className="text-text-white transition-colors hover:text-gray-300">
                                    <ShoppingCart size={24} />
                                </Link>
                                <Link className="text-text-white transition-colors hover:text-gray-300">
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
