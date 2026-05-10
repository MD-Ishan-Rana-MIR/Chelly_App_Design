'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    FiMenu,
    FiX,
    FiSearch,
    FiUser,
    FiShoppingCart,
} from 'react-icons/fi';

import MaxWidth from '../max-width/MaxWidth';
import { redirect } from 'next/navigation';

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'My Account / Sign Up', path: '/login' },
        { name: 'EBT Payment', path: '/ebt-payment' },
    ];

    return (
        <header className="w-full border-b border-gray-200 bgColor sticky top-0 z-50">
            <MaxWidth>
                <div className="flex items-center justify-between h-16">

                    {/* Left Side */}
                    <div className="flex items-center gap-10">

                        {/* Logo */}
                        <Link href="/">
                            <h1 className="text-2xl font-bold seconderyText cursor-pointer">
                                LOGO
                            </h1>
                        </Link>


                        {/* Desktop Menu */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {menus.map((menu) => (
                                <Link
                                    key={menu.name}
                                    href={menu.path}
                                    className="text-[15px] font-medium seconderyText transition"
                                >
                                    {menu.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-5">

                        {/* Search Button */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="seconderyText transition cursor-pointer"
                        >
                            {showSearch ? (
                                <FiX size={22} />
                            ) : (
                                <FiSearch size={22} />
                            )}
                        </button>

                        {/* User */}
                        <button onClick={()=>{redirect("/login")}} className="seconderyText transition cursor-pointer">
                            <FiUser size={22} />
                        </button>

                        {/* Cart */}
                        <button className="relative seconderyText transition cursor-pointer">
                            <FiShoppingCart size={22} />

                            {/* Cart Count */}
                            <span className="absolute -top-2 -right-2 primaryText bgSecondery text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                2
                            </span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="lg:hidden seconderyText cursor-pointer"
                        >
                            {mobileMenu ? (
                                <FiX size={26} />
                            ) : (
                                <FiMenu size={26} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${showSearch ? 'max-h-32 pb-4' : 'max-h-0'
                        }`}
                >
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white text-black"
                        />

                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiSearch size={20} />
                        </button>
                    </div>
                </div>
            </MaxWidth>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenu ? 'max-height: 400px' : 'max-h-0'
                    }`}
            >
                <div className="px-4 pb-5 pt-2 bgColor border-t border-gray-100 flex flex-col gap-4">
                    {menus.map((menu) => (
                        <Link
                            key={menu.name}
                            href={menu.path}
                            onClick={() => setMobileMenu(false)}
                            className="text-[15px] font-medium seconderyText transition"
                        >
                            {menu.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}