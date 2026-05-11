"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";

const ProductPage = () => {

    const products = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        name: "Organic Apples",
        price: Math.floor(Math.random() * 100) + 1,
        image: "https://via.placeholder.com/300",
        available: true,
    }));

    const [visibleCount, setVisibleCount] = useState(6);
    const [sortOrder, setSortOrder] = useState("featured");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low") return a.price - b.price;
        if (sortOrder === "high") return b.price - a.price;
        return 0;
    });

    return (
        <div className=" py-14">
            

            {/* HERO HEADER */}
            <div className="text-center mb-14 px-4">

                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Fresh Organic <span className="text-[#0b7211]">Market</span>
                </h1>

                <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                    Discover handpicked organic products, premium quality, and farm-fresh delivery to your doorstep.
                </p>

            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

                {/* FILTER PANEL */}
                <aside className="h-fit sticky top-24">

                    <div className="bg-white/70 backdrop-blur-xl border border-gray-200  rounded-3xl p-6 space-y-8">

                        <h2 className="text-xl font-bold text-gray-900">
                            Filter Products
                        </h2>

                        {/* Availability */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Availability
                            </h3>

                            <div className="space-y-3">

                                {["In Stock", "Out of Stock"].map((status) => (

                                    <label
                                        key={status}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >

                                        <input
                                            type="checkbox"
                                            className="accent-[#0b7211] scale-110"
                                        />

                                        <span className="text-gray-600 text-sm">
                                            {status}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                        {/* Price */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Price Range
                            </h3>

                            <input
                                type="range"
                                className="w-full accent-[#0b7211]"
                            />

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>$0</span>
                                <span>$100+</span>
                            </div>

                        </div>

                    </div>

                </aside>

                {/* PRODUCT AREA */}
                <main>

                    {/* TOP BAR */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

                        <p className="text-gray-600 text-sm">
                            Showing{" "}
                            <span className="font-bold text-gray-900">
                                {Math.min(visibleCount, products.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-bold text-gray-900">
                                {products.length}
                            </span>{" "}
                            products
                        </p>

                        {/* SORT */}
                        <div className="flex items-center gap-3 bg-white shadow-md border rounded-2xl px-4 py-2">

                            <span className="text-sm text-gray-600">
                                Sort:
                            </span>

                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="text-sm font-medium outline-none bg-transparent cursor-pointer"
                            >

                                <option value="featured">Featured</option>
                                <option value="low">Price: Low → High</option>
                                <option value="high">Price: High → Low</option>

                            </select>

                        </div>

                    </div>

                    {/* PRODUCT GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

                        {sortedProducts.slice(0, visibleCount).map((product) => (

                            <div
                                key={product.id}
                                className="hover:-translate-y-2 transition duration-300"
                            >

                                <ProductCard product={product} />

                            </div>

                        ))}

                    </div>

                    {/* LOAD MORE */}
                    <div className="flex justify-center mt-14">

                        {visibleCount < products.length ? (
                            <button
                                onClick={() => setVisibleCount((p) => p + 4)}
                                className="
                                    px-8 py-3
                                    rounded-full
                                    btnColor
                                    cursor-pointer
                                    text-white font-semibold
                                    shadow-lg
                                    hover:scale-105 transition
                                "
                            >
                                Load More Products
                            </button>
                        ) : (
                            <button
                                onClick={() => setVisibleCount(6)}
                                className="
                                    px-8 py-3
                                    rounded-full
                                    bg-gray-200
                                    text-gray-700 font-semibold
                                    hover:bg-gray-300 transition
                                "
                            >
                                Show Less
                            </button>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default ProductPage;