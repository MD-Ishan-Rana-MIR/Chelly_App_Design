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
import { redirect, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getToken } from '@/app/lib/token';
import ConfirmModal from '@/app/lib/alert/ConfirmModal';
import { useLogoutMutation } from '@/app/redux/authApi';
import toast from 'react-hot-toast';
import { errorMessage } from '@/app/lib/errorMsg';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useGetNotificationsQuery } from '@/app/redux/notificationApi';

export default function Navbar() {

    const token = getToken();




    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [open, setOpen] = useState(false);

    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Foods', path: '/foods' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'EBT Payment', path: '/ebt-payment' },
    ];

    const [logout, { isLoading }] = useLogoutMutation();

    const router = useRouter();


    const [openPopUpModal, setOpenPopUpModal] = useState(false);

    const handleLogoutConfirm = async () => {
        if (isLoading) return;

        try {

            const res = await logout({}).unwrap();

            if (res) {


                toast.success(res?.message || "Logout successful");

                setOpenPopUpModal(false);
                setOpen(false);

                localStorage.removeItem("auth");

                return router.push("/");
            }

        } catch (error) {
            errorMessage(error);
        }
    };

    const handleLogoutCancel = () => {
        if (isLoading) return;
        setOpenPopUpModal(false);
    };

    const handlePopUpModal = () => {
        setOpenPopUpModal(true);
        setOpen(false);
    }



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

    // search functonally 

    const [searchValue, setSearchValue] = useState<string>();

    const handleSearchNavigate = () => {
        if (!searchValue) return toast.error("Please enter value")
        router.push(`/search?value=${searchValue}`)
        return setShowSearch(false);
    }


    //=================================================== Notification Length =============================================
    const { data: notificationsData } = useGetNotificationsQuery({ page: 1, perPage: 10000000 });

    // 1. Safely extract the inner data array (fall back to an empty array if loading)
    const notificationsList = notificationsData?.data || [];

    // 2. Filter out only unread items safely
    const unreadNotifications = notificationsList.filter(
        (notification) => notification.read_at === null
    );

    // 3. Get the dynamic length of unread items on this page
    const unreadLength = unreadNotifications.length;


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

                        {/* Home */}
                        <Link
                            href="/"
                            className={`relative text-[15px] font-medium group transition ${pathname === "/" ? "text-[#0b7211]" : "seconderyText"
                                }`}
                        >
                            <span>Home</span>

                            <span
                                className={`absolute left-0 -bottom-1 h-0.5 bg-[#0b7211] transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </Link>

                        {/* Foods */}
                        <Link
                            href="/foods"
                            className={`relative text-[15px] font-medium group transition ${pathname.startsWith("/foods") ? "text-[#0b7211]" : "seconderyText"
                                }`}
                        >
                            <span>Foods</span>

                            <span
                                className={`absolute left-0 -bottom-1 h-0.5 bg-[#0b7211] transition-all duration-300 ${pathname.startsWith("/foods") ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </Link>

                        {/* Blogs */}
                        <Link
                            href="/blogs"
                            className={`relative text-[15px] font-medium group transition ${pathname.startsWith("/blogs") ? "text-[#0b7211]" : "seconderyText"
                                }`}
                        >
                            <span>Blogs</span>

                            <span
                                className={`absolute left-0 -bottom-1 h-0.5 bg-[#0b7211] transition-all duration-300 ${pathname.startsWith("/blogs") ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </Link>

                        {
                            !token && (
                                <Link
                                    href="/login"
                                    className={`relative text-[15px] font-medium group transition ${pathname.startsWith("/login") ? "text-[#0b7211]" : "seconderyText"
                                        }`}
                                >
                                    <span>My Account / Sign Up</span>

                                    <span
                                        className={`absolute left-0 -bottom-1 h-0.5 bg-[#0b7211] transition-all duration-300 ${pathname.startsWith("/login") ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                    />
                                </Link>
                            )
                        }

                        {/* EBT Payment */}
                        <Link
                            href="/ebt-payment"
                            className={`relative text-[15px] font-medium group transition ${pathname.startsWith("/ebt-payment") ? "text-[#0b7211]" : "seconderyText"
                                }`}
                        >
                            <span>EBT Payment</span>

                            <span
                                className={`absolute left-0 -bottom-1 h-0.5 bg-[#0b7211] transition-all duration-300 ${pathname.startsWith("/ebt-payment") ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </Link>

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

                        {
                            token && (<>
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
                                                onClick={() => handlePopUpModal()}
                                                className="w-full text-left px-4 cursor-pointer py-2 text-sm text-red-500 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>

                                        </div>
                                    )}

                                </div>
                            </>
                            )
                        }



                        {/* CART */}
                        <button
                            onClick={() => redirect("/cart")}
                            className="relative seconderyText cursor-pointer"
                        >
                            <FiShoppingCart size={22} />

                            {/* ✅ শুধুমাত্র cartCount ০ এর বেশি হলেই ব্যাজটি রেন্ডার হবে */}
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 btnColor text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>


                        {/* Notification */}

                        {
                            token && (
                                <button
                                    onClick={() => redirect("/notification")}
                                    className="relative seconderyText cursor-pointer"
                                >
                                    <IoIosNotificationsOutline size={26} />
                                    {unreadLength > 0 && (
                                        <span className="absolute -top-2 -right-2 btnColor text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                            {unreadLength}
                                        </span>
                                    )}
                                </button>
                            )
                        }

                        <div onClick={() => { redirect("/wishlist") }} className="relative cursor-pointer">
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
                    className={`overflow-hidden transition-all duration-300 ${showSearch ? "max-h-32 pb-4" : "max-h-0"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search food..."
                            value={searchValue || ""}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                        />

                        <button
                            onClick={() => { handleSearchNavigate() }}
                            className="bg-[#0b7211] text-white px-5 cursor-pointer py-3 rounded-xl hover:bg-green-700 transition"
                        >
                            Search
                        </button>
                    </div>
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
            <ConfirmModal
                open={openPopUpModal}
                title="Are you sure you want to logout?"
                description="You will need to login again to access your dashboard."
                confirmText={isLoading ? "Logging out..." : "Yes, Logout"}
                cancelText="Cancel"
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />

        </header >
    );
}