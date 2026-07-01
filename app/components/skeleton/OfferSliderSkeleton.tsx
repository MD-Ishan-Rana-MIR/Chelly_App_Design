"use client";

import MaxWidth from "../max-width/MaxWidth";

const OfferSliderSkeleton = () => {
    return (
        <div className="sticky top-0 z-50 w-full bg-[#0b7211] py-3.5 shadow-md">
            <MaxWidth>
                <div className="flex items-center justify-between animate-pulse">

                    {/* Left Arrow */}
                    <div className="w-5 h-5 rounded bg-white/30" />

                    {/* Center Text */}
                    <div className="flex-1 flex justify-center px-4">
                        <div className="h-4 w-64 md:w-96 rounded bg-white/30" />
                    </div>

                    {/* Right Arrow */}
                    <div className="w-5 h-5 rounded bg-white/30" />

                </div>
            </MaxWidth>
        </div>
    );
};

export default OfferSliderSkeleton;