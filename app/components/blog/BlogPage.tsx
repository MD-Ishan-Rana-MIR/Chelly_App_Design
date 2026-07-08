import Link from "next/link";
import MaxWidth from "../max-width/MaxWidth";
import { useGetFourBlogQuery } from "@/app/redux/blogApi";
import { Blog } from "@/app/lib/type";

export default function BlogPage() {
    const { data } = useGetFourBlogQuery({});

    console.log("data", data?.data?.data);

    const blogData: Blog[] = data?.data?.data || [];

    return (
        <MaxWidth>
            <section className="mx-auto font-sans py-12 bg-white">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-[#0c5a1d] text-4xl md:text-5xl font-serif font-medium tracking-tight">
                        From Our Blogs
                    </h2>
                </div>

                {/* Grid Layout - Updated to support 4 grid columns on large screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blogData.map((post) => (
                        <div
                            key={post.id}
                            className="group bg-[#33654a] rounded-2xl p-6 md:p-8 flex flex-col justify-between cursor-pointer min-h-[340px] shadow-sm transform transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#2a543d] hover:shadow-xl will-change-transform"
                        >
                            <div>
                                {/* Title */}
                                <h3 className="text-white text-xl md:text-2xl font-serif font-medium leading-snug mb-3 tracking-wide group-hover:text-neutral-100 transition-colors duration-300">
                                    {post.title}
                                </h3>

                                {/* Date */}
                                <p className="text-[#a4c5b3] text-[10px] font-sans font-semibold tracking-widest uppercase mb-5">
                                    {post?.created_at}
                                </p>

                                {/* Excerpt Body */}
                                <div
                                    className="text-[#cce2d6] text-sm leading-relaxed font-normal font-sans opacity-90 line-clamp-6 transition-opacity duration-300 group-hover:opacity-100 break-words whitespace-normal"
                                    dangerouslySetInnerHTML={{ __html: post?.content.slice(0, 300) || '' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Button */}
                <div className="md:mt-16 mt-8 flex justify-center">
                    <Link
                        href={"/blogs/news"}
                        className="inline-block bg-[#0f621a] cursor-pointer font-semibold hover:bg-[#0a4612] text-white py-3 px-8 rounded-md transition-colors duration-200 text-sm tracking-wide"
                    >
                        View All
                    </Link>
                </div>
            </section>
        </MaxWidth>
    );
}