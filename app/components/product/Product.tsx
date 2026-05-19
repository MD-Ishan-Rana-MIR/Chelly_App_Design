"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
    id: number;
    Title: string;
    BodyHTML: string;
    VariantPrice: number;
    ImageSrc: string;
    Category: string;
}

const ProductCard = ({ product }: { product: Product }) => {

    const router = useRouter();

    const navigateOnClick = () => {
        router.push(`/food/${product.id}`);
    };

    return (
        <div
            onClick={navigateOnClick}
            className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                border
                border-zinc-100
                hover:shadow-xl
                transition-all
                duration-300
                cursor-pointer
                h-full
            "
        >

            <div className="relative w-full h-[240px] overflow-hidden">

                <Image
                    src={product.ImageSrc}
                    alt={product.Title}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                />

            </div>

            <div className="p-5">

                <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-[#0b7211] text-xs font-semibold mb-3">
                    {product.Category}
                </span>

                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                    {product.Title}
                </h2>

                <div
                    className="text-sm text-gray-500 line-clamp-2 mt-2"
                    dangerouslySetInnerHTML={{
                        __html: product.BodyHTML,
                    }}
                />

                <div className="mt-5 flex items-center justify-between">

                    <h3 className="text-2xl font-extrabold text-[#0b7211]">
                        ${product.VariantPrice}
                    </h3>

                    <button
                        className="
                            px-4
                            py-2
                            rounded-full
                            bg-[#0b7211]
                            text-white
                            text-sm
                            font-semibold
                            hover:bg-[#095c0e]
                            transition
                            cursor-pointer
                        "
                    >
                        View
                    </button>

                </div>

            </div>

        </div>
    );
};

const ProductPage = () => {

    const [visibleCount, setVisibleCount] = useState(6);
    const [sortOrder, setSortOrder] = useState("featured");
    const [selectedType, setSelectedType] = useState("All");
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await fetch("/product.json");
                const data = await response.json();

                setProducts(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchProducts();

    }, []);

    // UNIQUE CATEGORY
    const categories = useMemo(() => {

        const types = products
            .map((item) => item.Category?.trim())
            .filter(Boolean);

        return ["All", ...Array.from(new Set(types))];

    }, [products]);

    // FILTER PRODUCT
    const filteredProducts = useMemo(() => {

        let data = [...products];

        // CATEGORY FILTER
        if (selectedType !== "All") {

            data = data.filter(
                (item) =>
                    item.Category?.trim().toLowerCase() ===
                    selectedType.trim().toLowerCase()
            );

        }

        // SEARCH FILTER
        if (search.trim()) {

            data = data.filter((item) =>
                item.Title.toLowerCase().includes(
                    search.toLowerCase()
                )
            );

        }

        // SORTING
        if (sortOrder === "low") {

            data.sort(
                (a, b) =>
                    Number(a.VariantPrice) -
                    Number(b.VariantPrice)
            );

        }

        if (sortOrder === "high") {

            data.sort(
                (a, b) =>
                    Number(b.VariantPrice) -
                    Number(a.VariantPrice)
            );

        }

        return data;

    }, [products, selectedType, search, sortOrder]);

    return (

        <div className="py-14 min-h-screen bg-[#fafafa]">

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

                                {categories.map((category) => (

                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedType(category);
                                            setVisibleCount(6);
                                        }}
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
                                        {category === "All"
                                            ? "All Products"
                                            : category}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </aside>

                {/* PRODUCT SECTION */}
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
                            .map((product) => (

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

                    {/* LOAD MORE */}
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