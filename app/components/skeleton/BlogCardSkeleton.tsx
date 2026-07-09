"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";

const BlogCardSkeleton = () => {
    return (
        // Replicating an empty items array length loop matching ITEMS_PER_PAGE (4)
        <MaxWidth>
            <section className="mx-auto font-sans py-12 bg-white animate-pulse">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-12 w-32 bg-gray-200 rounded-lg" />
                </div>

                {/* Asymmetrical Custom Grid Skeleton Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => {
                        // Replicating layout positions: 1st (0) and 4th (3) span full width
                        const isFullWidth = index === 0 || index === 3;

                        return (
                            <div
                                key={index}
                                className={`
                                    bg-gray-100 rounded-2xl py-8 md:py-10 px-6 md:p-8 flex flex-col justify-center min-h-[180px]
                                    ${isFullWidth ? 'md:col-span-2 items-center text-center px-8 md:px-24' : 'items-start text-left'}
                                `}
                            >
                                <div className={`w-full flex flex-col ${isFullWidth ? 'items-center' : 'items-start'}`}>
                                    {/* TITLE */}
                                    <div className={`h-6 bg-gray-200 rounded mb-3 w-3/4 ${isFullWidth ? 'md:w-1/2' : ''}`} />
                                    <div className={`h-6 bg-gray-200 rounded mb-4 w-1/2 ${isFullWidth ? 'hidden' : ''}`} />

                                    {/* DATE */}
                                    <div className="h-3 w-20 bg-gray-200 rounded mb-5" />

                                    {/* EXCERPT BODY LINES */}
                                    <div className="w-full space-y-2.5">
                                        <div className="h-3.5 w-full bg-gray-200 rounded" />
                                        <div className="h-3.5 w-full bg-gray-200 rounded" />
                                        <div className={`h-3.5 bg-gray-200 rounded ${isFullWidth ? 'w-2/3' : 'w-4/5'}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </MaxWidth>
    );
};

export default BlogCardSkeleton;