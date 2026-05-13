'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
    FiMenu,
    FiX,
    FiSearch,
    FiUser,
    FiShoppingCart,
    FiHeart,
} from 'react-icons/fi';

import MaxWidth from '../max-width/MaxWidth';
import { redirect, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {

    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [open, setOpen] = useState(false);

    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Foods', path: '/foods' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'My Account / Sign Up', path: '/login' },
        { name: 'EBT Payment', path: '/ebt-payment' },
    ];

    // ✅ CLOSE ON OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [wishlistCount, setWishlistCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
            setWishlistCount(wishlist.length);
        };

        updateCount();

        window.addEventListener("wishlistUpdate", updateCount);

        return () => {
            window.removeEventListener("wishlistUpdate", updateCount);
        };
    }, []);


    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCart = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");

            const total = cart.reduce(
                (sum: number, item: { quantity: number }) => sum + (item.quantity || 1),
                0
            );

            setCartCount(total);
        };

        updateCart();

        window.addEventListener("cartUpdate", updateCart);

        return () => {
            window.removeEventListener("cartUpdate", updateCart);
        };
    }, []);

    return (
        <header className="w-full border-b border-gray-200 bgColor sticky top-0 z-50">

            <MaxWidth>

                <div className="flex items-center justify-between py-2">

                    {/* LOGO */}
                    <Link href="/">
                        <Image
                            width={1000}
                            height={1000}
                            src={"/logo/logo.png"}
                            className="w-20 h-18"
                            alt="logo"
                        />
                    </Link>

                    {/* DESKTOP MENU */}
                    <nav className="hidden lg:flex items-center gap-8">

                        {menus.map((menu) => {

                            const isActive =
                                menu.path === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(menu.path);

                            return (
                                <Link
                                    key={menu.name}
                                    href={menu.path}
                                    className={`relative text-[15px] font-medium group transition ${isActive
                                        ? "text-[#0b7211]"
                                        : "seconderyText"
                                        }`}
                                >
                                    <span>{menu.name}</span>

                                    <span
                                        className={`absolute left-0 -bottom-1 h-[2px] bg-[#0b7211] transition-all duration-300
                                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
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

                        {/* USER DROPDOWN */}
                        <div className="relative" ref={dropdownRef}>

                            {/* USER ICON (CLICK) */}
                            <button
                                onClick={() => setOpen((prev) => !prev)}
                                className="seconderyText cursor-pointer"
                            >
                                <FiUser size={22} />
                            </button>

                            {/* DROPDOWN */}
                            {open && (
                                <div className="absolute right-0 top-8 w-44 bg-white shadow-lg rounded-xl overflow-hidden z-50">

                                    <Link
                                        href="/profile"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        href="/orders"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        My Orders
                                    </Link>
                                    <Link
                                        href="/wishlist"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        My Wishlist
                                    </Link>

                                    <button
                                        onClick={() => setOpen(false)}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>

                        {/* CART */}
                        <button
                            onClick={() => redirect("/cart")}
                            className="relative seconderyText cursor-pointer"
                        >
                            <FiShoppingCart size={22} />

                            <span className="absolute -top-2 -right-2 btnColor text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </button>

                        <div onClick={()=>{redirect("/wishlist")}} className="relative cursor-pointer">
                            <FiHeart size={22} />

                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 btnColor cursor-pointer text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>

                        {/* MOBILE MENU */}
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
                                className={`text-[15px] font-medium transition ${isActive
                                    ? "text-[#0b7211]"
                                    : "seconderyText"
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