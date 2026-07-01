import React from "react";
import jsPDF from "jspdf";

type Order = {
    id: string;
    food: string;
    amount: string;
    status: string;
    date: string;
};

type Props = {
    order: Order;
};

const OrderDetails = ({ order }: Props) => {

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Order Invoice", 20, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        doc.text(`Order ID: ${order.id}`, 20, 40);
        doc.text(`Food: ${order.food}`, 20, 50);
        doc.text(`Amount: ${order.amount}`, 20, 60);
        doc.text(`Status: ${order.status}`, 20, 70);
        doc.text(`Date: ${order.date}`, 20, 80);

        doc.setDrawColor(0);
        doc.line(20, 90, 190, 90);

        doc.text("Thank you for your order!", 20, 110);

        doc.save(`${order.id}-invoice.pdf`);
    };

    return (
        <div className="space-y-5">

            {/* HEADER */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    Order Details
                </h2>
                <p className="text-sm text-gray-500">
                    Full information about this order
                </p>
            </div>

            {/* INFO BOX */}
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">

                <div className="flex justify-between">
                    <span className="text-gray-500">Order ID</span>
                    <span className="font-semibold text-gray-800">{order.id}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Food</span>
                    <span className="font-semibold text-gray-800">{order.food}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold text-gray-800">{order.amount}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status</span>
                    {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                        {order.status}
                    </span> */}
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-semibold text-gray-800">{order.date}</span>
                </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">

                <button
                    onClick={downloadPDF}
                    className="flex-1 bg-[#0b7211] text-white py-3 cursor-pointer rounded-xl font-semibold hover:bg-green-700 transition"
                >
                    Download Invoice
                </button>

            </div>

        </div>
    );
};

export default OrderDetails;