"use client";

import React, { useState } from "react";
import Image from "next/image";

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
        <div className=" py-10">

            <div className="">

                

                {/* TABS */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">

                    {tabs.map((tab) => (

                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 cursor-pointer rounded-md text-sm font-medium transition-all duration-300 border ${activeTab === tab ? "bg-[#0b7211] text-white border-[#0b7211] shadow-lg scale-105"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-green-50"}`}>
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
            xl:grid-cols-4
            gap-8
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
                shadow-sm
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-2
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

                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <div className="flex items-center justify-between">

                                    <h2 className="text-xl font-bold text-gray-800">
                                        {item.title}
                                    </h2>

                                    <span className="text-[#0b7211] font-bold">
                                        {item.price}
                                    </span>

                                </div>

                                <p className="text-gray-500 text-sm mt-2">
                                    Delicious & freshly prepared food for you 🍽️
                                </p>

                                <button
                                    className="
                    mt-5
                    w-full
                    bg-[#0b7211]
                    hover:bg-[#095c0e]
                    text-white
                    py-3
                    rounded-xl
                    font-medium
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    cursor-pointer
                  "
                                >
                                    Add To Cart
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Menu;