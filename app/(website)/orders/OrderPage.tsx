"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import React, { useState } from "react";
import { FaCanadianMapleLeaf, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useAllOrderQuery, useOrderCancelMutation } from "@/app/redux/orderApi";
import Pagination from "@/app/components/pagination/Pagination";
import OrderDetailsSkeleton from "@/app/components/skeleton/OrderDetailsSkeleton";
import { Order } from "@/app/lib/type";
import OrderDetails from "./OrderDetails";
import { Candy } from "lucide-react";
import ConfirmModal from "@/app/lib/alert/ConfirmModal";
import { errorMessage } from "@/app/lib/errorMsg";
import toast from "react-hot-toast";

export const getStatusStyle = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700";
        case "pending":
            return "bg-yellow-100 text-yellow-700";
        case "processing":
            return "bg-blue-100 text-blue-700";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-600";
    }
};

const OrdersPage = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { data, isLoading, isFetching, error } = useAllOrderQuery({ page, per_page: perPage });

    const paginationMeta = data?.data;
    const orders: Order[] = paginationMeta?.data || [];

    // Simple, clean client-side print trigger to save/download invoice as PDF
    const handleDownloadPDF = () => {
        window.print();
    };


    // ================================================================= Cancel Order =============================================================

    const [orderCancel, { isLoading: orderLoading }] = useOrderCancelMutation()


    const [openPopUp, setOpenPopUp] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const handleClosePopUp = () => {
        setOpenPopUp(false);
        setId(null);
    };

    const openModal = (id: number) => {
        setId(id);
        setOpenPopUp(true)
    }

    const handleCancelOrder = async () => {
        try {
            const res = await orderCancel(id).unwrap();
            if (res) {
                setId(null);
                setOpenPopUp(false)
                return toast.success(res?.message);
            }

        } catch (error) {
            return errorMessage(error)
        }
    }














    if (isLoading) {
        return (
            <OrderDetailsSkeleton />
        );
    }

    if (error) {
        return (
            <MaxWidth>
                <div className="py-20 text-center font-medium text-red-500">Failed to load orders. Please try again.</div>
            </MaxWidth>
        );
    }

    return (
        <MaxWidth>
            {/* The print utilities explicitly isolate the screen dashboard from invoice printing viewports */}
            <div className={`mx-auto py-10 transition-opacity print:hidden ${isFetching ? "opacity-60" : "opacity-100"}`}>

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        My Orders 🍔
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track your food orders, status and history
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
                        No orders found.
                    </div>
                ) : (
                    <>
                        {/* MOBILE CARDS */}
                        <div className="grid gap-4 md:hidden">
                            {orders.map((order: Order) => (
                                <div key={order.id} className="bg-white shadow-sm border rounded-xl p-4">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-800">#{order.order_number}</p>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-gray-600">
                                        🍽 {order.items?.[0]?.food?.name || "Unknown Item"}
                                        {order.items?.length > 1 && ` (+${order.items.length - 1} more)`}
                                    </p>

                                    <div className="flex justify-between mt-3 text-sm text-gray-500">
                                        <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                        <span className="font-semibold text-gray-800">
                                            ${order.total_amount}
                                        </span>
                                    </div>

                                    <div className="flex gap-4 mt-4">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="flex cursor-pointer items-center gap-2 text-[#0b7211] font-medium"
                                        >
                                            <FaEye /> View Details
                                        </button>
                                        <button className="flex items-center gap-2 cursor-pointer text-red-500 font-medium">
                                            <FaTrash /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* DESKTOP TABLE */}
                        <div className="hidden md:block bg-white shadow-sm border rounded-xl overflow-hidden mb-6">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 text-left text-gray-600 text-sm border-b">
                                    <tr>
                                        <th className="px-6 py-4">Order Number</th>
                                        <th className="px-6 py-4">Food</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order: Order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/70 transition">
                                            <td className="px-6 py-4 font-medium text-gray-700">{order.order_number}</td>
                                            <td className="px-6 py-4 text-gray-600">{order.items?.[0]?.food?.name || "Unknown Item"}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-800">${order.total_amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 flex gap-3">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="group relative p-2 rounded-full cursor-pointer hover:bg-green-500/10 transition"
                                                >
                                                    <FaEye className="text-[#0b7211]" />

                                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        View Details
                                                    </span>
                                                </button>
                                                <button
                                                    className="group relative p-2 rounded-full hover:bg-red-50 cursor-pointer transition"
                                                    title="Cancel Order"
                                                >
                                                    <FaTrash className="text-red-500" />

                                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                                                        Delete
                                                    </span>
                                                </button>
                                                {/* Delete / Cancel */}
                                                <button
                                                    onClick={() => { openModal(order?.id) }}
                                                    className="group relative p-2 rounded-full hover:bg-red-50 cursor-pointer transition"
                                                >
                                                    <FaEdit className="text-red-500" />

                                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        Cancel Order
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION PANEL */}
                        <Pagination
                            currentPage={page}
                            lastPage={paginationMeta?.last_page || 1}
                            totalResults={paginationMeta?.total || 0}
                            perPage={perPage}
                            isFetching={isFetching}
                            onPageChange={(targetPage) => setPage(targetPage)}
                            onPerPageChange={(newSize) => {
                                setPerPage(newSize);
                                setPage(1);
                            }}
                        />
                    </>
                )}
            </div>

            {/* MODAL CONTAINER & UNIQUE INVOICE DISPLAY */}
            {selectedOrder && (
                <OrderDetails selectedOrder={selectedOrder} handleDownloadPDF={handleDownloadPDF} setSelectedOrder={(order) => setSelectedOrder(order)} />
            )}
            <ConfirmModal
                open={openPopUp}
                title="Are you sure you want to cancel this order?"
                description="This action cannot be undone. The order will be cancelled permanently."
                confirmText={orderLoading ? "Cancelling..." : "Yes, Cancel Order"}
                cancelText="Keep Order"
                onConfirm={handleCancelOrder}
                onCancel={handleClosePopUp}
            />
        </MaxWidth>
    );
};

export default OrdersPage;