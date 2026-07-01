import Image from 'next/image'
import React from 'react'
import { redirect } from 'next/navigation';

// 1. Define the colors object to prevent "undefined" errors
const categoryColors: Record<string, string> = {
    Burger: "bg-orange-100 text-orange-600",
    Pizza: "bg-red-100 text-red-600",
    Pasta: "bg-yellow-100 text-yellow-600",
    Salad: "bg-green-100 text-green-600",
    // Fallback color
    default: "bg-gray-100 text-gray-600"
};

const BlogCard = ({ blog }: { blog: { id: number; title: string; desc: string; image: string; date: string; category: string } }) => {
    return (
        <div
            className="
                group bg-white border border-gray-100 rounded-2xl 
                overflow-hidden shadow-sm hover:shadow-xl transition-all 
                duration-300 hover:-translate-y-2
            "
        >
            {/* IMAGE */}
            <div className="overflow-hidden">
                <Image
                    width={400}
                    height={300}
                    src={"https://cdn.shopify.com/s/files/1/0684/1060/5744/articles/image_2025-04-26_013753719.png?v=1745661780"}
                    alt={blog.title}
                    unoptimized
                    className="
                        w-full h-48 object-cover
                        group-hover:scale-110
                        transition-transform duration-500   
                    "
                />
            </div>

            {/* CONTENT */}
            <div className="p-5">
                {/* CATEGORY */}
                <span
                    className={`
                        text-xs px-3 py-1 rounded-full font-medium
                        ${categoryColors[blog.category] || categoryColors.default}
                    `}
                >
                    {blog.category}
                </span>

                <p className="text-xs text-gray-400 mt-2">
                    {blog.date}
                </p>

                <h2 className="text-lg font-bold mt-2 group-hover:text-green-700 transition">
                    {blog.title}
                </h2>


                <p className='text-sm text-gray-500 mt-2 line-clamp-2'
                    dangerouslySetInnerHTML={{
                        __html:
                            blog.desc.length > 180
                                ? blog.desc.slice(0, 180) + "..."
                                : blog.desc,
                    }}
                />

                <button onClick={() => { redirect(`/blogs/${blog.id.toString()}`) }} className="mt-4 text-green-700 cursor-pointer  font-medium hover:underline">
                    Read More →
                </button>
            </div>
        </div>
    )
}

export default BlogCard