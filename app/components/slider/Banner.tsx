"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllBannerQuery } from "@/app/redux/bannerApi";
import { BannerType } from "@/app/lib/type";
import HeroBannerSkeleton from "../skeleton/BannerSkeleton";

const Banner = () => {
    const [current, setCurrent] = useState(0);

    const { data, isLoading } = useGetAllBannerQuery(undefined);


    const foods = data?.data?.data || [];

    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

    useEffect(() => {
        if (!foods.length) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % foods.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [foods.length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? foods.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % foods.length);
    };

    if (isLoading) {
        return (
            <HeroBannerSkeleton/>
        );
    }

    if (!foods.length) {
        return null;
    }

    return (
        <section className="w-full h-[70vh] relative overflow-hidden">
            {/* SLIDER WRAPPER */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {foods.map((food: BannerType) => (
                    <div
                        key={food.id}
                        className="min-w-full h-[70vh] relative group"
                    >
                        <Image
                            src={`${imageBaseUrl}/${food.image}`}
                            alt={food.title}
                            fill
                            priority
                            unoptimized
                            className="object-cover group-hover:scale-105 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute bottom-16 left-10">
                            <h1 className="text-white text-4xl font-bold">
                                {food.title}
                            </h1>

                            {/* <button className=" mt-4 px-6 py-3 bg-[#0b7211] text-white rounded-xl hover:bg-[#095c0e] transition  cursor-pointer  " >
                                Order Now
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* CONTROLS */}
            <button
                onClick={prevSlide}
                className="
          absolute left-5 top-1/2 -translate-y-1/2
          btnColor text-white p-3 rounded-full
          cursor-pointer
        "
            >
                <ChevronLeft />
            </button>

            <button
                onClick={nextSlide}
                className="
          absolute right-5 top-1/2 -translate-y-1/2
          btnColor text-white p-3 rounded-full
          cursor-pointer
        "
            >
                <ChevronRight />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-6 w-full flex justify-center gap-2">
                {foods.map((_: number, index: number) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`
              w-2.5 h-2.5 rounded-full cursor-pointer
              ${current === index ? "bg-white" : "bg-white/50"}
            `}
                    />
                ))}
            </div>
        </section>
    );
};

export default Banner;