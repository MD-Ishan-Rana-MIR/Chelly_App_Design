"use client";

import React, { useState } from "react";
import {
    UseFormRegister,
    FieldValues,
    RegisterOptions,
    Path
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordInputProps<T extends FieldValues> = {
    label: string;
    placeholder?: string;

    register: UseFormRegister<T>;
    name: Path<T>;

    rules?: RegisterOptions<T>;
    error?: string;
};

const PasswordInput = <T extends FieldValues>({
    label,
    placeholder,
    register,
    name,
    rules,
    error,
}: PasswordInputProps<T>) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">

            <label className="text-sm font-medium">{label}</label>

            <div className="relative mt-1">

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="
                        w-full px-4 py-3 
                        border border-[#0b7211] 
                        rounded-lg 
                        focus:outline-none 
                        focus:ring-0 
                        
                        transition
                    "
                    {...register(name, rules)}
                />

                {/* TOGGLE ICON */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-3 top-4 text-gray-600"
                >
                    {showPassword ? (
                        <FaEyeSlash size={18} />
                    ) : (
                        <FaEye size={18} />
                    )}
                </button>

            </div>

            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error}
                </p>
            )}

        </div>
    );
};

export default PasswordInput;