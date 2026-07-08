import { FoodType } from '@/app/lib/type';
import { useTwoMealApiQuery } from '@/app/redux/foodApi';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CoolCrisp = () => {
    const { data, isLoading } = useTwoMealApiQuery({});

    const towMealData: FoodType[] = data?.data?.data || [];
    const singleData: FoodType | null = towMealData[1] || null;
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-x-10 mb-12 space-y-10 font-sans">

                {/* Left Column: Image Gallery/Display */}
                <div className=" md:w-[40%] w-full  flex flex-col justify-center  bg-white   ">
                    <div className="">

                        {/* Heading */}
                        <h2 className="text-[#1e6b27] text-3xl md:text-4xl font-semibold tracking-wide">
                            {singleData?.name}

                        </h2>

                        {/* Body Paragraphs */}
                        <div
                            className="space-y-6 text-[#2e7d32] font-medium leading-relaxed text-sm md:text-base my-3 break-words whitespace-normal"
                            dangerouslySetInnerHTML={{ __html: singleData?.description || '' }}
                        />

                        {/* Action Button */}
                        <div className="pt-4">
                            <Link href={`/food/${singleData?.id}`} className="bg-[#0f621a] cursor-pointer font-semibold  hover:bg-[#0a4612] text-white  py-3 px-8 transition-colors duration-200 text-sm tracking-wide">
                                Shop Now
                            </Link>
                        </div>

                    </div>
                </div>


                {/* Right Column: Content / Text Area */}

                <div className="md:w-[60%] w-full  relative flex items-center justify-center  ">
                    <div className="relative w-full md:h-192 h-80 rounded-3xl overflow-hidden shadow-sm">
                        {/* Main Dish Image */}
                        <Image
                            src={singleData?.image} // Replace with your actual image path in the public folder
                            alt="Lovely's Lettuce Wraps"
                            fill
                            className="object-cover "
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoolCrisp
