"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { redirect } from "next/navigation";

const slides = [
    {
        id: 1,
        title: "Fresh Organic Food",
        desc: "Get healthy organic food delivered fast to your doorstep.",
        image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e",
        btn: "Buy Now",
    },
    {
        id: 2,
        title: "Healthy Breakfast Deals",
        desc: "Start your day with nutritious and delicious meals.",
        image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        btn: "Buy Now",
    },
    {
        id: 3,
        title: "Fresh Fruits & Vegetables",
        desc: "Farm fresh products straight from organic farms.",
        image:
            "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        btn: "Buy Now",
    },
];

const FoodPageSlider = () => {
    const [current, setCurrent] = useState(0);
    const [pause, setPause] = useState(false);

    // AUTO SLIDE
    useEffect(() => {
        if (pause) return;

        const timer = setInterval(() => {
            setCurrent((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(timer);
    }, [pause]);

    // NEXT
    const nextSlide = () => {
        setCurrent((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    };

    // PREV
    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <div
            className="relative w-full overflow-hidden h-[60vh] md:h-[70vh]"
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
        >
            {/* SLIDES */}
            <div
                className="flex transition-transform duration-700   ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className=" min-w-full h-[60vh]  relative group md:h-[70vh]"
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                            priority
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

                        {/* CONTENT */}
                        <div className="absolute inset-0 flex items-center px-6 md:px-28">
                            <div className="max-w-2xl text-white">
                                <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
                                    {slide.title}
                                </h1>

                                <p className="mt-5 text-white/80 text-sm md:text-lg">
                                    {slide.desc}
                                </p>

                                <button onClick={()=>{redirect(`/food/${slide?.id}`)}}  className=" cursor-pointer mt-7 px-7 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold hover:bg-[#0b7211] hover:border-[#0b7211] transition-all duration-300">
                                    {slide.btn}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DOTS */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 cursor-pointer rounded-full transition-all duration-300 ${current === i
                                ? "bg-white scale-125"
                                : "bg-white/40"
                            }`}
                    />
                ))}
            </div>

            {/* PREV BUTTON */}
            <button
                onClick={prevSlide}
                className="
                    absolute left-4 top-1/2 -translate-y-1/2
                    w-12 h-12
                    flex items-center justify-center
                    btnColor
                    cursor-pointer
                    text-white
                    rounded-full
                    backdrop-blur-md
                    transition
                "
            >
                <FiChevronLeft size={22} />
            </button>

            {/* NEXT BUTTON */}
            <button
                onClick={nextSlide}
                className="
                    absolute right-4 top-1/2 -translate-y-1/2
                    w-12 h-12
                    flex items-center justify-center
                    btnColor
                    cursor-pointer
                    text-white
                    rounded-full
                    backdrop-blur-md
                    transition
                "
            >
                <FiChevronRight size={22} />
            </button>
        </div>
    );
};

export default FoodPageSlider;