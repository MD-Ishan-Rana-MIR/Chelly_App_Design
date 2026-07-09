"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth';
import BlogCardSkeleton from '@/app/components/skeleton/BlogCardSkeleton';
import { Blog } from '@/app/lib/type';
import { useGetBlogsQuery } from '@/app/redux/blogApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ITEMS_PER_PAGE = 10;
export default function NewsPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: responseEnvelope, isLoading, isError } = useGetBlogsQuery({
        current_page: currentPage,
        per_page: ITEMS_PER_PAGE
    });

    // Exact response data mapping
    const newsItems: Blog[] = responseEnvelope?.data?.data || [];


    const totalPages = responseEnvelope?.data?.last_page || Math.ceil((newsItems.length) / ITEMS_PER_PAGE);

    // Render loading state
    if (isLoading) {
        return (
            <MaxWidth>
                <BlogCardSkeleton />
            </MaxWidth>
        );
    }

    // Render error state
    if (isError) {
        return (
            <MaxWidth>
                <div className="flex justify-center items-center min-h-100 text-red-600 font-sans font-medium">
                    Failed to load news. Please try again later.
                </div>
            </MaxWidth>
        );
    }



    return (
        <MaxWidth>
            <section className="mx-auto font-sans py-12 bg-white">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-[#0c5a1d] text-4xl md:text-5xl font-serif font-medium tracking-tight">
                        News
                    </h2>
                </div>

                {/* Empty State Guard */}
                {newsItems.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 font-sans">
                        No news articles available at the moment.
                    </div>
                ) : (
                    <>
                        {/* Asymmetrical Custom Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {newsItems.map((item, index) => {
                                // Index 0 (1st item) and Index 3 (4th item) span across both columns
                                const isFullWidth = index === 0 || index === 3;

                                return (
                                    <div
                                        onClick={() => { router.push(`/blog-details/${item?.id}`) }}
                                        key={item.id}
                                        className={`
                                            bg-[#33654a] rounded-2xl py-8 md:py-10 px-6 md:p-8 flex flex-col justify-center cursor-pointer 
                                            shadow-sm transform transition-all duration-300 ease-out 
                                            hover:-translate-y-1 hover:bg-[#2a543d] hover:shadow-xl group
                                            ${isFullWidth ? 'md:col-span-2 text-center px-8 md:px-24' : 'text-left'}
                                        `}
                                    >
                                        <div>
                                            {/* Title */}
                                            <h3 className="text-white text-xl md:text-2xl font-serif font-medium leading-snug mb-2 tracking-wide group-hover:text-neutral-100 transition-colors duration-300">
                                                {item.title}
                                            </h3>

                                            {/* Localized Date String Parsing */}
                                            <p className="text-[#a4c5b3] text-[10px] font-sans font-semibold tracking-widest uppercase mb-4">
                                                {item.created_at ? new Date(item.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                }) : ''}
                                            </p>

                                            {/* Clean HTML Content Snippet Parsing */}
                                            <p className="text-[#cce2d6] text-sm leading-relaxed font-normal font-sans opacity-90 mx-auto max-w-4xl line-clamp-3">
                                                {item.content
                                                    ? item.content.replace(/<[^>]*>/g, '') // Strips HTML tags cleanly
                                                    : 'No description available.'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination Section */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-[#33654a] hover:bg-[#f0f5f2] disabled:opacity-40 disabled:hover:bg-transparent"
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-9 h-9 text-sm font-semibold rounded-lg transition-all duration-200 ${currentPage === i + 1
                                            ? 'bg-[#33654a] text-white shadow-sm'
                                            : 'text-[#33654a] hover:bg-[#f0f5f2]'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-[#33654a] hover:bg-[#f0f5f2] disabled:opacity-40 disabled:hover:bg-transparent"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </MaxWidth>
    );
}