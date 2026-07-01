"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaClock, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import BlogDetailsSkeleton from "@/app/components/skeleton/BlogDetailsSkeleton";
import { errorMessage } from "@/app/lib/errorMsg";

type BlogCategory = {
    id: number;
    name: string;
};

type Blog = {
    id: number;
    title: string;
    content: string;
    image: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    category: BlogCategory;
};

const BlogDetailsPage = ({ id }: { id: string }) => {
    const handleShare = (type: "facebook" | "twitter" | "instagram") => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(blog?.title || "");

        if (type === "facebook") {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                "_blank"
            );
        }

        if (type === "twitter") {
            window.open(
                `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
                "_blank"
            );
        }

        if (type === "instagram") {
            // Instagram does NOT support direct web sharing
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied! Open Instagram and paste it.");
        }
    };



    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${id}`
                );

                setBlog(res.data.data);
            } catch (error) {
                return errorMessage(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <>
                <BlogDetailsSkeleton />
            </>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
                Blog Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* HERO */}
            <div className="relative w-full h-80 md:h-125 overflow-hidden">
                <Image
                    src={
                        blog.image ||
                        "https://images.unsplash.com/photo-1550547660-d9450f859349"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <span className="bg-green-600 px-4 py-1 rounded-full text-sm">
                            {blog.category?.name}
                        </span>

                        <h1 className="text-3xl md:text-5xl font-bold mt-4 max-w-3xl">
                            {blog.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/80">
                            <div className="flex items-center gap-1">
                                <FaClock />
                                <span>
                                    {new Date(blog.created_at).toDateString()}
                                </span>
                            </div>

                            <p>Status: {blog.status}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <MaxWidth>
                <div className="py-12">
                    {/* HTML CONTENT */}
                    <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-3 mt-10">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                            {blog.category?.name}
                        </span>

                        <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                            Blog
                        </span>

                        <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm">
                            Trending
                        </span>
                    </div>

                    {/* SHARE */}
                    <div className="flex gap-4 md:my-8 my-5 ">
                        <div
                            onClick={() => handleShare("facebook")}
                            className="p-3 border rounded-full cursor-pointer hover:bg-green-50"
                        >
                            <FaFacebookF />
                        </div>

                        <div
                            onClick={() => handleShare("instagram")}
                            className="p-3 border rounded-full cursor-pointer hover:bg-green-50"
                        >
                            <FaInstagram />
                        </div>

                        <div
                            onClick={() => handleShare("twitter")}
                            className="p-3 border rounded-full cursor-pointer hover:bg-green-50"
                        >
                            <FaTwitter />
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default BlogDetailsPage;