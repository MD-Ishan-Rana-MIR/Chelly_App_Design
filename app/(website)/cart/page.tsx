"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { redirect } from "next/navigation";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);

    // LOAD FROM LOCALSTORAGE
    useEffect(() => {
        const loadCart = () => {
            const stored = JSON.parse(localStorage.getItem("cart") || "[]");
            setCart(stored);
        };

        loadCart();

        // real-time sync
        window.addEventListener("cartUpdate", loadCart);

        return () => {
            window.removeEventListener("cartUpdate", loadCart);
        };
    }, []);


    // UPDATE LOCALSTORAGE HELPER
    const updateCart = (updated: CartItem[]) => {
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdate"));
    };

    // INCREASE
    const increaseQty = (id: number) => {
        const updated = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        updateCart(updated);
    };

    // DECREASE
    const decreaseQty = (id: number) => {
        const updated = cart.map((item) =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateCart(updated);
    };

    // REMOVE
    const removeItem = (id: number) => {
        const updated = cart.filter((item) => item.id !== id);
        updateCart(updated);
    };

    // TOTAL
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const delivery = cart.length > 0 ? 0 : 0;
    const total = subtotal + delivery;

    return (
        <section className=" py-10">
            <MaxWidth>

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-10">
                    <FiShoppingBag size={28} className="text-[#0b7211]" />
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Your Cart
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

                    {/* CART ITEMS */}
                    <div className="space-y-5">

                        {cart.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow">
                                <FiShoppingBag
                                    size={60}
                                    className="mx-auto text-gray-400"
                                />
                                <h2 className="text-xl font-semibold mt-4">
                                    Your cart is empty
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    Add some delicious food 🍔
                                </p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow hover:shadow-md transition"
                                >

                                    {/* IMAGE */}
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* INFO */}
                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg">
                                            {item.title}
                                        </h2>

                                        <p className="text-[#0b7211] font-semibold mt-1">
                                            ${item.price}
                                        </p>

                                        {/* QTY */}
                                        <div className="flex items-center gap-3 mt-3">

                                            <button
                                                onClick={() =>
                                                    decreaseQty(item.id)
                                                }
                                                className="p-2  cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200"
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
                                                className="p-2 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200"
                                            >
                                                <FiPlus />
                                            </button>

                                        </div>
                                    </div>

                                    {/* REMOVE */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 cursor-pointer hover:bg-red-50 p-3 rounded-xl transition"
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
                                <span>${subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>${delivery}</span>
                            </div>

                            <hr />

                            <div className="flex justify-between font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>

                        </div>

                        <button onClick={()=>{redirect("/checkout")}} className="w-full mt-6 btnColor cursor-pointer hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
                            Proceed to Checkout
                        </button>

                    </div>

                </div>

            </MaxWidth>
        </section>
    );
}