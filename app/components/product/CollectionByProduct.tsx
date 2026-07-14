"use client"

import { CollectionFoodItem } from '@/app/lib/type';
import { useGetCollectionByFoodQuery } from '@/app/redux/collectionApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CollectionByProduct({ id }: { id: number | null }) {
    // skip: !id stops the query from executing if id is null
    const { data, isLoading } = useGetCollectionByFoodQuery(id, { skip: !id });

    const router = useRouter();

    const collectionFoodData: CollectionFoodItem[] = data?.data?.foods?.data || [];

    

    return (
        <section className="mx-auto font-sans my-16 md:my-32 md:mb-18 mb-8">

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                {/* Skeleton Loader State */}
                {isLoading ? (
                    // Generates 4 skeleton cards to fill the initial grid row
                    Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={`food-skeleton-${index}`}
                            className="bg-[#f7f9f6] rounded-2xl p-4 flex flex-col justify-between border border-black/[0.02] shadow-sm animate-pulse"
                        >
                            {/* Image Container Skeleton */}
                            <div className="relative w-full aspect-square rounded-xl mb-4 bg-[#ecefe9] flex items-center justify-center">
                                {/* Mimic Badge */}
                                <div className="absolute top-3 left-3 bg-white/60 h-5 w-14 rounded-full"></div>
                            </div>

                            {/* Product Details Skeleton */}
                            <div className="space-y-2 pt-2">
                                {/* Title block placeholder */}
                                <div className="h-3 bg-[#ecefe9] rounded w-3/4"></div>
                                {/* Price block placeholder */}
                                <div className="h-4 bg-[#ecefe9] rounded w-1/3"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Actual Data State
                    collectionFoodData.map((item) => (
                        <div
                            onClick={()=>{router?.push(`/food/${item?.id}`)}}
                            key={item.id}
                            className="group bg-[#f7f9f6] rounded-2xl p-4 flex flex-col justify-between border border-black/[0.02] shadow-sm transition-all duration-300 ease-in-out hover:bg-white hover:shadow-md hover:border-black/[0.05] cursor-pointer"
                        >
                            {/* Image Container with Badges */}
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-[#ecefe9]">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                />

                                {/* "Sold out" Badge */}
                                {
                                    (item?.status?.toLowerCase() !== "available" && item?.status?.toLowerCase() !== "active") || (item?.stock !== undefined && item?.stock <= 0) ? (
                                        <span className="absolute top-3 left-3 z-10 bg-white/95 text-[#5ea36c] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                                            Sold out
                                        </span>
                                    ) : null
                                }
                            </div>

                            {/* Product Details */}
                            <div className="space-y-1 pt-2">
                                <h3 className="text-[#3c5942] text-xs font-serif font-medium tracking-wide group-hover:text-[#0c5a1d] transition-colors duration-300">
                                    {item.name}
                                </h3>
                                <p className="text-[#2b5c35] text-sm font-semibold">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}