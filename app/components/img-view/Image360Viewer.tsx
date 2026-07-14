"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiZoomIn, FiZoomOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
    images: string[];
    alt: string;
};

const ProductParomaView = ({ images, alt }: Props) => {
    // Filter out undefined/null images just in case
    const validImages = images?.filter(img => img) || [];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scale, setScale] = useState(1);

    // Reset when images change
    useEffect(() => {
        setCurrentIndex(0);
        setScale(1);
    }, [images]);

    const active = validImages[currentIndex];

    const zoomIn = () => setScale((p) => Math.min(p + 0.2, 2.5));
    const zoomOut = () => setScale((p) => Math.max(p - 0.2, 1));
    
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
        setScale(1);
    };
    
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
        setScale(1);
    };

    if (validImages.length === 0) return null;

    return (
        <div className="w-full flex flex-col gap-4">

            {/* MAIN IMAGE */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 group">

                <Image
                    src={active}
                    alt={alt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300"
                    style={{
                        transform: `scale(${scale})`,
                    }}
                />

                {/* ZOOM BUTTONS */}
                <div className="absolute top-4 right-4 flex flex-col gap-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={zoomIn}
                        className="w-10 h-10 cursor-pointer bg-white/90 backdrop-blur shadow-md rounded-full flex items-center justify-center text-gray-700 hover:text-[#0b7211] transition"
                    >
                        <FiZoomIn size={18} />
                    </button>
                    <button
                        onClick={zoomOut}
                        className="w-10 h-10 cursor-pointer bg-white/90 backdrop-blur shadow-md rounded-full flex items-center justify-center text-gray-700 hover:text-[#0b7211] transition"
                    >
                        <FiZoomOut size={18} />
                    </button>
                </div>
                
                {/* SLIDER ARROWS */}
                {validImages.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur shadow-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-[#0b7211] opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                        >
                            <FiChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur shadow-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-[#0b7211] opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                        >
                            <FiChevronRight size={24} />
                        </button>
                    </>
                )}

            </div>

            {/* THUMBNAILS */}
            {validImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto w-full pb-2 scrollbar-hide">
                    {validImages.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                setCurrentIndex(i);
                                setScale(1);
                            }}
                            className={`
                                relative
                                min-w-[80px]
                                h-[80px]
                                rounded-xl
                                overflow-hidden
                                cursor-pointer
                                border-2
                                flex-shrink-0
                                transition-all
                                ${currentIndex === i
                                    ? "border-[#0b7211] shadow-md opacity-100"
                                    : "border-transparent opacity-60 hover:opacity-100"
                                }
                            `}
                        >
                            <Image
                                src={img}
                                alt={`thumb-${i}`}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductParomaView;