"use client";

import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    email: string;
};

const EmailVerifyPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = (data: FormData) => {
        setLoading(true);
        setSuccess(false);

        setTimeout(() => {
            console.log("Verify email sent to:", data.email);
            setLoading(false);
            setSuccess(true);
            reset();
        }, 1500);
        redirect("/otp-verify")
    };

    return (
        <div className=" h-[60vh] flex items-center justify-center  px-4">

            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

                {/* TITLE */}
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Verify Your Email
                </h1>

                <p className="text-center text-gray-500 mt-2 text-sm">
                    Enter your email to receive verification link
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">

                    {/* EMAIL INPUT */}
                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className="
                                w-full mt-2 px-4 py-3
                                border border-gray-300
                                rounded-xl
                                outline-none
                                focus:border-[#0b7211]
                                focus:ring-2
                                focus:ring-green-100
                                transition
                            "
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-[#0b7211]
                            hover:bg-[#095c0e]
                            text-white
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                            disabled:opacity-60
                            cursor-pointer
                        "
                    >
                        {loading ? "Sending..." : "Send Verification Email"}
                    </button>

                    {/* SUCCESS MESSAGE */}
                    {success && (
                        <p className="text-green-600 text-sm text-center">
                            Verification email sent successfully!
                        </p>
                    )}

                </form>

            </div>

        </div>
    );
};

export default EmailVerifyPage;