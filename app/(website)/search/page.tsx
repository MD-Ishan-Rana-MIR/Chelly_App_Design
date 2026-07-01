"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import { useSearchParams } from "next/navigation";
import { useFoodSearchQuery } from "@/app/redux/foodApi";
import ProductCard from "@/app/components/product/ProductCard";
import { FoodType } from "@/app/lib/type";
import FoodCardSkeleton from "@/app/components/skeleton/FoodCardSkeleton";

const SearchProduct = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("value") || "";

    const { data, isLoading } = useFoodSearchQuery(search);
    const perPage = 10;
    const foods: FoodType[] = data?.data?.data || [];

    return (
        <section className="py-10 bg-gray-50 min-h-screen">
            <MaxWidth>

                {/* TITLE */}
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    Search Results for:{" "}
                    <span className="text-[#0b7211]">
                        {search}
                    </span>
                </h1>

                {/* LOADING */}
                {/* LOADING */}
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: perPage }).map((_, i) => (
                            <FoodCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* EMPTY STATE */}
                {!isLoading && foods.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold text-gray-600">
                            No food found 😢
                        </h2>
                        <p className="text-gray-400 mt-2">
                            Try searching with different keywords
                        </p>
                    </div>
                )}

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {foods?.map((food) => (
                        <div
                            key={food.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group"
                        >
                            {
                                <ProductCard product={food} />
                            }


                        </div>
                    ))}
                </div>

            </MaxWidth>
        </section>
    );
};

export default SearchProduct;