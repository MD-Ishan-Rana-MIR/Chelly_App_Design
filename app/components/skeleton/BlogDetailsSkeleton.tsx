import MaxWidth from "../max-width/MaxWidth";

const BlogDetailsSkeleton = () => {
    return (
        <div className="min-h-screen animate-pulse">
            {/* HERO SKELETON */}
            <div className="relative w-full h-80 md:h-125 bg-gray-200" />

            {/* CONTENT */}
            <MaxWidth>
                <div className="py-12 space-y-8">
                    {/* TITLE LINES */}
                    <div className="space-y-3">
                        <div className="h-6 w-1/3 bg-gray-200 rounded" />
                        <div className="h-10 w-2/3 bg-gray-200 rounded" />
                        <div className="h-4 w-1/4 bg-gray-200 rounded" />
                    </div>

                    {/* CONTENT PARAGRAPHS */}
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-11/12 bg-gray-200 rounded" />
                        <div className="h-4 w-10/12 bg-gray-200 rounded" />
                        <div className="h-4 w-9/12 bg-gray-200 rounded" />
                        <div className="h-4 w-8/12 bg-gray-200 rounded" />
                    </div>

                    {/* IMAGE BLOCK */}
                    <div className="h-72 md:h-96 bg-gray-200 rounded-2xl" />

                    {/* TAGS */}
                    <div className="flex gap-3">
                        <div className="h-8 w-20 bg-gray-200 rounded-full" />
                        <div className="h-8 w-16 bg-gray-200 rounded-full" />
                        <div className="h-8 w-24 bg-gray-200 rounded-full" />
                    </div>

                    {/* SHARE ICONS */}
                    <div className="flex gap-4">
                        <div className="h-10 w-10 bg-gray-200 rounded-full" />
                        <div className="h-10 w-10 bg-gray-200 rounded-full" />
                        <div className="h-10 w-10 bg-gray-200 rounded-full" />
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};


export default BlogDetailsSkeleton;