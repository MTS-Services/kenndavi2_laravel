import { Link } from '@inertiajs/react';
import React from 'react';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

const FrontendFooter: React.FC = () => {
    return (
        <footer className="bg-bg-footer text-text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Logo and Description */}
                    <div className="flex flex-col items-start">
                        <Link href={route('frontend.home')}>
                        <img src="/assets/images/logo.png" alt="Northside Logo" className="max-w-36 mb-4" />
                        </Link>
                        <p className="text-text-white text-xl font-normal font-inter mb-4">
                            Crafted with passion and premium ingredients to bring bold, unforgettable flavors to your table.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-text-white text-lg font-normal font-inter"><Facebook size={20} /></a>
                            <a href="https://www.instagram.com/kenndavi2/" target="_blank" rel="noopener noreferrer" className="text-text-white text-lg font-normal font-inter"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Column 2: Shop Categories */}
                    <div>
                        <h3 className="text-text-white text-xl font-medium font-inter mb-4">Shop Categories</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-text-white text-lg font-normal font-inter">Sweet BBQ Sauces</Link></li>
                            <li><Link href="#" className="text-text-white text-lg font-normal font-inter">Honey BBQ Sauces</Link></li>
                            <li><Link href="#" className="text-text-white text-lg font-normal font-inter">Teriyaki BBQ Sauces</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contacts */}
                    <div>
                        <h3 className="text-text-white text-xl font-medium font-inter mb-4">Contacts</h3>
                        <div className="flex items-center space-x-2 mb-2">
                            <Phone size={20} className="text-text-white text-lg font-normal font-inter" />
                            <span className="text-text-white text-lg font-normal font-inter">(202) 993-1664</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail size={20} className="text-text-white text-lg font-normal font-inter" />
                            <span className="text-text-white text-lg font-normal font-inter">info@northside.com</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-600 mt-8 pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-text-gray-300 text-sm font-normal font-public-sans mb-2 md:mb-0">
                            © {new Date().getFullYear()} The North Side. All rights reserved.
                        </p>
                        <div className="flex space-x-4 text-sm">
                            <Link href={route('frontend.terms-conditions')} className="text-text-white text-sm font-normal font-public-sans">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { FrontendFooter };
