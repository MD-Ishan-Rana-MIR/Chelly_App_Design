"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";

type FormData = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ChangePasswordPage = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const newPassword = watch("newPassword");

    const onSubmit = async (data: FormData) => {
        setLoading(true);

        try {
            console.log("Password Change Data:", data);

            // fake API delay
            await new Promise((res) => setTimeout(res, 1500));

            alert("Password changed successfully!");

            reset();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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

                    {/* OLD PASSWORD */}
                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            Old Password
                        </label>

                        <input
                            type="password"
                            {...register("oldPassword", {
                                required: "Old password is required",
                            })}
                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0b7211]"
                            placeholder="Enter old password"
                        />

                        {errors.oldPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}

                    </div>

                    {/* NEW PASSWORD */}
                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            New Password
                        </label>

                        <input
                            type="password"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                            })}
                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0b7211]"
                            placeholder="Enter new password"
                        />

                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
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
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === newPassword || "Passwords do not match",
                            })}
                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0b7211]"
                            placeholder="Confirm new password"
                        />

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0b7211] hover:bg-[#095c0e] text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Change Password"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ChangePasswordPage;