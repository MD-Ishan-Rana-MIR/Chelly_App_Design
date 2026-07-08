// "use client";

// import { useMemo, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import MaxWidth from "../max-width/MaxWidth";
// import { useFoodWithoutSearchQuery } from "@/app/redux/foodApi";
// import { FoodType } from "@/app/lib/type";

// const tabs = [
//     "Breakfast",
//     "Lunch",
//     "Dinner",
//     "WeeklySubscription",
//     "Drinks",
// ];

// const ITEMS_PER_PAGE = 6;

// const Menu = () => {
//     // 1. Consume RTK Query directly (Pass per_page count or adjust as required)
//     const { data: foodResponse, isLoading } = useFoodWithoutSearchQuery({ perPage: 50 });
//     const router = useRouter();

//     const [activeTab, setActiveTab] = useState("All");
//     const [currentPage, setCurrentPage] = useState(1);

//     // 2. Safe extraction of array rows out of paginated response envelope
//     const products: FoodType[] = foodResponse?.data?.data || [];

//     // 3. Filter criteria matching categories
//     const filteredItems = useMemo(() => {
//         if (activeTab === "All") {
//             return products;
//         }

//         return products.filter((item) =>
//             item.category?.name?.toLowerCase().includes(activeTab.toLowerCase())
//         );
//     }, [products, activeTab]);

//     // Pagination calculations
//     const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

//     const paginatedItems = useMemo(() => {
//         return filteredItems.slice(
//             (currentPage - 1) * ITEMS_PER_PAGE,
//             currentPage * ITEMS_PER_PAGE
//         );
//     }, [filteredItems, currentPage]);

//     const handleTabChange = (tab: string) => {
//         setActiveTab(tab);
//         setCurrentPage(1);
//     };

//     return (
//         <MaxWidth>
//             {/* TITLE */}
//             <div className="text-center mx-auto mb-14">
//                 <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-[#0b7211] text-sm font-semibold mb-4">
//                     Our Delicious Menu
//                 </span>
//                 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//                     Fresh & Tasty Meals
//                     <span className="text-[#0b7211]"> Delivered Daily</span>
//                 </h1>
//                 <p className="text-gray-600 mt-5 text-lg leading-8">
//                     Explore our carefully crafted menu filled with fresh ingredients, healthy recipes, and delicious flavors.
//                 </p>
//             </div>

//             {/* TABS */}
//             <div className="flex flex-wrap justify-center gap-4 mb-14">
//                 {tabs.map((tab) => (
//                     <button
//                         key={tab}
//                         onClick={() => handleTabChange(tab)}
//                         className={`px-6 py-3 cursor-pointer rounded-xl text-sm font-semibold transition-all duration-300 border ${activeTab === tab
//                                 ? "bg-[#0b7211] text-white border-[#0b7211] shadow-lg scale-105"
//                                 : "bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-200"
//                             }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* PRODUCT GRID / LOADING STATE */}
//             {isLoading ? (
//                 <div className="text-center py-20 font-semibold text-gray-500">
//                     Loading our fresh meals...
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:mb-16 mb-8">
//                     {paginatedItems.map((item) => (
//                         <div
//                             key={item.id}
//                             className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
//                         >
//                             {/* IMAGE */}
//                             <div className="relative w-full h-60 overflow-hidden">
//                                 <Image
//                                     src={item.image || "/placeholder.png"}
//                                     alt={item.name}
//                                     fill
//                                     className="object-cover group-hover:scale-110 transition-transform duration-500"
//                                     unoptimized // Useful if local backend domains aren't defined inside next.config
//                                 />
//                                 {/* PRICE */}
//                                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#0b7211] font-bold shadow">
//                                     ${parseFloat(item.price as string).toFixed(2)}
//                                 </div>
//                             </div>

//                             {/* CONTENT */}
//                             <div className="p-6">
//                                 {/* TYPE */}
//                                 {item.category?.name && (
//                                     <p className="text-xs uppercase tracking-wide text-[#0b7211] font-semibold mb-2">
//                                         {item.category.name}
//                                     </p>
//                                 )}

//                                 {/* TITLE */}
//                                 <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
//                                     {item.name}
//                                 </h2>

//                                 {/* DESCRIPTION */}
//                                 <p className="text-gray-500 text-sm mt-3 leading-6 line-clamp-3">
//                                     {item?.description?.replace(/<\/?[^>]+(>|$)/g, "")}
//                                 </p>

//                                 {/* BUTTON */}
//                                 <button
//                                     onClick={() => router.push(`/food/${item.id}`)}
//                                     className="mt-6 w-full bg-[#0b7211] hover:bg-[#095c0e] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
//                                 >
//                                     View Details
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* EMPTY STATE */}
//             {!isLoading && paginatedItems.length === 0 && (
//                 <div className="text-center py-20">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">No Items in This Category</h2>
//                     <p className="text-gray-500">Check back later or browse another menu tab.</p>
//                 </div>
//             )}

//             {/* PAGINATION CONTROLS */}
//             {!isLoading && totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-3 pb-10">
//                     {/* PREV */}
//                     <button
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage((prev) => prev - 1)}
//                         className={`px-5 py-2 rounded-xl border font-medium transition-all cursor-pointer ${currentPage === 1
//                                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                                 : "bg-white hover:bg-[#0b7211] hover:text-white"
//                             }`}
//                     >
//                         Prev
//                     </button>

//                     {/* PAGES */}
//                     {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//                         <button
//                             key={page}
//                             onClick={() => setCurrentPage(page)}
//                             className={`w-10 h-10 rounded-xl font-semibold transition-all cursor-pointer ${currentPage === page
//                                     ? "bg-[#0b7211] text-white"
//                                     : "bg-white border hover:bg-green-50"
//                                 }`}
//                         >
//                             {page}
//                         </button>
//                     ))}

//                     {/* NEXT */}
//                     <button
//                         disabled={currentPage === totalPages}
//                         onClick={() => setCurrentPage((prev) => prev - 1)}
//                         className={`px-5 py-2 rounded-xl border font-medium transition-all cursor-pointer ${currentPage === totalPages
//                                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                                 : "bg-white hover:bg-[#0b7211] hover:text-white"
//                             }`}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </MaxWidth>
//     );
// };

// export default Menu;


"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useGetAllCollectionQuery } from '@/app/redux/collectionApi';
import { CollectionItem } from '@/app/lib/type';

const Menu = () => {
    

    const {data} = useGetAllCollectionQuery({});

    const collectionData : CollectionItem[] = data?.data || []


    console.log("collectionData",collectionData)

    

    const [activeTab, setActiveTab] = useState("Breakfast");






    return (
        <div className="w-full max-w-4xl mx-auto my-12 md:my-24 ">
            {/* TAB LINK LIST */}
            <div className="flex flex-wrap justify-center items-center gap-4">
                {collectionData?.map((item) => {
                    const isActive = activeTab === item.name;

                    return (
                        <Link
                            key={item.id}
                            href={`/collections/${item?.id}`}
                            onClick={() => setActiveTab(item.name)}
                            className={`px-8 py-3 text-sm font-semibold border text-center inline-block cursor-pointer
                                transition-all duration-300 ease-out
                                transform hover:-translate-y-1 hover:scale-105 active:scale-95
                                ${isActive
                                    ? "bg-[#33654a] text-white border-[#33654a] shadow-lg"
                                    : ""
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Menu;
