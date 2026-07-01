import React from 'react'
import MaxWidth from '../max-width/MaxWidth'

const OrderDetailsSkeleton = () => {
    return (
        <MaxWidth>
            <div>
                <div className="mx-auto py-10 animate-pulse">
                    {/* HEADER SKELETON */}
                    <div className="mb-8">
                        <div className="h-9 w-48 bg-gray-200 rounded-lg mb-2"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
                    </div>

                    {/* MOBILE CARDS SKELETON */}
                    <div className="grid gap-4 md:hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white border rounded-xl p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="h-5 w-28 bg-gray-200 rounded"></div>
                                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                <div className="flex justify-between items-center pt-2">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-5 w-16 bg-gray-200 rounded"></div>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP TABLE SKELETON */}
                    <div className="hidden md:block bg-white border rounded-xl overflow-hidden mb-6">
                        <div className="bg-gray-50 border-b px-6 py-4 grid grid-cols-6 gap-4">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-14"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="px-6 py-5 grid grid-cols-6 gap-4 items-center">
                                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    <div className="h-4 bg-gray-200 rounded w-14 font-semibold"></div>
                                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    <div className="flex gap-3">
                                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PAGINATION PANEL SKELETON */}
                    <div className="bg-white border p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                        <div className="flex items-center gap-2">
                            <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
                            <div className="h-9 w-32 bg-gray-200 rounded-lg"></div>
                            <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidth>
    )
}

export default OrderDetailsSkeleton
