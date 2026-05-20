"use client";

export type CartItem = {
    id: number;
    title: string;
    category: string;
    price: number;
    // rating: number;
    image: string;
    description: string;
    quantity: number;
};

import React, { useEffect, useState } from "react";
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

export interface FoodItem {
    id: number;
    Title: string;
    BodyHTML: string;
    VariantPrice: number;
    ImageSrc: string;
    Category: string;
}



const FoodDetailsPage = () => {
    const router = useRouter();
    const params = useParams();


    const [products, setProducts] = useState<FoodItem[]>([]);



    // Fetch JSON
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/product.json");
                const data = await response.json();


                setProducts(data);
            } catch (error: unknown) {
                const msg = error instanceof Error ? error.message : String(error);
                toast.error(`Failed to fetch products. ${msg}`);
            }
        };
        fetchProducts();
    }, []);

    const id = Number(params.id);

    const food = products.find((item) => item.id === id);



    const [quantity, setQuantity] = useState(1);

    const [selectedPlan, setSelectedPlan] = useState("Weekly");

    const [price, setPrice] = useState<number | undefined>(undefined);

    if (food && price !== undefined) {
        setPrice(food.VariantPrice * quantity);
    }

    const plans = ["Weekly",];

    const handleCart = (
        item: FoodItem,
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
                title: item.Title,
                category: item.Category,
                price: Number(item.VariantPrice),
                // rating: item.rating,
                image: item.ImageSrc,
                description: item.BodyHTML,
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


    if (!food) {
        return (
            <div className="flex h-[40vh] items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Food Not Found
                </h1>
            </div>
        );
    }



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
                                    food.ImageSrc,
                                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
                                    "https://images.unsplash.com/photo-1544025162-d76694265947",
                                ]}
                                alt={food.Title}
                            />

                            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b7211] shadow">
                                {food.Category}
                            </span>
                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="rounded-[32px] bg-white p-6 md:p-10 shadow-sm">

                        {/* TITLE */}
                        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
                            {food.Title}
                        </h1>

                        {/* RATING */}
                        <div className="mt-5 flex items-center gap-4">

                            {/* <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                                <FiStar className="fill-yellow-500" />
                                {food.rating}
                            </div> */}

                            <p className="text-sm text-gray-500">
                                120+ reviews
                            </p>

                        </div>

                        {/* PRICE */}
                        <h2 className="mt-8 text-4xl font-bold text-[#0b7211] md:text-5xl">
                            ${food.VariantPrice.toFixed(2)}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {food.BodyHTML.replace(/<\/?[^>]+(>|$)/g, "")}
                        </p>

                        <div className=" flex flex-row items-center justify-between " >
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
                            <div className="mt-8">

                                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                    Price
                                </h3>

                                <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-200">

                                    < span className="px-8 text-lg font-bold">
                                        ${ (food.VariantPrice * quantity).toFixed(2) }
                                    </span>

                                </div>

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