"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import MaxWidth from "../max-width/MaxWidth";
import Button from "../button/Button";

const Footer = () => {
    return (
        <footer className="bg-white border-t">

            <MaxWidth>
                <div className="py-12">

                    {/* 🔥 NEWSLETTER */}
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
                                className="
                                w-full md:w-72
                                px-4 py-3
                                border-0
                                rounded-lg
                                focus:outline-none
                                focus:ring-0

                                bg-white
                            "
                            />

                            {/* <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition">
                                Subscribe
                            </button> */}
                            <Button
                                // loading={isSubmitting}
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

                    {/* 🔥 MAIN FOOTER GRID */}
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
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="hover:text-green-700 cursor-pointer">Home</li>
                                <li className="hover:text-green-700 cursor-pointer">Menu</li>
                                <li className="hover:text-green-700 cursor-pointer">Restaurants</li>
                                <li className="hover:text-green-700 cursor-pointer">Offers</li>
                            </ul>
                        </div>

                        {/* SUPPORT */}
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="hover:text-green-700 cursor-pointer">Help Center</li>
                                <li className="hover:text-green-700 cursor-pointer">Contact</li>
                                <li className="hover:text-green-700 cursor-pointer">Privacy</li>
                                <li className="hover:text-green-700 cursor-pointer">Terms</li>
                            </ul>
                        </div>

                        {/* SOCIAL */}
                        <div>
                            <h3 className="font-semibold mb-4">Follow Us</h3>

                            <div className="flex gap-3">

                                <div className="p-2 border rounded-full cursor-pointer transition-transform duration-300 hover:bg-green-100 hover:scale-110">
                                    <FaFacebookF />
                                </div>

                                <div className="p-2 border rounded-full cursor-pointer transition-transform duration-300 hover:bg-green-100 hover:scale-110">
                                    <FaInstagram />
                                </div>

                                <div className="p-2 border rounded-full cursor-pointer transition-transform duration-300 hover:bg-green-100 hover:scale-110">
                                    <FaTwitter />
                                </div>

                                <div className="p-2 border rounded-full cursor-pointer transition-transform duration-300 hover:bg-green-100 hover:scale-110">
                                    <FaYoutube />
                                </div>

                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Stay connected for daily food deals 🍔
                            </p>
                        </div>

                    </div>

                    {/* 🔥 BOTTOM BAR */}
                    <div className="border-t mt-10 pt-5 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} FoodExpress. Made with ❤️ for food lovers.
                    </div>

                </div>
            </MaxWidth>

        </footer>
    );
};

export default Footer;