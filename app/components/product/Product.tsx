"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetFoodsQuery } from "@/app/redux/foodApi";
import { useAllCategoriesQuery } from "@/app/redux/categoryApi";
import { CategoryType } from "@/app/lib/type";

interface Product {
    id: number;
    category_id: number;
    name: string;
    description: string;
    price: string | number;
    stock: number;
    image: string;
    status: string;
    category?: {
        id: number;
        name: string;
        image: string | null;
        status: string;
    };
}

const ITEMS_PER_PAGE = 16;

const ProductCard = ({ product }: { product: Product }) => {
    const router = useRouter();

    const navigateOnClick = () => {
        router.push(`/food/${product.id}`);
    };

    return (
        <div
            onClick={navigateOnClick}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
        >
            <div className="relative w-full h-[240px] overflow-hidden">
                <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                />
            </div>

            <div className="p-5">
                {product.category?.name && (
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-[#0b7211] text-xs font-semibold mb-3">
                        {product.category.name}
                    </span>
                )}

                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                    {product.name}
                </h2>

                <div
                    className="text-sm text-gray-500 line-clamp-2 mt-2"
                    dangerouslySetInnerHTML={{
                        __html: product.description,
                    }}
                />

                <div className="mt-5 flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-[#0b7211]">
                        ${parseFloat(product.price as string).toFixed(2)}
                    </h3>

                    <button
                        className="px-4 py-2 rounded-full bg-[#0b7211] text-white text-sm font-semibold hover:bg-[#095c0e] transition cursor-pointer"
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductPage = () => {
    // UI STATES
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("featured");
    const [selectedType, setSelectedType] = useState<CategoryType | "All">("All");
    const [search, setSearch] = useState("");

    // CATEGORIES API FETCH
    const { data: categoryResponse } = useAllCategoriesQuery({});
    const categories: CategoryType[] = categoryResponse?.data?.data || [];

    // INTEGRATED BACKEND FOODS FETCH
    const { data: foodResponse, isLoading, isFetching } = useGetFoodsQuery({
        page: currentPage,
        perPage: ITEMS_PER_PAGE,
        categoryId: selectedType !== "All" ? selectedType.id : undefined,
        search: search,
    });

    // Extract product dataset & meta definitions directly out of response structure
    const rawProducts: Product[] = foodResponse?.data?.data || [];
    const totalItems = foodResponse?.data?.total || 0;
    const totalPages = foodResponse?.data?.last_page || 1;

    // SORTING (Since your backend doesn't show a sort parameter, we maintain local sort on returned page slice)
    const processedProducts = useMemo(() => {
        const result = [...rawProducts];
        if (sortOrder === "low") {
            result.sort((a, b) => parseFloat(a.price as string) - parseFloat(b.price as string));
        } else if (sortOrder === "high") {
            result.sort((a, b) => parseFloat(b.price as string) - parseFloat(a.price as string));
        }
        return result;
    }, [rawProducts, sortOrder]);

    const handleFilterReset = () => {
        setCurrentPage(1);
    };

    return (
        <div className="py-14 min-h-screen">
            {/* HERO */}
            <div className="text-center mb-14 px-4">
                <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-[#0b7211] text-sm font-semibold mb-4">
                    Fresh & Healthy Food
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Delicious <span className="text-[#0b7211]">Food Menu</span>
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-7">
                    Explore our fresh breakfast, lunch, dinner, drinks, prepared meals, and healthy dishes.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
                {/* SIDEBAR */}
                <aside className="h-fit sticky top-24">
                    <div className="bg-white border border-zinc-100 rounded-3xl p-6 space-y-8 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900">Filter Products</h2>

                        {/* SEARCH */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Search Product</h3>
                            <input
                                type="text"
                                placeholder="Search food..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    handleFilterReset();
                                }}
                                className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-[#0b7211]"
                            />
                        </div>

                        {/* CATEGORIES MENU */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        setSelectedType("All");
                                        handleFilterReset();
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${selectedType === "All"
                                            ? "bg-[#0b7211] text-white border-[#0b7211]"
                                            : "bg-white border-zinc-200 text-gray-700 hover:bg-green-50"
                                        }`}
                                >
                                    All Products
                                </button>

                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedType(cat);
                                            handleFilterReset();
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${selectedType !== "All" && selectedType.id === cat.id
                                                ? "bg-[#0b7211] text-white border-[#0b7211]"
                                                : "bg-white border-zinc-200 text-gray-700 hover:bg-green-50"
                                            }`}
                                    >
                                        {cat.name}
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
                                {totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-bold text-gray-900">
                                {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}
                            </span>{" "}
                            of{" "}
                            <span className="font-bold text-gray-900">{totalItems}</span> products
                        </p>

                        {/* SORT */}
                        <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-4 py-3 shadow-sm">
                            <span className="text-sm text-gray-600">Sort:</span>
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

                    {/* GRIDS / LOADING STATE */}
                    {isLoading || isFetching ? (
                        <div className="text-center py-20 font-semibold text-gray-500">
                            Loading fresh food menu...
                        </div>
                    ) : (
                        <>
                            {processedProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
                                    <p className="text-gray-500">Try another search or category filter.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                    {processedProducts.map((product) => (
                                        <div key={product.id} className="hover:-translate-y-2 transition duration-300">
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* PAGINATION CONTROLS */}
                    {(!isLoading && !isFetching) && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-14 pb-10">
                            {/* PREV BUTTON */}
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className={`px-5 py-2 rounded-xl border font-medium transition-all cursor-pointer ${currentPage === 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white hover:bg-[#0b7211] hover:text-white"
                                    }`}
                            >
                                Prev
                            </button>

                            {/* PAGE NUMBERS */}
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-xl font-semibold transition-all cursor-pointer ${currentPage === page
                                            ? "bg-[#0b7211] text-white"
                                            : "bg-white border hover:bg-green-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* NEXT BUTTON */}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className={`px-5 py-2 rounded-xl border font-medium transition-all cursor-pointer ${currentPage === totalPages
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white hover:bg-[#0b7211] hover:text-white"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductPage;