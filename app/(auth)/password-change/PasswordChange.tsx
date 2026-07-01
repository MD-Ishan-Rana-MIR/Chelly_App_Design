"use client";

import { usePasswordChangeMutation } from "@/app/redux/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";

type FormData = {
    password: string;
    password_confirmation: string;
};

const PasswordChange = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const newPassword = watch("password_confirmation");
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const token = JSON.parse(localStorage.getItem("f-token") || "{}")?.token;

    const [passwordChange, { isLoading }] = usePasswordChangeMutation();

    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        const payload = {
            email: email,
            password: data?.password,
            password_confirmation: data?.password_confirmation,
            reset_token: token
        }

        try {

            const res = await passwordChange(payload).unwrap();

            if (res) {
                toast.success(res?.message);
                reset();
                router.push("/login");
                localStorage.removeItem("f-token");
                localStorage.removeItem("auth");
                return;
            }


        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(`Failed to change password. ${msg}`);
        }
    };

    return (
        <div className="h-[70vh]  flex items-center justify-center  px-4">

            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

                {/* HEADER */}
                <div className="text-center mb-8">

                    <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-[#0b7211]/10 flex items-center justify-center">
                            <FiLock className="text-[#0b7211]" size={24} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Change Password
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        Update your password to keep your account secure
                    </p>

                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">



                    {/* NEW PASSWORD */}
                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            New Password
                        </label>

                        <input
                            type="password"
                            {...register("password", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                            })}
                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0b7211]"
                            placeholder="Enter new password"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            {...register("password_confirmation", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === newPassword || "Passwords do not match",
                            })}
                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0b7211]"
                            placeholder="Confirm new password"
                        />

                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password_confirmation.message}
                            </p>
                        )}

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0b7211] hover:bg-[#095c0e] text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 cursor-pointer    "
                    >
                        {isLoading ? "Updating..." : "Change Password"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default PasswordChange;