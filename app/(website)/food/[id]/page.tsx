"use client";

export type CartItem = {
    id: number;
    cartItemId: string;
    name: string;
    category: string;
    price: number;
    // rating: number;
    image: string;
    description: string;
    quantity: number;
    options?: Record<string, string>;
};

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    FiArrowLeft,
    FiHeart,
    FiMinus,
    FiPlus,
    FiShoppingCart,
} from "react-icons/fi";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import ProductImageViewer from "@/app/components/img-view/Image360Viewer";
import toast from "react-hot-toast";
import { useFoodByIdQuery } from "@/app/redux/foodApi";
import { FoodType } from '@/app/lib/type';
import FoodDetailsSkeleton from "@/app/components/skeleton/FoodDetailsSkeleton";




const FoodDetailsPage = () => {


    // State to track selected items for each category
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});





    const router = useRouter();
    const params = useParams();



    const id = Number(params.id);



    const { data, isLoading } = useFoodByIdQuery(id);

    const food: FoodType = data?.data;

    console.log("single food is", food)

    // Initialize defaults from API
    useEffect(() => {
        if (food?.options) {
            const initialOptions: Record<string, string> = {};
            food.options.forEach((group) => {
                if (group.values && group.values.length > 0) {
                    initialOptions[group.name] = group.values[0];
                }
            });
            setSelectedOptions(initialOptions);
        }
    }, [food]);



    const [quantity, setQuantity] = useState(1);

    const [selectedPlan, setSelectedPlan] = useState("Weekly");

    const selectedVariant = food?.variants?.find((variant) => {
        if (!food?.options) return false;
        return food.options.every((optionGroup) => {
            const position = optionGroup.position;
            const selectedValue = selectedOptions[optionGroup.name];
            const variantOptionKey = `option${position}`;
            return (variant as any)[variantOptionKey] === selectedValue;
        });
    });

    const basePrice = selectedVariant && selectedVariant.price 
        ? Number(selectedVariant.price) 
        : Number(food?.price || 0);
        
    const totalPrice = basePrice * quantity;

    const plans = ["Weekly"];

    const handleCart = (
        item: FoodType,
        qty: number = 1
    ) => {
        const cart: CartItem[] = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const options = {
            ...selectedOptions,
            Plan: selectedPlan
        };

        const optionsKey = Object.values(options).join("-");
        const cartItemId = `${item.id}-${optionsKey}`;

        const existingIndex = cart.findIndex(
            (i) => i.cartItemId === cartItemId
        );

        if (existingIndex !== -1) {
            cart[existingIndex].quantity =
                (cart[existingIndex].quantity || 1) + qty;

            toast.success("Cart updated!");
        } else {
            cart.push({
                id: item.id,
                cartItemId: cartItemId,
                name: (item as any).name || "",
                category: (item as any).category?.name || (item as any).category || "",
                price: basePrice, // Use variant base price
                // rating: item.rating,
                image: (item as any).image || "",
                description: (item as any).description || "",
                quantity: qty,
                options: options
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


    if (isLoading) {
        return (
            <FoodDetailsSkeleton />
        )
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
                    <div className="rounded-4xl bg-white p-5 shadow-sm">

                        <div className="relative overflow-hidden rounded-3xl">
                            {(() => {
                                const allImages = food?.image ? [food.image] : [];
                                if (food?.images && food.images.length > 0) {
                                    food.images.forEach((img: any) => {
                                        if (img.image_path) {
                                            allImages.push(img.image_path);
                                        }
                                    });
                                }
                                
                                return (
                                    <ProductImageViewer
                                        images={allImages}
                                        alt={food?.name}
                                    />
                                );
                            })()}

                            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b7211] shadow">
                                {food?.category?.name}
                            </span>
                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="rounded-4xl bg-white p-6 md:p-10 shadow-sm">

                        {/* TITLE */}
                        <h1 className="text-3xl font-bold text-[#0b7211] md:text-5xl">
                            {food?.name}
                        </h1>

                        {/* RATING */}
                        <div className="mt-5 flex items-center gap-4">

                            {/* <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                                <FiStar className="fill-yellow-500" />
                                {food.rating}
                            </div> */}

                            {/* <p className="text-sm text-gray-500">
                                120+ reviews
                            </p> */}

                        </div>

                        {/* PRICE */}
                        <h2 className="mt-8 text-4xl font-bold text-[#0b7211] md:text-5xl">
                            ${food?.price}
                        </h2>

                        <div className="p-6 max-w-xl bg-white rounded-xl space-y-6 select-none font-sans">

                            {/* --- Dynamic Options Loop --- */}
                            <div className="space-y-6">
                                {
                                    food?.options && food?.options.map((optionGroup) => {
                                        const currentSelection = selectedOptions[optionGroup.name];
                                        const setSelection = (val: string) => {
                                            setSelectedOptions(prev => ({
                                                ...prev,
                                                [optionGroup.name]: val
                                            }));
                                        };

                                        return (
                                            <div key={optionGroup.id}>
                                                <h3 className="text-[#599A55] text-base font-normal mb-3 capitalize">
                                                    {optionGroup.name}
                                                </h3>
                                                <div className="flex flex-wrap gap-3">
                                                    {optionGroup.values.map((value) => {
                                                        const isSelected = currentSelection === value;

                                                        // Subtle visual distinction for extra charge items like "Steak (+$3.00)"
                                                        const hasExtraCharge = value.includes("+$");

                                                        return (
                                                            <button
                                                                key={value}
                                                                onClick={() => setSelection(value)}
                                                                className={`px-6 py-2.5 text-sm rounded-full border-2 transition-all duration-300 ${isSelected
                                                                    ? 'bg-[#0b7211] border-[#0b7211] text-white font-semibold shadow-md shadow-[#0b7211]/30 scale-105'
                                                                    : 'bg-white border-gray-200 text-gray-700 hover:border-[#0b7211] hover:text-[#0b7211] hover:bg-[#0b7211]/5'
                                                                    }`}
                                                            >
                                                                {value}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <p
                            className="mt-6 text-lg leading-8 text-gray-600 wrap-break-word whitespace-normal"
                            dangerouslySetInnerHTML={{ __html: food?.description || '' }}
                        />

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

                                    <span className="px-8 text-lg font-bold">
                                        ${totalPrice.toFixed(2)}
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