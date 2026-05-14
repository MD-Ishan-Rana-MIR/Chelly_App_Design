"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import React from "react";

const guides = [
    "Choose your payment method (Card, bKash, Nagad)",
    "Click on Pay Now button",
    "Enter your payment amount",
    "Confirm your order details",
    "Check your account balance",
    "Verify your mobile number",
    "Enter OTP code if required",
    "Make sure internet is stable",
    "Avoid closing the page during payment",
    "Use secure payment network",
    "Double check payment amount",
    "Ensure correct billing information",
    "Select correct currency if available",
    "Check transaction fee (if any)",
    "Wait for payment processing",
    "Do not refresh the page",
    "Save your transaction ID",
    "Check email confirmation",
    "Contact support if failed",
    "Payment will reflect instantly after success",
];

export default function PaymentGuideCards() {
    return (
        <div className=" my-10 ">
            <MaxWidth>
                <div className="">

                    {/* Header */}
                    <h1 className="text-3xl font-bold mb-2">
                        Payment Guide Instructions
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Follow these 20 important rules for safe payment
                    </p>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {guides.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0b7211] text-white mb-3">
                                    {index + 1}
                                </div>

                                <p className="text-gray-700 font-medium">
                                    {item}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </MaxWidth>
        </div>
    );
}