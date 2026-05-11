"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    useParams,
    useRouter,
    useSearchParams,
} from "next/navigation";

import {
    FiArrowLeft,
    FiHeart,
    FiMinus,
    FiPlus,
    FiShoppingCart,
    FiStar,
} from "react-icons/fi";
import MaxWidth from "@/app/components/max-width/MaxWidth";

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
    {
        id: 3,
        title: "Chicken Burger",
        category: "lunch",
        price: 18,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description:
            "Juicy grilled chicken burger with fresh lettuce, cheese, crispy onions, and signature sauce.",
    },
    {
        id: 4,
        title: "Chicken Burger",
        category: "lunch",
        price: 18,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description:
            "Juicy grilled chicken burger with fresh lettuce, cheese, crispy onions, and signature sauce.",
    },
    {
        id: 5,
        title: "Chicken Burger",
        category: "lunch",
        price: 18,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description:
            "Juicy grilled chicken burger with fresh lettuce, cheese, crispy onions, and signature sauce.",
    },
    {
        id: 6,
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

const FoodDetailsPage = () => {

    const router = useRouter();

    // URL PARAMS
    const params = useParams();

    const category = params.category as string;



    // QUERY PARAMS
    const searchParams = useSearchParams();

    const title = searchParams.get("title");

    const price = searchParams.get("price");

    const id = Number(params.id);

    // FIND FOOD
    const food = foods.find((item) => item.id === id);

    const [quantity, setQuantity] = useState(1);

    console.log("id is", id)

    if (!food) {
        return (
            <div className="flex  h-[30vh] items-center justify-center">
                <h1 className="text-3xl  font-bold text-red-500">
                    Food Not Found
                </h1>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-white to-green-50 py-10">

            <MaxWidth>
                <div className="">

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

                        {/* ICON WRAPPER */}
                        <span
                            className="
            flex items-center justify-center
            w-9 h-9
            rounded-full
            bg-green-50
            text-[#0b7211]
            group-hover:bg-[#0b7211]
            group-hover:text-white
            transition-all duration-300
        "
                        >
                            <FiArrowLeft size={18} />
                        </span>

                        {/* TEXT */}
                        <span
                            className="
            font-semibold
            text-gray-700
            group-hover:text-[#0b7211]
            transition-all duration-300
        "
                        >
                            Go Back
                        </span>

                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                        {/* IMAGE */}
                        <div className="relative">

                            <div
                                className="
                                relative
                                w-full
                                h-[500px]
                                rounded-[35px]
                                overflow-hidden
                                shadow-2xl
                                group
                            "
                            >

                                <Image
                                    src={food.image}
                                    alt={food.title}
                                    fill
                                    className="
                                    object-cover
                                    group-hover:scale-110
                                    transition-all
                                    duration-700
                                "
                                />

                            </div>

                            {/* CATEGORY BADGE */}
                            <div
                                className="
                                absolute
                                top-5
                                left-5
                                bg-white
                                shadow-lg
                                rounded-full
                                px-5
                                py-2
                                text-[#0b7211]
                                font-semibold
                                capitalize
                            "
                            >
                                {category}
                            </div>

                        </div>

                        {/* CONTENT */}
                        <div>

                            {/* TITLE */}
                            <h1
                                className="
                                text-4xl
                                md:text-5xl
                                font-bold
                                text-gray-900
                                leading-tight
                            "
                            >
                                {title || food.title}
                            </h1>

                            {/* RATING */}
                            <div className="flex items-center gap-3 mt-5">

                                <div
                                    className="
                                    flex
                                    items-center
                                    gap-1
                                    bg-yellow-100
                                    text-yellow-600
                                    px-4
                                    py-2
                                    rounded-full
                                    font-semibold
                                "
                                >

                                    <FiStar className="fill-yellow-500" />

                                    {food.rating}

                                </div>

                                <span className="text-gray-500">
                                    120+ Happy Reviews
                                </span>

                            </div>

                            {/* PRICE */}
                            <div className="mt-8">

                                <h2
                                    className="
                                    text-5xl
                                    font-bold
                                    text-[#0b7211]
                                "
                                >
                                    ${price || food.price}
                                </h2>

                            </div>

                            {/* DESCRIPTION */}
                            <p
                                className="
                                text-gray-600
                                text-lg
                                leading-8
                                mt-8
                            "
                            >
                                {food.description}
                            </p>

                            {/* QUANTITY */}
                            <div className="mt-10">

                                <h3 className="font-semibold text-gray-800 mb-4">
                                    Quantity
                                </h3>

                                <div
                                    className="
                                    flex
                                    items-center
                                    w-fit
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    overflow-hidden
                                    bg-white
                                "
                                >

                                    <button
                                        onClick={() =>
                                            setQuantity(
                                                quantity > 1
                                                    ? quantity - 1
                                                    : 1
                                            )
                                        }
                                        className="
                                        px-5
                                        py-4
                                        hover:bg-gray-100
                                        transition-all
                                        duration-300
                                    "
                                    >

                                        <FiMinus />

                                    </button>

                                    <span className="px-8 font-bold text-lg">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        className="
                                        px-5
                                        py-4
                                        hover:bg-gray-100
                                        transition-all
                                        duration-300
                                    "
                                    >

                                        <FiPlus />

                                    </button>

                                </div>

                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-5 mt-12">

                                <button
                                    className="
                                    flex-1
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    btnColor
                                    hover:bg-[#095c0e]
                                    text-white
                                    py-4
                                    rounded-2xl
                                    font-semibold
                                    shadow
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                "
                                >

                                    <FiShoppingCart size={22} />

                                    Add To Cart

                                </button>

                                <button
                                    className="
                                    w-full
                                    sm:w-16
                                    h-16
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-700
                                    hover:bg-red-50
                                    hover:text-red-500
                                    transition-all
                                    cursor-pointer
                                    duration-300
                                "
                                >

                                    <FiHeart size={22} />

                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </MaxWidth>

        </section>
    );
};

export default FoodDetailsPage;