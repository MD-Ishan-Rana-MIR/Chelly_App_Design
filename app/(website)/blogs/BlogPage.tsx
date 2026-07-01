"use client";

import { useState } from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import BlogCard from "@/app/components/product/BlogCard";
import { useGetBlogsQuery } from "@/app/redux/blogApi";
import BlogCardSkeleton from "@/app/components/skeleton/BlogCardSkeleton";

export default function BlogPage() {
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching } = useGetBlogsQuery({
        page,
    });

    const blogs = data?.data?.data || [];
    const currentPage = data?.data?.current_page || 1;
    const lastPage = data?.data?.last_page || 1;

    if (isLoading) {
        return (
            <MaxWidth>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <BlogCardSkeleton key={index} />
                    ))}
                </div>
            </MaxWidth>
        );
    }

    return (
        <MaxWidth>
            <div className="min-h-screen">

                {/* Hero Section */}
                <div className="headerBgColor py-16 text-center rounded-xl">
                    <h1 className="text-4xl font-bold primaryText">
                        Food Blog 🍔
                    </h1>

                    <p className="primaryText mt-2">
                        Discover food stories, recipes & tasty ideas
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">

                    {blogs.map((blog: any) => (
                        <BlogCard
                            key={blog.id}
                            blog={{
                                id: blog.id,
                                title: blog.title,
                                desc: blog.content,
                                image: blog.image,
                                date: new Date(
                                    blog.created_at
                                ).toLocaleDateString(),
                                category: blog.category?.name || "Food",
                            }}
                        />
                    ))}

                </div>

                {/* Empty State */}
                {blogs.length === 0 && (
                    <div className="text-center py-20">
                        No blogs found
                    </div>
                )}

                {/* Pagination */}
                {lastPage > 1 && (
                    <div className="flex items-center justify-center gap-2 pb-12 flex-wrap">

                        <button
                            disabled={currentPage === 1 || isFetching}
                            onClick={() =>
                                setPage((prev) => prev - 1)
                            }
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from(
                            { length: lastPage },
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setPage(index + 1)
                                    }
                                    className={`px-4 py-2 rounded-lg border transition ${currentPage === index + 1
                                        ? "btnColor text-white"
                                        : "bg-white text-gray-700"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}

                        <button
                            disabled={
                                currentPage === lastPage ||
                                isFetching
                            }
                            onClick={() =>
                                setPage((prev) => prev + 1)
                            }
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>
                )}
            </div>
        </MaxWidth>
    );
}