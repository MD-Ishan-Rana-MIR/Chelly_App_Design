"use client"
import React from 'react'
import { redirect } from 'next/navigation'

const CategoryCard = ({
    title,
    icon,
    category,
}: {
    title: string
    icon: React.ReactNode,
    category: string
}) => {
    return (
        <div className="py-4 ">
            <div
                onClick={() => { redirect(`/category/${category}`) }}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-green-100
                    bg-white
                    p-5 md:p-6
                    flex items-center justify-between
                    cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:scale-[1.03]
                    hover:-translate-y-1
                    shadow-lg shadow-gray-200
                    hover:shadow-2xl hover:shadow-green-200
                    w-full
                    "
            >
                {/* Background Glow */}
                <div
                    className="
                        absolute -top-10 -right-10
                        w-40 h-40
                        bg-green-100
                        rounded-full
                        blur-3xl
                        opacity-40
                        group-hover:opacity-70
                        transition-all duration-500
                        "
                />

                {/* Left Content */}
                <div className="relative z-10">
                    <h1
                        className="
                            text-lg md:text-2xl
                            font-bold
                            text-gray-800
                            tracking-wide
                            transition-all duration-300
                            group-hover:text-green-600
                            group-hover:translate-x-1
                            "
                    >
                        {title}
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Explore delicious items
                    </p>
                </div>

                {/* Icon */}
                <div
                    className="
                        relative z-10
                        w-12 h-12 md:w-14 md:h-14
                        rounded-full
                        bg-green-100
                        flex items-center justify-center
                        text-green-600
                        text-xl md:text-2xl
                        transition-all duration-300
                        group-hover:bg-green-600
                        group-hover:text-white
                        group-hover:rotate-12
                        "
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default CategoryCard