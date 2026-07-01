import { Blog } from "@/app/lib/type";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    blog: Blog;
    featured?: boolean;
}

export default function BlogCard({
    blog,
    featured = false,
}: BlogCardProps) {
    return (
        <Link href={`/blogs/${blog.slug}`}>
            <div
                className={`headerBgColor text-white rounded-3xl overflow-hidden hover:opacity-95 transition h-full ${featured ? "col-span-2" : ""
                    }`}
            >
                {blog.image && (
                    <div className="relative h-65 w-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.image} || ${blog.image}`}
                            alt={blog.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="p-8">
                    <h2
                        className={`font-serif mb-3 ${featured
                            ? "text-4xl text-center"
                            : "text-2xl"
                            }`}
                    >
                        {blog.title}
                    </h2>

                    <p className="text-xs uppercase tracking-[2px] mb-5">
                        {new Date(blog.created_at).toLocaleDateString()}
                    </p>

                    <div
                        className={`text-[#e5e5e5] leading-8 ${featured && "text-center max-w-4xl mx-auto"
                            }`}
                        dangerouslySetInnerHTML={{
                            __html:
                                blog.content.length > 180
                                    ? blog.content.slice(0, 180) + "..."
                                    : blog.content,
                        }}
                    />
                </div>
            </div>
        </Link>
    );
}