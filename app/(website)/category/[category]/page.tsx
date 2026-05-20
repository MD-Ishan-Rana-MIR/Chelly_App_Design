"use client";

import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import Button from "@/app/components/button/Button";
import toast from "react-hot-toast";
interface Product {
    id: number;
    Title: string;
    BodyHTML: string;
    VariantPrice: number;
    ImageSrc: string;
    Category: string;
}


const CategoryPage = () => {

    const [products, setProducts] = useState<Product[]>([]);


    // Fetch JSON
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/product.json");
                const data = await response.json();


                setProducts(data);
            } catch (error: unknown) {
                const msg = error instanceof Error ? error.message : String(error);
                toast.error(`Failed to fetch products. ${msg}`);
            }
        };
        fetchProducts();
    }, []);
    // GET CATEGORY FROM URL PARAMS
    const params = useParams();


    const category = params?.category as string;

    // FILTER FOOD BY CATEGORY
    const filteredFoods = products.filter(
        (item) => item.Category === category
    );

    return (
        <MaxWidth>
            <div className="py-12">

                {/* TITLE */}
                <div className="mb-10 text-center">

                    <h1 className="text-4xl font-bold text-gray-800 capitalize">
                        {category} Menu
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Fresh and delicious food items from our {category} category 🍽️
                    </p>

                </div>

                {/* FOOD MENU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredFoods.map((food) => (

                        <div
                            key={food.id}
                            className="
                            bg-white
                            rounded-3xl
                            overflow-hidden
                            shadow-md
                            hover:shadow-2xl
                            transition-all
                            duration-300
                            hover:-translate-y-2
                        "
                            onClick={() => { redirect(`/category/${category}/${food.id}`) }}
                        >

                            {/* IMAGE */}
                            <div className="relative h-60 w-full">

                                <Image
                                    src={food.ImageSrc}
                                    alt={food.Title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-xl font-bold text-gray-800">
                                        {food.Title}
                                    </h3>

                                    <span className="text-[#0b7211] font-bold">
                                        {food.VariantPrice.toFixed(2)}
                                    </span>

                                </div>

                                <p className="text-gray-500 text-sm mt-3">
                                    Freshly prepared delicious food for your healthy lifestyle 🍽️
                                </p>

                                <div className=" my-3 " >
                                    <Button
                                        loading={false}
                                        text="View Details"
                                        py="12px"
                                        px="12px"
                                        color="#fff"
                                        backgroundColor="#0b7211"
                                        textSize="18px"
                                        borderRadius="10px"
                                        fontWeight="600"
                                        width="100%"
                                    />
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* NO DATA */}
                {filteredFoods.length === 0 && (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-bold text-gray-700">
                            No Food Found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            No products available in this category.
                        </p>

                    </div>

                )}

            </div>
        </MaxWidth>
    );
};

export default CategoryPage;