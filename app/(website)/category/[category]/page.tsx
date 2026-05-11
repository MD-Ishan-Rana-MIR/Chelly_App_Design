"use client";

import React from "react";
import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import Button from "@/app/components/button/Button";

const foodMenus = [
    {
        id: 1,
        category: "breakfast",
        title: "Pancake Combo",
        price: "$12",
        image:
            "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    },
    {
        id: 2,
        category: "lunch",
        title: "Chicken Burger",
        price: "$18",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
        id: 3,
        category: "dinner",
        title: "Grilled Steak",
        price: "$30",
        image:
            "https://images.unsplash.com/photo-1544025162-d76694265947",
    },
    {
        id: 4,
        category: "weekly",
        title: "Healthy Weekly Meal",
        price: "$99",
        image:
            "https://images.unsplash.com/photo-1547592180-85f173990554",
    },
    {
        id: 5,
        category: "drink",
        title: "Fresh Orange Juice",
        price: "$8",
        image:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
    },
    {
        id: 6,
        category: "side",
        title: "French Fries",
        price: "$6",
        image:
            "https://images.unsplash.com/photo-1576107232684-1279f390859f",
    },
];

const CategoryPage = () => {

    // GET CATEGORY FROM URL PARAMS
    const params = useParams();

    const category = params?.category as string;

    // FILTER FOOD BY CATEGORY
    const filteredFoods = foodMenus.filter(
        (item) => item.category === category
    );

    return (
        <MaxWidth>
            <div className="py-12">

                {/* TITLE */}
                <div className="mb-10 text-center">

                    <h1 className="text-4xl font-bold text-gray-800 capitalize">
                        {category} Menu
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Fresh and delicious food items from our {category} category 🍽️
                    </p>

                </div>

                {/* FOOD MENU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredFoods.map((food) => (

                        <div
                            key={food.id}
                            className="
                            bg-white
                            rounded-3xl
                            overflow-hidden
                            shadow-md
                            hover:shadow-2xl
                            transition-all
                            duration-300
                            hover:-translate-y-2
                        "
                            onClick={() => { redirect(`/category/${category}/${food.id}`) }}
                        >

                            {/* IMAGE */}
                            <div className="relative h-60 w-full">

                                <Image
                                    src={food.image}
                                    alt={food.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-xl font-bold text-gray-800">
                                        {food.title}
                                    </h3>

                                    <span className="text-[#0b7211] font-bold">
                                        {food.price}
                                    </span>

                                </div>

                                <p className="text-gray-500 text-sm mt-3">
                                    Freshly prepared delicious food for your healthy lifestyle 🍽️
                                </p>

                                <div className=" my-3 " >
                                    <Button
                                        loading={false}
                                        text="View Details"
                                        py="12px"
                                        px="12px"
                                        color="#fff"
                                        backgroundColor="#0b7211"
                                        textSize="18px"
                                        borderRadius="10px"
                                        fontWeight="600"
                                        width="100%"
                                    />
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* NO DATA */}
                {filteredFoods.length === 0 && (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-bold text-gray-700">
                            No Food Found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            No products available in this category.
                        </p>

                    </div>

                )}

            </div>
        </MaxWidth>
    );
};

export default CategoryPage;