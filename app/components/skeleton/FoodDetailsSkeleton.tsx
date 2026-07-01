"use client";

import React from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";

const FoodDetailsSkeleton = () => {
    return (
        <section className="bg-gray-50 py-10 animate-pulse">
            <MaxWidth>

                {/* BACK BUTTON SKELETON */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="h-12 w-28 rounded-full bg-gray-200" />
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

                    {/* IMAGE SKELETON */}
                    <div className="rounded-4xl bg-white p-5 shadow-sm">
                        <div className="relative h-[400px] w-full rounded-3xl bg-gray-200" />

                        <div className="absolute left-10 top-10 h-6 w-24 rounded-full bg-gray-300" />
                    </div>

                    {/* CONTENT SKELETON */}
                    <div className="rounded-4xl bg-white p-6 md:p-10 shadow-sm">

                        {/* TITLE */}
                        <div className="h-10 w-3/4 rounded bg-gray-200" />

                        {/* RATING */}
                        <div className="mt-5 flex gap-4">
                            <div className="h-8 w-20 rounded-full bg-gray-200" />
                            <div className="h-5 w-24 rounded bg-gray-200" />
                        </div>

                        {/* PRICE */}
                        <div className="mt-8 h-12 w-40 rounded bg-gray-200" />

                        {/* DESCRIPTION */}
                        <div className="mt-6 space-y-3">
                            <div className="h-4 w-full rounded bg-gray-200" />
                            <div className="h-4 w-5/6 rounded bg-gray-200" />
                            <div className="h-4 w-2/3 rounded bg-gray-200" />
                        </div>

                        {/* QUANTITY + PRICE */}
                        <div className="mt-8 flex justify-between">

                            <div>
                                <div className="mb-4 h-5 w-24 rounded bg-gray-200" />
                                <div className="h-12 w-40 rounded-2xl bg-gray-200" />
                            </div>

                            <div>
                                <div className="mb-4 h-5 w-20 rounded bg-gray-200" />
                                <div className="h-12 w-28 rounded-2xl bg-gray-200" />
                            </div>

                        </div>

                        {/* ORDER PLAN */}
                        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6">

                            <div className="mb-5 space-y-2">
                                <div className="h-6 w-40 rounded bg-gray-200" />
                                <div className="h-4 w-56 rounded bg-gray-200" />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-24 rounded-2xl border bg-gray-200"
                                    />
                                ))}
                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="mt-10 flex gap-4">

                            <div className="h-14 flex-1 rounded-2xl bg-gray-200" />

                            <div className="h-14 w-14 rounded-2xl bg-gray-200" />

                        </div>

                    </div>

                </div>

            </MaxWidth>
        </section>
    );
};

export default FoodDetailsSkeleton;