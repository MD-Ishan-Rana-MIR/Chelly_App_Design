"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

type Props = {
    images: string[];
    alt: string;
};

const ProductParomaView = ({ images, alt }: Props) => {

    const [active, setActive] = useState(images?.[0]);
    const [scale, setScale] = useState(1);

    const zoomIn = () => setScale((p) => Math.min(p + 0.2, 2.5));
    const zoomOut = () => setScale((p) => Math.max(p - 0.2, 1));

    return (
        <div className="w-full h-[80vh] ">

            {/* MAIN IMAGE */}
            <div className="relative w-full  h-[55vh]  overflow-hidden   px-4 rounded-2xl ">

                <Image
                    src={active}
                    alt={alt}
                    fill
                    className="object-cover transition-all duration-300"
                    style={{
                        transform: `scale(${scale})`,
                    }}
                />

                {/* ZOOM BUTTONS */}
                <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">

                    <button
                        onClick={zoomIn}
                        className="w-10 h-10 cursor-pointer bg-white shadow rounded-full flex items-center justify-center"
                    >
                        <FiZoomIn />
                    </button>

                    <button
                        onClick={zoomOut}
                        className="w-10 h-10 cursor-pointer bg-white shadow rounded-full flex items-center justify-center"
                    >
                        <FiZoomOut />
                    </button>

                </div>

            </div>

            {/* THUMBNAILS (IMPORTANT FIX HERE) */}
            <div className="flex gap-3 mt-5 h-[90vh] overflow-x-auto w-full  ">

                {images?.map((img, i) => (

                    <div
                        key={i}
                        onClick={() => {
                            setActive(img);
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
                            transition
                            ${active === img
                                ? "border-[#0b7211]"
                                : "border-gray-200"
                            }
                        `}
                    >

                        <Image
                            src={img}
                            alt="thumb"
                            fill
                            className="object-cover"
                        />

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ProductParomaView;