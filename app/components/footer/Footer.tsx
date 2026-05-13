"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import MaxWidth from "../max-width/MaxWidth";
import Button from "../button/Button";
import Link from "next/link";

const Footer = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <footer className="bg-white border-t">

            <MaxWidth>
                <div className="py-12">

                    {/* NEWSLETTER */}
                    <div className="headerBgColor border border-green-100 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">

                        <div>
                            <h2 className="text-xl font-bold primaryText">
                                Get tasty deals in your inbox 🍕
                            </h2>
                            <p className="text-sm primaryText mt-1">
                                Subscribe for offers, discounts & new restaurants
                            </p>
                        </div>

                        <div className="flex w-full md:w-auto gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full md:w-72 px-4 py-3 border-0 rounded-lg focus:outline-none bg-white"
                            />

                            <Button
                                text="Subscribe"
                                py="15px"
                                px="12px"
                                color="#000"
                                backgroundColor="#fff"
                                textSize="14px"
                                borderRadius="10px"
                                fontWeight="600"
                                width="100%"
                            />
                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        {/* BRAND */}
                        <div>
                            <h2 className="text-2xl font-bold text-green-700">
                                FoodExpress 🍔
                            </h2>
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                Fast, fresh & delicious food delivered to your doorstep within minutes.
                            </p>
                        </div>

                        {/* LINKS */}
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>

                            <ul className="space-y-3 text-sm">

                                {[
                                    { name: "Home", path: "/" },
                                    { name: "Foods", path: "/foods" },
                                    { name: "Blogs", path: "/blogs" },
                                ].map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`relative transition font-medium ${isActive(item.path)
                                                    ? "text-green-700"
                                                    : "text-gray-500 hover:text-green-700"
                                                }`}
                                        >
                                            {item.name}

                                            {/* 🔥 Active Indicator */}
                                            {isActive(item.path) && (
                                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600 rounded-full" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SUPPORT */}
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>

                            <ul className="space-y-3 text-sm">

                                {[
                                    { name: "Help Center", path: "/help" },
                                    { name: "Contact", path: "/contact" },
                                    { name: "Privacy", path: "/privacy" },
                                    { name: "Terms", path: "/terms" },
                                ].map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`relative transition font-medium ${isActive(item.path)
                                                    ? "text-green-700"
                                                    : "text-gray-500 hover:text-green-700"
                                                }`}
                                        >
                                            {item.name}

                                            {isActive(item.path) && (
                                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600 rounded-full" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SOCIAL */}
                        <div>
                            <h3 className="font-semibold mb-4">Follow Us</h3>

                            <div className="flex gap-3">
                                {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
                                    (Icon, i) => (
                                        <div
                                            key={i}
                                            className="p-2 border rounded-full cursor-pointer transition hover:bg-green-100 hover:scale-110"
                                        >
                                            <Icon />
                                        </div>
                                    )
                                )}
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Stay connected for daily food deals 🍔
                            </p>
                        </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="border-t mt-10 pt-5 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} FoodExpress. Made with ❤️ for food lovers.
                    </div>

                </div>
            </MaxWidth>

        </footer>
    );
};

export default Footer;