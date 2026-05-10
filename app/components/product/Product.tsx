"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductPage = () => {

    // MOCK PRODUCTS
    const products = Array(12).fill({
        id: 1,
        name: "Organic Apples",
        price: 4.99,
        image: "https://via.placeholder.com/300",
        available: true
    });

    // SHOW ITEMS STATE
    const [visibleCount, setVisibleCount] = useState(6);

    // SHOW MORE
    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    // SHOW LESS
    const handleShowLess = () => {
        setVisibleCount(4);
    };

    return (
        <div className="py-8">

            <div className="flex flex-col md:flex-row gap-8">

                {/* LEFT SIDE FILTER */}
                <aside className="w-full md:w-64 flex-shrink-0">

                    <div className="sticky top-24 space-y-8">

                        {/* AVAILABILITY */}
                        <div>

                            <h3 className="text-lg font-bold mb-4">
                                Availability
                            </h3>

                            <div className="space-y-2">

                                {['In Stock', 'Out of Stock'].map((status) => (

                                    <label
                                        key={status}
                                        className="flex items-center space-x-3 cursor-pointer"
                                    >

                                        <input
                                            type="checkbox"
                                            className="
                                                form-checkbox
                                                h-4 w-4
                                                text-green-600
                                                rounded
                                                border-gray-300
                                            "
                                        />

                                        <span className="text-gray-700">
                                            {status}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                        {/* PRICE RANGE */}
                        <div>

                            <h3 className="text-lg font-bold mb-4">
                                Price Range
                            </h3>

                            <div className="space-y-4">

                                <input
                                    type="range"
                                    className="
                                        w-full
                                        h-2
                                        bg-gray-200
                                        rounded-lg
                                        appearance-none
                                        cursor-pointer
                                        accent-green-600
                                    "
                                />

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>$0</span>
                                    <span>$100+</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </aside>

                {/* RIGHT SIDE */}
                <main className="flex-1">

                    {/* HEADER */}
                    <div
                        className="
                            flex
                            flex-col
                            sm:flex-row
                            justify-between
                            items-start
                            sm:items-center
                            border-b
                            border-gray-100
                            pb-4
                            mb-6
                            gap-4
                        "
                    >

                        <p className="text-gray-600 font-medium">
                            Showing{" "}
                            <span className="text-black font-bold">
                                {Math.min(visibleCount, products.length)}
                            </span>{" "}
                            of{" "}
                            <span className="text-black font-bold">
                                {products.length}
                            </span>{" "}
                            products
                        </p>

                        {/* SORT */}
                        <div className="flex items-center space-x-2">

                            <span className="text-gray-600 text-sm">
                                Sort By:
                            </span>

                            <div className="relative inline-block text-left">

                                <button
                                    className="
                                        flex
                                        items-center
                                        space-x-1
                                        border
                                        border-gray-200
                                        rounded-md
                                        px-3
                                        py-2
                                        text-sm
                                        font-medium
                                        hover:bg-gray-50
                                        transition
                                    "
                                >

                                    <span>Featured</span>

                                    <ChevronDown size={16} />

                                </button>

                            </div>

                        </div>

                    </div>

                    {/* PRODUCT GRID */}
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                        "
                    >

                        {products
                            .slice(0, visibleCount)
                            .map((product, index) => (

                                <div key={index}>

                                    <ProductCard product={product} />

                                </div>

                            ))}

                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center justify-center gap-4 mt-10">

                        {visibleCount < products.length ? (
                            <button className='  btnColor primaryText px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer '  onClick={handleShowMore}>
                                Show More
                            </button>
                        ) : (
                            <button className='  btnColor primaryText px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer ' onClick={handleShowLess}>
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