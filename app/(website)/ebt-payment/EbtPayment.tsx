import React from 'react';
import Image from 'next/image';
import MaxWidth from '@/app/components/max-width/MaxWidth';
import Link from 'next/link';

export default function EbtBanner() {
    return (
        <div className="w-full bg-white py-8 md:py-16 px-4 md:px-0">
            <MaxWidth>
                {/* Responsive Grid Splitter */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Left Column: Typography & Action */}
                    <div className="flex flex-col justify-center order-2 md:order-1 text-left  ">
                        {/* Small Tagline */}
                        <span className="text-[#137333] text-xs md:text-sm font-semibold tracking-wider uppercase mb-2">
                            Lovely's Meals
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-[#137333] font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Enjoy Delicious Meals with EBT!
                        </h1>

                        {/* Subtext Description */}
                        <p className="text-[#4caf50] font-medium text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                            Now you can use your EBT card to purchase our nutritious meals and weekly menus.
                        </p>

                        {/* Interactive Button */}
                        <div>
                            <Link
                                href={"/ebt-payment-form"}

                                type="button"
                                className="bg-[#0b6623] hover:bg-[#084d1a] text-white font-medium text-sm sm:text-base px-6 py-3 rounded shadow transition-colors duration-200"
                            >
                                Order Here
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: High Impact Badge Image */}
                    <div className="flex justify-center md:justify-end order-1 md:order-2  ">
                        <div className="w-full max-w-[650px] aspect-square relative bg-[#e3180a] rounded-2xl p-6 flex flex-col justify-center items-center shadow-sm select-none">
                            <span className="text-white font-sans font-black text-4xl sm:text-5xl tracking-wide uppercase text-center mb-1">
                                We Accept
                            </span>
                            <span className="text-white font-sans font-black text-[9rem] sm:text-[12rem] leading-none uppercase tracking-tighter">
                                EBT
                            </span>
                        </div>
                    </div>

                </div>
            </MaxWidth>
        </div>
    );
}