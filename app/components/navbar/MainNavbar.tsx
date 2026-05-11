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
import { redirect, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {

    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const pathname = usePathname();

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Foods', path: '/foods' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'My Account / Sign Up', path: '/login' },
        { name: 'EBT Payment', path: '/ebt-payment' },
    ];

    return (
        <header className="w-full border-b border-gray-200 bgColor sticky top-0 z-50">

            <MaxWidth>

                <div className="flex items-center justify-between  py-2">

                    {/* LOGO */}
                    <Link href="/">
                        <Image width={1000} height={1000} src={"/logo/logo.png"} className=' w-20 h-18  ' alt='logo' />
                    </Link>

                    {/* DESKTOP MENU */}
                    <nav className="hidden lg:flex items-center gap-8">

                        {menus.map((menu) => {

                            // ✅ FIXED ACTIVE LOGIC (IMPORTANT)
                            const isActive =
                                menu.path === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(menu.path);
                            return (
                                <Link
                                    key={menu.name}
                                    href={menu.path}
                                    className={`relative text-[15px] font-medium group transition ${isActive ? "text-[#0b7211]" : "seconderyText"
                                        }`}
                                >

                                    {/* TEXT */}
                                    <span>
                                        {menu.name}
                                    </span>

                                    {/* ACTIVE / HOVER BAR */}
                                    <span
                                        className={`
                                            absolute left-0 -bottom-1 h-[2px]
                                            bg-[#0b7211]
                                            transition-all duration-300
                                            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                        `}
                                    />

                                </Link>
                            );
                        })}

                    </nav>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-5">

                        {/* SEARCH */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="seconderyText transition cursor-pointer"
                        >
                            {showSearch ? <FiX size={22} /> : <FiSearch size={22} />}
                        </button>

                        {/* USER */}
                        <Link href="/login">
                            <FiUser size={22} className="seconderyText cursor-pointer" />
                        </Link>

                        {/* CART */}
                        <button onClick={()=>{redirect("/cart")}} className="relative seconderyText cursor-pointer">
                            <FiShoppingCart size={22} />

                            <span className="absolute -top-2 -right-2 bg-[#0b7211] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                2
                            </span>

                        </button>

                        {/* MOBILE */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="lg:hidden seconderyText"
                        >
                            {mobileMenu ? <FiX size={26} /> : <FiMenu size={26} />}
                        </button>

                    </div>

                </div>

                {/* SEARCH BAR */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${showSearch ? 'max-h-32 pb-4' : 'max-h-0'
                        }`}
                >

                    <input
                        type="text"
                        placeholder="Search food..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

            </MaxWidth>

            {/* MOBILE MENU */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenu ? 'max-h-96' : 'max-h-0'
                    }`}
            >

                <div className="px-4 pb-5 pt-2 flex flex-col gap-4">

                    {menus.map((menu) => {

                        const isActive =
                            menu.path === "/"
                                ? pathname === "/"
                                : pathname.startsWith(menu.path);

                        return (
                            <Link
                                key={menu.name}
                                href={menu.path}
                                onClick={() => setMobileMenu(false)}
                                className={`text-[15px] font-medium transition ${isActive ? "text-[#0b7211]" : "seconderyText"
                                    }`}
                            >
                                {menu.name}
                            </Link>
                        );
                    })}

                </div>

            </div>

        </header>
    );
}