"use client";

import React from "react";
import {
    UseFormRegister,
    FieldValues,
    RegisterOptions,
    Path
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
    label: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;

    register: UseFormRegister<T>;
    name: Path<T>;

    rules?: RegisterOptions<T>;
    error?: string;
};

const Input = <T extends FieldValues>({
    label,
    type = "text",
    placeholder,
    register,
    name,
    rules,
    error,
}: InputProps<T>) => {
    return (
        <div className="w-full">

            <label className="text-sm font-medium">{label}</label>

            <input
                type={type}
                placeholder={placeholder}
                className="
                    w-full mt-1 px-4 py-3 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-0 
                    border border-[#0b7211]
                    transition
                "
                {...register(name, rules)}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;