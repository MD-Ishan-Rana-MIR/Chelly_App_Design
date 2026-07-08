'use client';

import MaxWidth from '@/app/components/max-width/MaxWidth';
import { useState } from 'react';

const newsItems = [
    {
        id: 1,
        title: 'The Importance of Carbohydrates, Fats, and Prot...',
        date: 'APRIL 25, 2025',
        excerpt: 'Carbohydrates, fats, and proteins are the three macronutrients that provide the body with the energy it needs to function optimally. They are essential to a balanced diet, as each serves...',
    },
    {
        id: 2,
        title: 'Reducing Sugar Intake in Daily Meal Plans',
        date: 'APRIL 25, 2025',
        excerpt: 'Photo by Nano Erdozain on Pexels.com Reducing sugar intake is a crucial step toward improving overall health and preventing chronic diseases such as obesity, type 2 diabetes, and heart disease. The...',
    },
    {
        id: 3,
        title: 'Staying Hydrated and Weight Loss',
        date: 'APRIL 25, 2025',
        excerpt: 'Photo by Юлия Блоцкая on Pexels.com Hydration plays a critical role in maintaining overall health, and it can significantly impact weight loss efforts. While drinking water may not directly cause weight...',
    },
    {
        id: 4,
        title: '80/20 Rule',
        date: 'APRIL 25, 2025',
        excerpt: 'Photo by RDNE Stock project on Pexels.com The 80/20 rule for dieting and exercise emphasizes balance, sustainability, and flexibility. It’s a simple framework suggesting that you should focus on healthy habits...',
    },
    // --- Page 2 ---
    {
        id: 5,
        title: 'The Role of Micronutrients in Immunity',
        date: 'MAY 12, 2025',
        excerpt: 'Vitamins and minerals play a key role in keeping your immune defense system strong. Discover how zinc, Vitamin C, and Vitamin D collaborate to protect your cellular barriers from oxidative stress...',
    },
    {
        id: 6,
        title: 'Intermittent Fasting: Myths vs Science',
        date: 'MAY 18, 2025',
        excerpt: 'Photo by Studio Media on Pexels.com Separating weight-loss trends from clinical research data when discussing scheduled window eating. We break down biological fasting metabolisms and long-term habits...',
    },
    {
        id: 7,
        title: 'Meal Prepping for a Busy Work Week',
        date: 'JUNE 02, 2025',
        excerpt: 'Photo by Ello on Pexels.com Save hours and protect your dietary goals by spending just two hours over the weekend planning ahead. Learn structural kitchen organization tips and quick recipes...',
    },
    {
        id: 8,
        title: 'Mindful Eating and Digestive Health',
        date: 'JUNE 10, 2025',
        excerpt: 'Slowing down during heavy meal sessions allows proper enzyme secretion signals to reach the gut-brain axis, significantly reducing bloating risks and enhancing nutritional breakdown values...',
    },
];

const ITEMS_PER_PAGE = 4;

export default function NewsPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <MaxWidth>
            <section className="mx-auto font-sans py-12 bg-white">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-[#0c5a1d] text-4xl md:text-5xl font-serif font-medium tracking-tight">
                        News
                    </h2>
                </div>

                {/* Asymmetrical Custom Grid Layout (Using robust grid spans instead of negative margins) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentItems.map((item, index) => {
                        // Index 0 (1st item) and Index 3 (4th item) span across both columns
                        const isFullWidth = index === 0 || index === 3;

                        return (
                            <div
                                key={item.id}
                                className={`
                  bg-[#33654a] rounded-2xl py-8 md:py-10 px-6 md:p-8 flex flex-col justify-center cursor-pointer 
                  shadow-sm transform transition-all duration-300 ease-out 
                  hover:-translate-y-1 hover:bg-[#2a543d] hover:shadow-xl group
                  ${isFullWidth ? 'md:col-span-2 text-center px-8 md:px-24' : 'text-left'}
                `}
                            >
                                <div>
                                    {/* Title */}
                                    <h3 className="text-white text-xl md:text-2xl font-serif font-medium leading-snug mb-2 tracking-wide group-hover:text-neutral-100 transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                    {/* Date */}
                                    <p className="text-[#a4c5b3] text-[10px] font-sans font-semibold tracking-widest uppercase mb-4">
                                        {item.date}
                                    </p>

                                    {/* Excerpt Body */}
                                    <p className="text-[#cce2d6] text-sm leading-relaxed font-normal font-sans opacity-90 mx-auto max-w-4xl line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination Section */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-[#33654a] hover:bg-[#f0f5f2] disabled:opacity-40 disabled:hover:bg-transparent"
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-9 h-9 text-sm font-semibold rounded-lg transition-all duration-200 ${currentPage === i + 1
                                        ? 'bg-[#33654a] text-white shadow-sm'
                                        : 'text-[#33654a] hover:bg-[#f0f5f2]'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-[#33654a] hover:bg-[#f0f5f2] disabled:opacity-40 disabled:hover:bg-transparent"
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </MaxWidth>
    );
}