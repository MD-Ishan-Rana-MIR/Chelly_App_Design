'use client';

import MaxWidth from '@/app/components/max-width/MaxWidth';
import Image from 'next/image';
import {
    FiCreditCard,
    FiMapPin,
    FiPhone,
    FiShoppingBag,
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

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const deliveryFee = 5;
    const total = subtotal + deliveryFee;

    return (
        <section className="bg-gray-50 min-h-screen py-10">

            <MaxWidth>

                {/* TITLE */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                        Checkout
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Complete your order details below
                    </p>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] gap-8">

                    {/* LEFT SIDE */}
                    <div className="space-y-8">

                        {/* DELIVERY INFO */}
                        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                    <FiMapPin size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold">
                                        Delivery Information
                                    </h2>

                                    <p className="text-gray-500 text-sm">
                                        Enter your delivery details
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <div className="md:col-span-2 relative">
                                    <FiPhone className="absolute top-4 left-4 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="w-full border rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <textarea
                                        placeholder="Delivery Address"
                                        rows={4}
                                        className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* PAYMENT METHOD */}
                        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                    <FiCreditCard size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold">
                                        Payment Method
                                    </h2>

                                    <p className="text-gray-500 text-sm">
                                        Choose your payment option
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">

                                <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:border-green-500 transition">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" defaultChecked />
                                        <span className="font-medium">
                                            Cash on Delivery
                                        </span>
                                    </div>

                                    <span className="text-green-600 font-semibold">
                                        Recommended
                                    </span>
                                </label>

                                <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:border-green-500 transition">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" />
                                        <span className="font-medium">
                                            Credit / Debit Card
                                        </span>
                                    </div>
                                </label>

                                <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:border-green-500 transition">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" />
                                        <span className="font-medium">
                                            Mobile Banking
                                        </span>
                                    </div>
                                </label>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-white rounded-3xl shadow-sm p-6 h-fit sticky top-24">

                        {/* ORDER SUMMARY */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                <FiShoppingBag size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">
                                    Order Summary
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    {cartItems.length} items selected
                                </p>
                            </div>
                        </div>

                        {/* PRODUCTS */}
                        <div className="space-y-5">

                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4"
                                >

                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-bold text-green-600">
                                        ${item.price * item.quantity}
                                    </p>

                                </div>
                            ))}

                        </div>

                        {/* PRICE */}
                        <div className="border-t mt-6 pt-6 space-y-4">

                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span>${deliveryFee}</span>
                            </div>

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-green-600">
                                    ${total}
                                </span>
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button className="w-full mt-8 btnColor cursor-pointer hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition">
                            Place Order
                        </button>

                    </div>

                </div>

            </MaxWidth>

        </section>
    );
}