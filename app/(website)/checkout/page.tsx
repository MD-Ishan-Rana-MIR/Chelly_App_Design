'use client';

import { useState } from 'react';
import MaxWidth from '@/app/components/max-width/MaxWidth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    FiCreditCard,
    FiMapPin,
    FiPhone,
    FiShoppingBag,
    FiCheckCircle,
} from 'react-icons/fi';

const cartItems = [
    {
        id: 1,
        title: 'Classic Beef Burger',
        price: 18,
        quantity: 2,
        image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    },
    {
        id: 2,
        title: 'Cheese Pizza',
        price: 24,
        quantity: 1,
        image:
            'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    },
];

export default function CheckoutPage() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const deliveryFee = 5;
    const total = subtotal + deliveryFee;

    const handlePlaceOrder = () => {
        setOpenModal(true);
    };

    const handleGoHome = () => {
        setOpenModal(false);
        router.push('/');
    };

    return (
        <section className="bg-gray-50 min-h-screen py-10">

            <MaxWidth>

                {/* TITLE */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Checkout
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Complete your order details below
                    </p>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] gap-8">

                    {/* LEFT */}
                    <div className="space-y-8">

                        {/* DELIVERY */}
                        <div className="bg-white rounded-3xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <FiMapPin className="text-[#0b7211]" size={22} />
                                <h2 className="text-xl font-bold">
                                    Delivery Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <input className="border p-3 rounded-xl" placeholder="Full Name" />
                                <input className="border p-3 rounded-xl" placeholder="Email" />

                                <div className="md:col-span-2 relative">
                                    <FiPhone className="absolute top-4 left-4 text-gray-400" />
                                    <input className="w-full border pl-11 p-3 rounded-xl" placeholder="Phone" />
                                </div>

                                <textarea className="md:col-span-2 border p-3 rounded-xl" rows={4} placeholder="Address" />
                            </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="bg-white rounded-3xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <FiCreditCard className="text-[#0b7211]" size={22} />
                                <h2 className="text-xl font-bold">
                                    Payment Method
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <label className="flex justify-between border p-4 rounded-xl">
                                    <input type="radio" name="payment" defaultChecked />
                                    Cash on Delivery
                                </label>

                                <label className="flex justify-between border p-4 rounded-xl">
                                    <input type="radio" name="payment" />
                                    Card Payment
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="bg-white rounded-3xl p-6 h-fit sticky top-24">

                        <div className="flex items-center gap-3 mb-6">
                            <FiShoppingBag className="text-[#0b7211]" size={22} />
                            <h2 className="text-xl font-bold">
                                Order Summary
                            </h2>
                        </div>

                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 mb-4">
                                <Image
                                    src={item.image}
                                    alt=""
                                    width={70}
                                    height={70}
                                    className="rounded-xl"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-bold text-[#0b7211]">
                                    ${item.price * item.quantity}
                                </p>
                            </div>
                        ))}

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>${deliveryFee}</span>
                            </div>

                            <div className="flex justify-between font-bold text-[#0b7211] text-lg">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full mt-6 bg-[#0b7211] cursor-pointer text-white py-4 rounded-xl font-semibold"
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            </MaxWidth>

            {/* ================= SUCCESS MODAL ================= */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white p-8 rounded-3xl text-center w-[90%] max-w-md">

                        <FiCheckCircle className="mx-auto text-[#0b7211]" size={60} />

                        <h2 className="text-2xl font-bold mt-4">
                            Order Placed!
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Your order has been successfully placed.
                        </p>

                        <button
                            onClick={handleGoHome}
                            className="mt-6 w-full bg-[#0b7211] cursor-pointer   text-white py-3 rounded-xl font-semibold"
                        >
                            Go to Home
                        </button>

                    </div>

                </div>
            )}

        </section>
    );
}