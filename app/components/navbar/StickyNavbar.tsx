"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional icons
import MaxWidth from "../max-width/MaxWidth";

const announcements = [
    "Free shipping on all orders over $50!",
    "New Summer Collection is now live!",
    "Get 20% off with code: NEXTJS20",
];

export default function StickySliderNavbar() {
    const [index, setIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
    };

    // Automatic Slide Logic
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000); // Change every 5 seconds
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="sticky top-0 z-50 w-full bg-[#0b7211] primaryColor py-3.5 shadow-md">
            <MaxWidth>
                <div className="flex items-center justify-between relative">

                    {/* Left Control */}
                    <button
                        onClick={prevSlide}
                        className="hover:opacity-70 transition-opacity z-10 cursor-pointer "
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} className=" primaryText " />
                    </button>

                    {/* Middle Sliding Text */}
                    <div className="flex-1 overflow-hidden flex justify-center items-center h-6">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="text-sm md:text-base font-medium text-center primaryText absolute"
                            >
                                {announcements[index]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Right Control */}
                    <button
                        onClick={nextSlide}
                        className="hover:opacity-70 transition-opacity z-10 cursor-pointer "
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} className=" primaryText " />
                    </button>

                </div>
            </MaxWidth>
        </div>
    );
}

