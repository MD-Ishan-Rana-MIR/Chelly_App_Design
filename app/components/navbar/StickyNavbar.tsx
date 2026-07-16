"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import MaxWidth from "../max-width/MaxWidth";
import { OfferType } from "@/app/lib/type";
import OfferSliderSkeleton from "../skeleton/OfferSliderSkeleton";
import { errorMessage } from "@/app/lib/errorMsg";
import Link from "next/link";

export default function StickySliderNavbar() {
    const [index, setIndex] = useState(0);
    const [announcements, setAnnouncements] = useState<{ title: string, link: string | null }[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/offers`
                );

                const data = await res.json();

                const items =
                    data?.data?.data?.map((item: OfferType) => ({
                        title: item.title.replace(/<[^>]*>/g, ""),
                        link: item.link || null
                    })) || [];

                setAnnouncements(items);
            } catch (error) {
                return errorMessage(error); 
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const nextSlide = useCallback(() => {
        if (!announcements.length) return;

        setIndex((prev) =>
            prev === announcements.length - 1 ? 0 : prev + 1
        );
    }, [announcements]);

    const prevSlide = () => {
        if (!announcements.length) return;

        setIndex((prev) =>
            prev === 0 ? announcements.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (!announcements.length) return;

        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide, announcements]);

    if (!announcements.length) return null;
    if (loading) {
        return <OfferSliderSkeleton />;
    }

    return (
        <div className="sticky top-0 z-50 w-full bg-[#0b7211] py-3.5 shadow-md">
            <MaxWidth>
                <div className="flex items-center justify-between relative">

                    <button className=" cursor-pointer " onClick={prevSlide}>
                        <ChevronLeft size={20} className="text-white" />
                    </button>

                    <div className="flex-1 flex justify-center items-center h-6 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-white text-sm md:text-base font-medium absolute text-center"
                            >
                                {announcements[index]?.link ? (
                                    <Link href={announcements[index].link} className="flex items-center gap-1.5 group cursor-pointer">
                                        <span className="underline underline-offset-4">{announcements[index].title}</span>
                                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                ) : (
                                    <span>{announcements[index]?.title}</span>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className=" cursor-pointer " onClick={nextSlide}>
                        <ChevronRight size={20} className="text-white" />
                    </button>

                </div>
            </MaxWidth>
        </div>
    );
}