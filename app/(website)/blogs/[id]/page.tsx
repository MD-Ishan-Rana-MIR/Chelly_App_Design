"use client";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import {
    FaClock,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";

const blogs = [
    {
        id: 1,
        title: "Top 10 Juicy Burgers You Must Try This Year 🍔",
        desc: "Best burger spots with extra cheese & flavor explosion.",
        image:
            "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        date: "May 2026",
        category: "Burger",
        readTime: "5 min read",
        content:
            "Burgers are one of the most loved comfort foods around the world. From crispy chicken burgers to juicy beef patties loaded with cheese, every city has its own hidden gems waiting to be discovered.",
    },
    {
        id: 2,
        title: "Healthy Food That Actually Tastes Good 🥗",
        desc: "Eat clean without sacrificing taste or joy.",
        image:
            "https://images.unsplash.com/photo-1550547660-d9450f859349",
        date: "April 2026",
        category: "Healthy",
        readTime: "4 min read",
        content:
            "Healthy meals can be delicious too. Fresh vegetables, balanced proteins and flavorful sauces make healthy food enjoyable and satisfying.",
    },
    {
        id: 3,
        title: "Best Pizza Spots in Your City 🍕",
        desc: "Cheesy, crispy and loaded with toppings.",
        image:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e",
        date: "March 2026",
        category: "Pizza",
        readTime: "6 min read",
        content:
            "Pizza lovers always search for the perfect slice. Crispy crust, rich tomato sauce and melted cheese make pizza one of the most iconic foods ever.",
    },
];

const BlogDetailsPage = () => {

    const params = useParams();

    const id = Number(params.id);

    const blog = blogs.find((item) => item.id === id);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
                Blog Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen ">

            {/* HERO */}
            <div className="relative w-full headerBgColor h-75 md:h-125 overflow-hidden">

                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

                    <div className="text-center text-white px-4">

                        <span className="bg-green-600 px-4 py-1 rounded-full text-sm">
                            {blog.category}
                        </span>

                        <h1 className="text-3xl md:text-5xl font-bold mt-4 max-w-3xl">
                            {blog.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/80">

                            <p>By FoodExpress</p>

                            <div className="flex items-center gap-1">
                                <FaClock />
                                <span>{blog.readTime}</span>
                            </div>

                            <p>{blog.date}</p>

                        </div>

                    </div>

                </div>

            </div>

            {/* CONTENT */}
            <MaxWidth>
                <div className="py-12">

                    <p className="text-lg text-gray-600 leading-8">
                        {blog.content}
                    </p>

                    {/* EXTRA IMAGE */}
                    <div className="relative w-full h-62.5 md:h-112.5 rounded-2xl overflow-hidden my-10">

                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />

                    </div>

                    {/* BLOG SECTION */}
                    <div className="space-y-6">

                        <div>
                            <h2 className="text-2xl font-bold mb-3">
                                Why People Love {blog.category} 🍽️
                            </h2>

                            <p className="text-gray-600 leading-8">
                                Delicious flavors, premium ingredients and unique recipes
                                make {blog.category.toLowerCase()} foods popular among food lovers.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-3">
                                Final Thoughts ✨
                            </h2>

                            <p className="text-gray-600 leading-8">
                                Explore new restaurants, enjoy amazing meals and discover
                                your next favorite food experience with FoodExpress.
                            </p>
                        </div>

                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-3 mt-10">

                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                            {blog.category}
                        </span>

                        <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                            Food
                        </span>

                        <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm">
                            Trending
                        </span>

                    </div>

                    {/* SHARE */}
                    <div className="mt-12 border-t border-gray-100 pt-8">

                        <h3 className="text-xl font-bold mb-4">
                            Share this article
                        </h3>

                        <div className="flex gap-4">

                            <div className="p-3 border border-gray-100 rounded-full hover:bg-green-50 hover:scale-110 transition cursor-pointer">
                                <FaFacebookF />
                            </div>

                            <div className="p-3 border border-gray-100 rounded-full hover:bg-green-50 hover:scale-110 transition cursor-pointer">
                                <FaInstagram />
                            </div>

                            <div className="p-3 border border-gray-100 rounded-full hover:bg-green-50 hover:scale-110 transition cursor-pointer">
                                <FaTwitter />
                            </div>

                        </div>

                    </div>

                </div>
            </MaxWidth>

        </div>
    );
};

export default BlogDetailsPage;