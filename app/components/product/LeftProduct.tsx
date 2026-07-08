import { FoodType } from "@/app/lib/type";
import { useTwoMealApiQuery } from "@/app/redux/foodApi";
import Image from "next/image";
import Link from "next/link";
import MaxWidth from "../max-width/MaxWidth";

const LeftProduct = () => {
    const { data, isLoading } = useTwoMealApiQuery({});

    const towMealData: FoodType[] = data?.data?.data || [];
    const singleData: FoodType | null = towMealData[0] || null;


    if (isLoading) {
        return (
            <div>
                <MaxWidth>
                    <div className="animate-pulse h-96 bg-gray-100 rounded-3xl mb-12 w-full" />
                </MaxWidth>
            </div>
        );
    }

    if (!singleData) return null;

    return (
        <div>
            <MaxWidth>
                <div>
                    <div className="flex flex-col md:flex-row gap-x-10 mb-12 space-y-10 md:space-y-0 font-sans">

                        {/* Left Column: Image Gallery/Display */}
                        <div className="md:w-[60%] w-full relative flex items-center justify-center">
                            <div className="relative w-full md:h-192 h-80 rounded-3xl overflow-hidden shadow-sm">
                                {/* Main Dish Image */}
                                {singleData?.image && (
                                    <Image
                                        src={singleData.image}
                                        alt={singleData.name || "Food Image"}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right Column: Content / Text Area */}
                        {/* Added overflow-hidden to prevent inner HTML elements from overflowing */}
                        <div className="md:w-[40%] w-full flex flex-col justify-center bg-white overflow-hidden p-4 md:p-6">
                            <div>
                                {/* Heading */}
                                <h2 className="text-[#1e6b27] text-3xl md:text-4xl font-semibold tracking-wide break-words">
                                    {singleData?.name}
                                </h2>

                                {/* Body Paragraphs Rendered Safely from HTML */}
                                {/* Added break-words and cleared any possible wrapping bugs */}
                                <div
                                    className="space-y-6 text-[#2e7d32] font-medium leading-relaxed text-sm md:text-base my-3 break-words whitespace-normal"
                                    dangerouslySetInnerHTML={{ __html: singleData?.description || '' }}
                                />

                                {/* Action Button */}
                                <div className="pt-4">
                                    <Link
                                        href={`/food/${singleData?.id}`}
                                        className="inline-block bg-[#0f621a] cursor-pointer font-semibold hover:bg-[#0a4612] text-white py-3 px-8 rounded-md transition-colors duration-200 text-sm tracking-wide"
                                    >
                                        Shop Now
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default LeftProduct;