"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

import {
    FiArrowLeft,
    FiHeart,
    FiMinus,
    FiPlus,
    FiShoppingCart,
    FiStar,
    
} from "react-icons/fi";

import toast from "react-hot-toast";

import products from "@/public/product.json";
import MaxWidth from "@/app/components/max-width/MaxWidth";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    description: string;
};

const ProductDetailsPage = () => {

    const [selectedPlan, setSelectedPlan] = useState("Daily");

    const plans = [ "Weekly",];

    const router = useRouter();

    const params = useParams();

    const id = Number(params.id);

    const product: any = products.find(
        (item: any) => item.id === id
    );

    const [quantity, setQuantity] = useState(1);

    const [selectedImage, setSelectedImage] = useState(
        product?.image
    );

    if (!product) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <h1 className="text-3xl font-bold text-red-500">
                    Product Not Found
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

            cart[existingIndex].quantity += qty;

            toast.success("Cart Updated!");

        } else {

            cart.push({
                ...item,
                quantity: qty,
            });

            toast.success("Added To Cart!");
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("cartUpdate"));
    };

    const handleWishlist = (item: any) => {

        const wishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const exists = wishlist.find(
            (i: any) => i.id === item.id
        );

        let updatedWishlist = [];

        if (exists) {

            updatedWishlist = wishlist.filter(
                (i: any) => i.id !== item.id
            );

            toast.success("Removed From Wishlist!");

        } else {

            updatedWishlist = [...wishlist, item];

            toast.success("Added To Wishlist!");
        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        window.dispatchEvent(new Event("wishlistUpdate"));
    };

    return (
        <section className="bg-zinc-50 py-12 min-h-screen">

            <MaxWidth>

                {/* BACK BUTTON */}
                <button
                    onClick={() => router.back()}
                    className="
                        mb-8
                        flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-zinc-200
                        bg-white
                        px-5
                        py-3
                        shadow-sm
                        hover:shadow-md
                        transition
                        cursor-pointer
                    "
                >

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-[#0b7211]">
                        <FiArrowLeft />
                    </span>

                    <span className="font-medium text-gray-700">
                        Back
                    </span>

                </button>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* IMAGE SECTION */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        {/* MAIN IMAGE */}
                        <div className="relative w-full h-[500px] overflow-hidden rounded-3xl bg-zinc-100">

                            <Image
                                src={selectedImage}
                                alt={product.title}
                                fill
                                className="object-cover"
                            />

                        </div>

                        {/* THUMBNAILS */}
                        <div className="grid grid-cols-4 gap-4 mt-5">

                            {[1, 2, 3, 4].map((item) => (

                                <button
                                    key={item}
                                    onClick={() =>
                                        setSelectedImage(product.image)
                                    }
                                    className="
                                        relative
                                        h-24
                                        overflow-hidden
                                        rounded-2xl
                                        border-2
                                        border-transparent
                                        hover:border-[#0b7211]
                                        transition
                                        cursor-pointer
                                    "
                                >

                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm">

                        {/* CATEGORY */}
                        <div className="inline-flex px-4 py-2 rounded-full bg-green-100 text-[#0b7211] text-sm font-semibold mb-5">

                            {product.type || "Food"}

                        </div>

                        {/* TITLE */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">

                            {product.title}

                        </h1>

                        {/* RATING */}
                        <div className="flex items-center gap-4 mt-5">

                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

                                <FiStar className="fill-yellow-500" />

                                4.9

                            </div>

                            <p className="text-sm text-gray-500">
                                120+ Reviews
                            </p>

                        </div>

                        {/* PRICE */}
                        <div className="mt-8 flex items-end gap-4">

                            <h2 className="text-5xl font-bold text-[#0b7211]">

                                ${product.price}

                            </h2>

                            <span className="line-through text-zinc-400 text-xl">

                                $25

                            </span>

                        </div>

                        {/* DESCRIPTION */}
                        <p className="mt-8 text-gray-600 leading-8 text-lg">

                            {product.description}

                        </p>

                        {/* FEATURES */}
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
                                        onClick={() => setSelectedPlan(plan)}
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
                                               

                                                {plan === "Weekly" &&
                                                    "Best for weekly routine"}

                                                
                                            </p>

                                        </div>

                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* QUANTITY */}
                        <div className="mt-10">

                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Quantity
                            </h3>

                            <div className="flex items-center w-fit rounded-2xl overflow-hidden border border-zinc-200">

                                <button
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            prev > 1 ? prev - 1 : 1
                                        )
                                    }
                                    className="
                                        px-5
                                        py-4
                                        hover:bg-zinc-100
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    <FiMinus />
                                </button>

                                <span className="px-8 text-lg font-bold">

                                    {quantity}

                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                    className="
                                        px-5
                                        py-4
                                        hover:bg-zinc-100
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    <FiPlus />
                                </button>

                            </div>

                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">

                            <button
                                onClick={() =>
                                    handleCart(product, quantity)
                                }
                                className="
                                    flex-1
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    bg-[#0b7211]
                                    hover:bg-[#095c0e]
                                    text-white
                                    py-4
                                    rounded-2xl
                                    font-semibold
                                    shadow-md
                                    transition
                                    cursor-pointer
                                "
                            >

                                <FiShoppingCart size={20} />

                                Add To Cart

                            </button>

                            <button
                                onClick={() =>
                                    handleWishlist(product)
                                }
                                className="
                                    h-14
                                    sm:w-14
                                    w-full
                                    rounded-2xl
                                    border
                                    border-zinc-200
                                    flex
                                    items-center
                                    justify-center
                                    hover:border-red-300
                                    hover:text-red-500
                                    transition
                                    cursor-pointer
                                "
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

export default ProductDetailsPage;