"use client";

import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import productsData from "@/public/product.json";

const ProductPage = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortOrder, setSortOrder] = useState("featured");
    const [selectedType, setSelectedType] = useState("all");
    const [search, setSearch] = useState("");

    // Unique Categories
    const categories = useMemo(() => {
        const types = productsData
            .map((item: any) => item.type)
            .filter((item: string) => item && item.trim() !== "");

        return ["all", ...new Set(types)];
    }, []);

    // Filter + Search
    const filteredProducts = useMemo(() => {
        let data = [...productsData];

        // Category Filter
        if (selectedType !== "all") {
            data = data.filter(
                (item: any) =>
                    item.type?.toLowerCase() ===
                    selectedType.toLowerCase()
            );
        }

        // Search Filter
        if (search) {
            data = data.filter((item: any) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sorting
        if (sortOrder === "low") {
            data.sort(
                (a: any, b: any) =>
                    Number(a.price) - Number(b.price)
            );
        }

        if (sortOrder === "high") {
            data.sort(
                (a: any, b: any) =>
                    Number(b.price) - Number(a.price)
            );
        }

        return data;
    }, [selectedType, sortOrder, search]);

    return (
        <div className="py-14 bg-zinc-50 min-h-screen">

            {/* HERO */}
            <div className="text-center mb-14 px-4">

                <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-[#0b7211] text-sm font-semibold mb-4">
                    Fresh & Healthy Food
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Delicious <span className="text-[#0b7211]">Food Menu</span>
                </h1>

                <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-7">
                    Explore our fresh breakfast, lunch, dinner, drinks,
                    prepared meals, and healthy dishes crafted with premium
                    ingredients.
                </p>

            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

                {/* SIDEBAR */}
                <aside className="h-fit sticky top-24">

                    <div className="bg-white border border-zinc-100 rounded-3xl p-6 space-y-8 shadow-sm">

                        <h2 className="text-xl font-bold text-gray-900">
                            Filter Products
                        </h2>

                        {/* SEARCH */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Search Product
                            </h3>

                            <input
                                type="text"
                                placeholder="Search food..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="
                                    w-full
                                    border
                                    border-zinc-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-[#0b7211]
                                "
                            />

                        </div>

                        {/* CATEGORY */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Categories
                            </h3>

                            <div className="space-y-3">

                                {categories.map((category: any) => (

                                    <button
                                        key={category}
                                        onClick={() =>
                                            setSelectedType(category)
                                        }
                                        className={`
                                            w-full
                                            text-left
                                            px-4
                                            py-3
                                            rounded-xl
                                            border
                                            transition-all
                                            duration-300
                                            cursor-pointer
                                            ${selectedType === category
                                                ? "bg-[#0b7211] text-white border-[#0b7211]"
                                                : "bg-white border-zinc-200 text-gray-700 hover:bg-green-50"
                                            }
                                        `}
                                    >
                                        {category === "all"
                                            ? "All Products"
                                            : category}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </aside>

                {/* PRODUCTS */}
                <main>

                    {/* TOPBAR */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

                        <p className="text-gray-600 text-sm">

                            Showing{" "}

                            <span className="font-bold text-gray-900">
                                {Math.min(
                                    visibleCount,
                                    filteredProducts.length
                                )}
                            </span>{" "}

                            of{" "}

                            <span className="font-bold text-gray-900">
                                {filteredProducts.length}
                            </span>{" "}

                            products

                        </p>

                        {/* SORT */}
                        <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-4 py-3 shadow-sm">

                            <span className="text-sm text-gray-600">
                                Sort:
                            </span>

                            <select
                                value={sortOrder}
                                onChange={(e) =>
                                    setSortOrder(e.target.value)
                                }
                                className="
                                    text-sm
                                    font-medium
                                    outline-none
                                    bg-transparent
                                    cursor-pointer
                                "
                            >

                                <option value="featured">
                                    Featured
                                </option>

                                <option value="low">
                                    Price: Low → High
                                </option>

                                <option value="high">
                                    Price: High → Low
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

                        {filteredProducts
                            .slice(0, visibleCount)
                            .map((product: any) => (

                                <div
                                    key={product.id}
                                    className="hover:-translate-y-2 transition duration-300"
                                >

                                    <ProductCard product={product} />

                                </div>

                            ))}

                    </div>

                    {/* EMPTY */}
                    {filteredProducts.length === 0 && (

                        <div className="text-center py-20">

                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                No Products Found
                            </h2>

                            <p className="text-gray-500">
                                Try another search or category.
                            </p>

                        </div>

                    )}

                    {/* PAGINATION */}
                    {filteredProducts.length > 6 && (

                        <div className="flex justify-center mt-14">

                            {visibleCount < filteredProducts.length ? (

                                <button
                                    onClick={() =>
                                        setVisibleCount((prev) => prev + 6)
                                    }
                                    className="
                                        px-8
                                        py-3
                                        rounded-full
                                        bg-[#0b7211]
                                        hover:bg-[#095c0e]
                                        cursor-pointer
                                        text-white
                                        font-semibold
                                        shadow-lg
                                        hover:scale-105
                                        transition
                                    "
                                >
                                    Load More Products
                                </button>

                            ) : (

                                <button
                                    onClick={() => setVisibleCount(6)}
                                    className="
                                        px-8
                                        py-3
                                        rounded-full
                                        bg-gray-200
                                        text-gray-700
                                        font-semibold
                                        hover:bg-gray-300
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Show Less
                                </button>

                            )}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default ProductPage;