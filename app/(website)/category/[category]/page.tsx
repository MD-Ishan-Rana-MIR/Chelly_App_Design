"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import Button from "@/app/components/button/Button";
import { useCategoryByFoodQuery } from "@/app/redux/categoryApi";
import { FoodType } from "@/app/lib/type";
import FoodCardSkeleton from "@/app/components/skeleton/FoodCardSkeleton";



const CategoryPage = () => {
    const params = useParams();
    const categoryId = params?.category as string;

    const [page, setPage] = useState(1);
    const perPage = 9;

    const { data, isLoading } = useCategoryByFoodQuery({
        id: categoryId,
        page,
        perPage,
    });

    const foods = data?.data?.foods?.data || [];
    const lastPage = data?.data?.foods?.last_page || 1;

    const router = useRouter();

    const handleDetails = (id: number, cateogry: string) => {
        router.push(`/category/${cateogry}/${id}`)

    }

    return (
        <MaxWidth>
            <div className="py-12">

                {/* TITLE */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 capitalize">
                        {data?.data?.category?.name} Menu
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Showing {foods.length} items • Total {data?.data?.foods?.total}
                    </p>
                </div>

                {/* LOADING */}
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: perPage }).map((_, i) => (
                            <FoodCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* GRID */}
                {!isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {foods.map((food: FoodType) => (
                            <div
                                key={food.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* IMAGE */}
                                <div className="relative h-60 w-full">
                                    <Image
                                        src={food.image}
                                        alt={food.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {food.name}
                                        </h3>

                                        <span className="text-green-600 font-bold">
                                            ${food.price}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                                        {food.description?.replace(/<[^>]*>/g, "").slice(0, 100)}
                                    </p>

                                    <div className="mt-4">
                                        <Button
                                            onClick={() => handleDetails(food.id, data?.data?.category?.name)}
                                            loading={false}
                                            text="View Details"
                                            py="10px"
                                            px="12px"
                                            color="#fff"
                                            backgroundColor="#0b7211"
                                            textSize="16px"
                                            borderRadius="10px"
                                            fontWeight="600"
                                            width="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* EMPTY STATE */}
                {!isLoading && foods.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-700">
                            No Food Found
                        </h2>
                    </div>
                )}

                {/* PAGINATION */}
                {!isLoading && lastPage > 1 && (
                    <div className="flex flex-wrap justify-center items-center gap-2 mt-12">

                        {/* PREV */}
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {/* PAGE NUMBERS */}
                        {Array.from({ length: lastPage }, (_, index) => {
                            const pageNumber = index + 1;

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={`px-4 py-2 border rounded transition ${page === pageNumber
                                        ? "bg-green-600 text-white"
                                        : "bg-white text-gray-700"
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        {/* NEXT */}
                        <button
                            disabled={page === lastPage}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>


                    </div>
                )}

            </div>
        </MaxWidth>
    );
};

export default CategoryPage;