"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    FiArrowLeft,
    FiHeart,
    FiMinus,
    FiPlus,
    FiShoppingCart,
    FiStar,
} from "react-icons/fi";

import ProductImageViewer from "@/app/components/img-view/Image360Viewer";
import MaxWidth from "@/app/components/max-width/MaxWidth";

const FoodDetails = () => {

    const router = useRouter();
    const params = useParams();

    const id = Number(params?.id);

    const [quantity, setQuantity] = useState(1);

    const foods = [
        {
            id: 1,
            title: "Pancake Combo",
            category: "breakfast",
            price: 12,
            rating: 4.9,
            image:
                "https://images.unsplash.com/photo-1525351484163-7529414344d8",
            description:
                "Soft fluffy pancakes served with fresh berries, maple syrup, creamy butter, and delicious toppings.",
        },
        {
            id: 2,
            title: "Chicken Burger",
            category: "lunch",
            price: 18,
            rating: 4.8,
            image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            description:
                "Juicy grilled chicken burger with fresh lettuce, cheese, crispy onions, and signature sauce.",
        },
    ];

    const food = foods.find((item) => item.id === id);

    if (!food) {
        return (
            <div className="h-[40vh] flex items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Food Not Found
                </h1>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-white to-green-50 py-10">

            <MaxWidth>

                {/* BACK BUTTON */}
                <button
                    onClick={() => router.back()}
                    className="
                        mb-10
                        group
                        flex items-center gap-3
                        px-4 py-2
                        rounded-full
                        bg-white
                        border border-gray-200
                        shadow-sm
                        hover:shadow-lg
                        hover:border-[#0b7211]
                        transition-all duration-300
                        cursor-pointer
                    "
                >
                    <span className="
                        flex items-center justify-center
                        w-9 h-9
                        rounded-full
                        bg-green-50
                        text-[#0b7211]
                        group-hover:bg-[#0b7211]
                        group-hover:text-white
                        transition-all duration-300
                    ">
                        <FiArrowLeft size={18} />
                    </span>

                    <span className="font-semibold text-gray-700 group-hover:text-[#0b7211]">
                        Go Back
                    </span>
                </button>

                {/* MAIN LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-x-10  justify-between">

                    {/* IMAGE SECTION */}
                    <div className="w-full lg:w-1/2 relative">

                        <div className="relative rounded-[35px] overflow-hidden">

                            <ProductImageViewer
                                images={[
                                    food.image,
                                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
                                    "https://images.unsplash.com/photo-1544025162-d76694265947",
                                ]}
                                alt={food.title}
                            />

                        </div>

                        {/* CATEGORY BADGE */}
                        <div className="absolute top-5 left-5 bg-white shadow-lg rounded-full px-5 py-2 text-[#0b7211] font-semibold capitalize">
                            {food.category}
                        </div>

                    </div>

                    {/* CONTENT SECTION */}
                    <div className="w-full lg:w-1/2">

                        {/* TITLE */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            {food.title}
                        </h1>

                        {/* RATING */}
                        <div className="flex items-center gap-3 mt-5">

                            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full font-semibold">

                                <FiStar className="fill-yellow-500" />

                                {food.rating}

                            </div>

                            <span className="text-gray-500">
                                120+ Happy Reviews
                            </span>

                        </div>

                        {/* PRICE */}
                        <h2 className="text-5xl font-bold text-[#0b7211] mt-8">
                            ${food.price}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 text-lg leading-8 mt-8">
                            {food.description}
                        </p>

                        {/* QUANTITY */}
                        <div className="mt-10">

                            <h3 className="font-semibold mb-4">
                                Quantity
                            </h3>

                            <div className="flex items-center border rounded-2xl overflow-hidden bg-white w-fit">

                                <button
                                    onClick={() =>
                                        setQuantity(q => q > 1 ? q - 1 : 1)
                                    }
                                    className="px-5 py-4 hover:bg-gray-100"
                                >
                                    <FiMinus />
                                </button>

                                <span className="px-8 font-bold text-lg">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity(q => q + 1)
                                    }
                                    className="px-5 py-4 hover:bg-gray-100"
                                >
                                    <FiPlus />
                                </button>

                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-5 mt-12">

                            <button className="flex-1 flex items-center justify-center gap-3 btnColor cursor-pointer hover:bg-[#095c0e] text-white py-4 rounded-2xl font-semibold shadow">

                                <FiShoppingCart size={22} />

                                Add To Cart

                            </button>

                            <button className="w-full sm:w-16 h-16 rounded-2xl cursor-pointer border flex items-center justify-center hover:text-red-500">

                                <FiHeart size={22} />

                            </button>

                        </div>

                    </div>

                </div>

            </MaxWidth>

        </section>
    );
};

export default FoodDetails;