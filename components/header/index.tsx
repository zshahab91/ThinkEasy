import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const Logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <header className="bg-white shadow-md w-full">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-8">
                <div className="text-2xl font-bold text-blue-500">
                    <Link href="/" >Think Easy</Link>
                </div>
                <nav className="hidden md:flex space-x-8">
                    <span className="text-gray-600 hover:text-blue-500">
                        <a onClick={Logout} className="text-gray-600 hover:text-blue-500">
                            Logout
                        </a>
                    </span>
                </nav>
                <button
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? (
                        <XIcon className="h-6 w-6" />
                    ) : (
                        <MenuIcon className="h-6 w-6" />
                    )}
                </button>
            </div>
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-white shadow-md">
                    <ul className="flex flex-col space-y-4 py-4 px-6">
                        <li>
                            <Link href="/" className="text-gray-600 hover:text-blue-500">
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;

