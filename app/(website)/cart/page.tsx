"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import MaxWidth from "@/app/components/max-width/MaxWidth";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

const AddToCartPage = () => {
    const [cart, setCart] = useState<CartItem[]>([
        {
            id: 1,
            title: "Chicken Burger",
            price: 18,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            quantity: 1,
        },
        {
            id: 2,
            title: "Pancake Combo",
            price: 12,
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
            quantity: 2,
        },
    ]);

    // INCREASE
    const increaseQty = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // DECREASE
    const decreaseQty = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // REMOVE
    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // TOTAL PRICE
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <section className=" min-h-[80vh] py-10">

            <MaxWidth>

                {/* TITLE */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10">
                    Your Cart 🛒
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

                    {/* CART ITEMS */}
                    <div className="space-y-6">

                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-lg">
                                Your cart is empty.
                            </p>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-md"
                                >

                                    {/* IMAGE */}
                                    <div className="w-24 h-24 relative rounded-xl overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* DETAILS */}
                                    <div className="flex-1">

                                        <h2 className="text-lg font-bold text-gray-800">
                                            {item.title}
                                        </h2>

                                        <p className="text-[#0b7211] font-semibold mt-1">
                                            ${item.price}
                                        </p>

                                        {/* QUANTITY */}
                                        <div className="flex items-center mt-3 gap-3">

                                            <button
                                                onClick={() =>
                                                    decreaseQty(item.id)
                                                }
                                                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                                            >
                                                <FiMinus />
                                            </button>

                                            <span className="font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQty(item.id)
                                                }
                                                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                                            >
                                                <FiPlus />
                                            </button>

                                        </div>

                                    </div>

                                    {/* REMOVE */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 cursor-pointer hover:bg-red-50 p-3 rounded-xl"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>

                                </div>
                            ))
                        )}

                    </div>

                    {/* SUMMARY */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">

                        <h2 className="text-xl font-bold mb-5">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-gray-600">

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>$5</span>
                            </div>

                            <hr />

                            <div className="flex justify-between font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>${total + 5}</span>
                            </div>

                        </div>

                        {/* CHECKOUT */}
                        <button className="w-full mt-6 cursor-pointer btnColor hover:bg-[#095c0e] text-white py-3 rounded-xl font-semibold transition">
                            Proceed to Checkout
                        </button>

                    </div>

                </div>

            </MaxWidth>

        </section>
    );
};

export default AddToCartPage;