"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import BlogCard from "@/app/components/product/BlogCard";
import Image from "next/image";
import React, { useState } from "react";
export interface BlogCardType {
    id: number;
    title: string;
    desc: string;
    image: string;
    date: string;
    category: string;
}
const blogs : BlogCardType[] = [
    {
        id: 1,
        title: "Top 10 Juicy Burgers You Must Try",
        desc: "Best burger spots with extra cheese & flavor explosion.",
        image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        date: "May 2026",
        category: "Burger",
    },
    {
        id: 2,
        title: "Healthy Food That Actually Tastes Good",
        desc: "Eat clean without sacrificing taste or joy.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        date: "April 2026",
        category: "Healthy",
    },
    {
        id: 3,
        title: "Best Pizza Spots in Your City",
        desc: "Cheesy, crispy and loaded with toppings.",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
        date: "March 2026",
        category: "Pizza",
    },
    {
        id: 4,
        title: "Street Food Burger Guide",
        desc: "Discover hidden burger gems near you.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        date: "Feb 2026",
        category: "Burger",
    },
];

const categories = ["All", "Burger", "Pizza", "Healthy"];

const categoryColors: Record<string, string> = {
    Burger: "bg-yellow-100 text-yellow-700",
    Pizza: "bg-red-100 text-red-700",
    Healthy: "bg-green-100 text-green-700",
};

const BlogPage = () => {
    const [active, setActive] = useState("All");

    const filtered =
        active === "All"
            ? blogs
            : blogs.filter((b) => b.category === active);

    return (
        <MaxWidth>
            <div className="min-h-screen z-50 ">

                {/* HERO */}
                <div className=" headerBgColor py-16 text-center">
                    <h1 className="text-4xl font-bold primaryText ">
                        Food Blog 🍔
                    </h1>
                    <p className="primaryText mt-2">
                        Discover food stories, recipes & tasty ideas
                    </p>
                </div>

                {/* CATEGORY FILTER */}
                <div className="flex justify-center flex-wrap gap-3 mt-8 px-4">

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`
                            px-4 py-2 rounded-full text-sm border transition cursor-pointer
                            ${active === cat
                                    ? "btnColor text-white border-green-600  "
                                    : "bg-white text-gray-600 hover:bg-green-50 border-gray-100"
                                }
                        `}
                        >
                            {cat}
                        </button>
                    ))}

                </div>

                {/* BLOG GRID */}
                <div className="mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filtered.map((blog) => (
                        <div key={blog.id} >
                            <BlogCard blog = {blog} />
                        </div>
                    ))}

                </div>

            </div>
        </MaxWidth>
    );
};

export default BlogPage;