"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import OrderDetails from "@/app/components/order/OrderDetails";

const orders = [
    {
        id: "#ORD-1001",
        food: "Cheese Burger",
        amount: "$12.00",
        status: "Pending",
        date: "2026-05-12",
    },
    {
        id: "#ORD-1002",
        food: "Chicken Pizza",
        amount: "$18.00",
        status: "Delivered",
        date: "2026-05-11",
    },
    {
        id: "#ORD-1003",
        food: "Fried Rice",
        amount: "$10.00",
        status: "Processing",
        date: "2026-05-10",
    },
    {
        id: "#ORD-1004",
        food: "Burger Combo",
        amount: "$15.00",
        status: "Cancelled",
        date: "2026-05-09",
    },
];

export const getStatusStyle = (status: string) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-700";
        case "Pending":
            return "bg-yellow-100 text-yellow-700";
        case "Processing":
            return "bg-blue-100 text-blue-700";
        case "Cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-600";
    }
};

const OrdersPage = () => {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    return (
        <MaxWidth>
            <div className="mx-auto py-10">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        My Orders 🍔
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track your food orders, status and history
                    </p>
                </div>

                {/* MOBILE CARDS */}
                <div className="grid gap-4 md:hidden">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white shadow-sm border rounded-xl p-4"
                        >
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">{order.id}</p>

                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <p className="mt-2 text-gray-600">🍽 {order.food}</p>

                            <div className="flex justify-between mt-3 text-sm text-gray-500">
                                <span>{order.date}</span>
                                <span className="font-semibold text-gray-800">
                                    {order.amount}
                                </span>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="flex cursor-pointer  items-center gap-2 text-[#0b7211]"
                                >
                                    <FaEye /> View
                                </button>

                                <button className="flex items-center gap-2 cursor-pointer text-red-500">
                                    <FaTrash /> Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden md:block bg-white shadow-sm rounded-xl overflow-hidden">

                    <table className="min-w-full">

                        <thead className="bg-gray-100 text-left text-gray-600 text-sm">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Food</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition">

                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {order.id}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {order.food}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {order.amount}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-500">
                                        {order.date}
                                    </td>

                                    <td className="px-6 py-4 flex gap-3">

                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 rounded-full cursor-pointer hover:bg-green-500/10   "
                                        >
                                            <FaEye className="text-[#0b7211]" />
                                        </button>

                                        <button className="p-2 rounded-full hover:bg-red-50 cursor-pointer ">
                                            <FaTrash className="text-red-500" />
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

                {/* MODAL */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white w-[90%] md:w-[500px] rounded-xl p-6 relative">

                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="absolute top-3 right-3 text-gray-500 cursor-pointer "
                            >
                                ✕
                            </button>

                            {/* ORDER DETAILS */}
                            <OrderDetails order={selectedOrder} />

                        </div>

                    </div>
                )}

            </div>
        </MaxWidth>
    );
};

export default OrdersPage;