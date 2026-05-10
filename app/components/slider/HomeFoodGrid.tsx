"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const foods = [
    {
        id: 1,
        title: "Cheese Burger",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
        id: 2,
        title: "Chicken Pizza",
        image:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e",
    },
    {
        id: 3,
        title: "Grilled Steak",
        image:
            "https://images.unsplash.com/photo-1544025162-d76694265947",
    },
    {
        id: 4,
        title: "Fresh Salad",
        image:
            "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
    },
];

const HeroFoodSection = () => {
    const [current, setCurrent] = useState(0);

    // AUTO SLIDE
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % foods.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? foods.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % foods.length);
    };

    return (
        <section className="w-full h-[88vh] relative overflow-hidden">

            {/* SLIDER WRAPPER */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >

                {foods.map((food) => (

                    <div
                        key={food.id}
                        className="min-w-full h-[90vh] relative group"
                    >

                        {/* IMAGE */}
                        <Image
                            src={food.image}
                            alt={food.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* CONTENT */}
                        <div className="absolute bottom-16 left-10">

                            <h1 className="text-white text-4xl font-bold">
                                {food.title}
                            </h1>

                            <button
                                className="
                  mt-4
                  px-6
                  py-3
                  bg-[#0b7211]
                  text-white
                  rounded-xl
                  hover:bg-[#095c0e]
                  transition
                  cursor-pointer
                "
                            >
                                Order Now
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* CONTROLS */}
            <button
                onClick={prevSlide}
                className="
          absolute  cursor-pointer left-5 top-1/2 -translate-y-1/2
          bg-white/80 hover:bg-white
          p-3 rounded-full
        "
            >
                <ChevronLeft />
            </button>

            <button
                onClick={nextSlide}
                className="
          absolute right-5 cursor-pointer top-1/2 -translate-y-1/2
          bg-white/80 hover:bg-white
          p-3 rounded-full
        "
            >
                <ChevronRight />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-6 w-full flex justify-center gap-2">

                {foods.map((_, index) => (

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

export default HeroFoodSection;