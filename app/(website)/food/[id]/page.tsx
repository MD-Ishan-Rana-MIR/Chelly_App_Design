"use client";

export type CartItem = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    image: string;
    description: string;
    quantity: number;
};

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    FiArrowLeft,
    FiHeart,
    FiMinus,
    FiPlus,
    FiShoppingCart,
    FiStar,
} from "react-icons/fi";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import ProductImageViewer from "@/app/components/img-view/Image360Viewer";
import toast from "react-hot-toast";

const foods = [
    {
        id: 1,
        title: "Classic Beef Burger",
        category: "Fast Food",
        price: 8,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1550547660-d9450f859349",
        description:
            "Juicy grilled beef patty with fresh lettuce, tomato, cheese, and signature sauce.",
    },
    {
        id: 2,
        title: "Margherita Pizza",
        category: "Pizza",
        price: 10,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1601924582971-b9f1b5c4b6b3",
        description:
            "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves.",
    },
    {
        id: 3,
        title: "Chicken Biryani",
        category: "Rice",
        price: 12,
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        description:
            "Aromatic basmati rice cooked with spiced chicken and traditional herbs.",
    },
    {
        id: 4,
        title: "Chicken Biryani",
        category: "Rice",
        price: 12,
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        description:
            "Aromatic basmati rice cooked with spiced chicken and traditional herbs.",
    },
    {
        id: 5,
        title: "Chicken Biryani",
        category: "Rice",
        price: 12,
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        description:
            "Aromatic basmati rice cooked with spiced chicken and traditional herbs.",
    },
    {
        id: 6,
        title: "Chicken Biryani",
        category: "Rice",
        price: 12,
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        description:
            "Aromatic basmati rice cooked with spiced chicken and traditional herbs.",
    },
];

const FoodDetailsPage = () => {
    const router = useRouter();
    const params = useParams();

    const id = Number(params.id);

    const food = foods.find((item) => item.id === id);

    const [quantity, setQuantity] = useState(1);

    const [selectedPlan, setSelectedPlan] = useState("Daily");

    const plans = ["Daily", "Weekly", "Monthly"];

    if (!food) {
        return (
            <div className="flex h-[40vh] items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Food Not Found
                </h1>
            </div>
        );
    }

    const handleCart = (
        item: Omit<CartItem, "quantity">,
        qty: number = 1
    ) => {
        const cart: CartItem[] = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const existingIndex = cart.findIndex(
            (i) => i.id === item.id
        );

        if (existingIndex !== -1) {
            cart[existingIndex].quantity =
                (cart[existingIndex].quantity || 1) + qty;

            toast.success("Cart updated!");
        } else {
            cart.push({
                id: item.id,
                title: item.title,
                category: item.category,
                price: item.price,
                rating: item.rating,
                image: item.image,
                description: item.description,
                quantity: qty,
            });

            toast.success("Added to cart!");
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("cartUpdate"));
    };

    const handleWishlist = (item: { id: number }) => {
        const wishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const existingIndex = wishlist.findIndex(
            (i: { id: number }) => i.id === item.id
        );

        let updatedWishlist;

        if (existingIndex !== -1) {
            updatedWishlist = wishlist.filter(
                (i: { id: number }) => i.id !== item.id
            );

            toast.success("Removed from wishlist!");
        } else {
            updatedWishlist = [...wishlist, item];

            toast.success("Added to wishlist!");
        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        window.dispatchEvent(new Event("wishlistUpdate"));
    };

    return (
        <section className="bg-gray-50 py-10">
            <MaxWidth>

                {/* BACK BUTTON */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-3 rounded-full border bg-white px-5 py-3 shadow-sm transition hover:shadow-md"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-[#0b7211]">
                        <FiArrowLeft />
                    </span>

                    <span className="font-medium text-gray-700">
                        Back
                    </span>
                </button>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

                    {/* IMAGE SECTION */}
                    <div className="rounded-[32px] bg-white p-5 shadow-sm">

                        <div className="relative overflow-hidden rounded-3xl">
                            <ProductImageViewer
                                images={[
                                    food.image,
                                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
                                    "https://images.unsplash.com/photo-1544025162-d76694265947",
                                ]}
                                alt={food.title}
                            />

                            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b7211] shadow">
                                {food.category}
                            </span>
                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="rounded-[32px] bg-white p-6 md:p-10 shadow-sm">

                        {/* TITLE */}
                        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
                            {food.title}
                        </h1>

                        {/* RATING */}
                        <div className="mt-5 flex items-center gap-4">

                            <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                                <FiStar className="fill-yellow-500" />
                                {food.rating}
                            </div>

                            <p className="text-sm text-gray-500">
                                120+ reviews
                            </p>

                        </div>

                        {/* PRICE */}
                        <h2 className="mt-8 text-4xl font-bold text-[#0b7211] md:text-5xl">
                            ${food.price}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {food.description}
                        </p>

                        {/* QUANTITY */}
                        <div className="mt-8">

                            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                Quantity
                            </h3>

                            <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-200">

                                <button
                                    onClick={() =>
                                        setQuantity((q) =>
                                            q > 1 ? q - 1 : 1
                                        )
                                    }
                                    className="cursor-pointer px-5 py-4 transition hover:bg-gray-100"
                                >
                                    <FiMinus />
                                </button>

                                <span className="px-8 text-lg font-bold">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity((q) => q + 1)
                                    }
                                    className="cursor-pointer px-5 py-4 transition hover:bg-gray-100"
                                >
                                    <FiPlus />
                                </button>

                            </div>

                        </div>

                        {/* ORDER PLAN */}
                        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                            {/* HEADER */}
                            <div className="mb-5 flex items-center justify-between">

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Order Plan
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Choose your delivery schedule
                                    </p>
                                </div>

                                <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[#0b7211]">
                                    Flexible
                                </div>

                            </div>

                            {/* PLAN LIST */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                                {plans.map((plan) => (
                                    <button
                                        key={plan}
                                        onClick={() =>
                                            setSelectedPlan(plan)
                                        }
                                        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300

                                            ${selectedPlan === plan
                                                ? "border-[#0b7211] bg-green-50 shadow-md"
                                                : "border-gray-200 hover:border-[#0b7211]/40 hover:shadow-sm"
                                            }
                                        `}
                                    >

                                        {/* ACTIVE DOT */}
                                        <div
                                            className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border

                                                ${selectedPlan === plan
                                                    ? "border-[#0b7211]"
                                                    : "border-gray-300"
                                                }
                                            `}
                                        >
                                            {selectedPlan === plan && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-[#0b7211]" />
                                            )}
                                        </div>

                                        {/* TEXT */}
                                        <div>

                                            <h3 className="text-base font-semibold text-gray-900">
                                                {plan}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {plan === "Daily" &&
                                                    "Fresh delivery every day"}

                                                {plan === "Weekly" &&
                                                    "Best for weekly routine"}

                                                {plan === "Monthly" &&
                                                    "Save more with monthly plan"}
                                            </p>

                                        </div>

                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                            <button
                                onClick={() =>
                                    handleCart(food, quantity)
                                }
                                className="flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#0b7211] py-4 font-semibold text-white shadow-md transition hover:bg-green-700"
                            >
                                <FiShoppingCart size={20} />

                                Add To Cart
                            </button>

                            <button
                                onClick={() =>
                                    handleWishlist(food)
                                }
                                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl border transition hover:border-red-300 hover:text-red-500 sm:w-14"
                            >
                                <FiHeart size={20} />
                            </button>

                        </div>

                    </div>

                </div>

            </MaxWidth>
        </section>
    );
};

export default FoodDetailsPage;