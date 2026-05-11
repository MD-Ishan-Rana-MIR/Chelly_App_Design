"use client";

import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    otp: string[];
};

const OtpVerify = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            otp: ["", "", "", "", "", ""],
        },
    });

    const otp = watch("otp");

    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);

    // TIMER
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // HANDLE OTP INPUT
    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setValue("otp", newOtp);

        // auto focus next input
        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };

    // SUBMIT
    const onSubmit = (data: FormData) => {
        setLoading(true);

        const code = data.otp.join("");

        setTimeout(() => {
            setLoading(false);
            alert("Verified Code: " + code);
        }, 1500);
        redirect("/password-change")
    };

    // RESEND OTP
    const handleResend = () => {
        setTimer(60);
        alert("OTP Resent!");
    };

    return (
        <div className="flex items-center justify-center h-[60vh]   px-4">

            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

                {/* TITLE */}
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Verify Your Otp
                </h1>

                <p className="text-center text-gray-500 mt-2 text-sm">
                    We sent a 6-digit code to your email address
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">

                    {/* OTP INPUTS */}
                    <div className="flex justify-between gap-2">

                        {otp.map((_, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-lg font-bold border rounded-xl focus:outline-none focus:border-[#0b7211]"
                                value={otp[index]}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                            />
                        ))}

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 cursor-pointer btnColor hover:bg-[#095c0e] text-white py-3 rounded-xl font-semibold transition"
                    >
                        {loading ? "Verifying..." : "Verify Otp"}
                    </button>

                </form>

                {/* RESEND */}
                <div className="text-center mt-6 text-sm text-gray-600">

                    {timer > 0 ? (
                        <p>
                            Resend code in{" "}
                            <span className="font-bold text-[#0b7211]">
                                {timer}s
                            </span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-[#0b7211] font-semibold hover:underline"
                        >
                            Resend Code
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
};

export default OtpVerify;