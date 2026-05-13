"use client";

import React, { useState } from "react";
import Image from "next/image";
import { redirect } from 'next/navigation';
import MaxWidth from "../max-width/MaxWidth";

const tabs = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Weekly Subscription",
    "Drinks",
];

const menuItems = [
    {
        id: 1,
        title: "Pancake Combo",
        category: "Breakfast",
        price: "$12",
        image:
            "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    },
    {
        id: 2,
        title: "Chicken Burger",
        category: "Lunch",
        price: "$18",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
        id: 3,
        title: "Grilled Steak",
        category: "Dinner",
        price: "$30",
        image:
            "https://images.unsplash.com/photo-1544025162-d76694265947",
    },
    {
        id: 4,
        title: "Healthy Weekly Meal",
        category: "Weekly Subscription",
        price: "$99",
        image:
            "https://images.unsplash.com/photo-1547592180-85f173990554",
    },
    {
        id: 5,
        title: "Fresh Orange Juice",
        category: "Drinks",
        price: "$8",
        image:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
    },
    {
        id: 6,
        title: "Omelette Toast",
        category: "Breakfast",
        price: "$10",
        image:
            "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
    },
    {
        id: 7,
        title: "Pizza Combo",
        category: "Lunch",
        price: "$22",
        image:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e",
    },
    {
        id: 8,
        title: "Cold Coffee",
        category: "Drinks",
        price: "$7",
        image:
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    },
];

const Menu = () => {
    const [activeTab, setActiveTab] = useState("Breakfast");

    const filteredItems = menuItems.filter(
        (item) => item.category === activeTab
    );

    return (
            <MaxWidth>

                {/* TITLE & DESCRIPTION */}
                <div className="text-center  mx-auto mb-14  ">

                    <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-[#0b7211] text-sm font-semibold mb-4">
                        Our Delicious Menu
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Fresh & Tasty Meals
                        <span className="text-[#0b7211]"> Delivered Daily</span>
                    </h1>

                    <p className="text-gray-600 mt-5 text-lg leading-8">
                        Explore our carefully crafted menu filled with fresh
                        ingredients, healthy recipes, and delicious flavors made
                        for breakfast, lunch, dinner, drinks, and weekly meal
                        plans.
                    </p>

                </div>

                {/* TABS */}
                <div className="flex flex-wrap justify-center gap-x-4 mb-14">

                    {tabs.map((tab) => (

                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 cursor-pointer rounded-xl text-sm font-semibold transition-all duration-300 border ${activeTab === tab
                                ? "bg-[#0b7211] text-white border-[#0b7211] shadow-lg scale-105"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-200"
                                }`}
                        >
                            {tab}
                        </button>

                    ))}

                </div>

                {/* MENU GRID */}
                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-3
                        gap-8
                        md:mb-16
                        mb-8
                    "
                >

                    {filteredItems.map((item) => (

                        <div
                            key={item.id}
                            className="
                                group
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                shadow-md
                                hover:shadow-2xl
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                border border-gray-100
                            "
                        >

                            {/* IMAGE */}
                            <div className="relative w-full h-60 overflow-hidden">

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="
                                        object-cover
                                        group-hover:scale-110
                                        transition-transform
                                        duration-500
                                    "
                                />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#0b7211] font-bold shadow">
                                    {item.price}
                                </div>

                            </div>

                            {/* CONTENT */}
                            <div className="p-6">

                                <div className="flex items-center justify-between gap-3">

                                    <h2 className="text-xl font-bold text-gray-800">
                                        {item.title}
                                    </h2>

                                </div>

                                <p className="text-gray-500 text-sm mt-3 leading-6">
                                    Delicious & freshly prepared food with rich
                                    flavors and premium ingredients 🍽️
                                </p>

                                <button
                                    onClick={() => { redirect(`/food/${item?.id}`) }}
                                    className="
                                        mt-6
                                        w-full
                                        bg-[#0b7211]
                                        hover:bg-[#095c0e]
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        transition-all
                                        duration-300
                                        hover:scale-[1.02]
                                        cursor-pointer
                                    "
                                >
                                    View Details
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </MaxWidth>
    );
};

export default Menu;