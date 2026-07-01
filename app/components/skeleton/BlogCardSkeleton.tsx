"use client";

const BlogCardSkeleton = () => {
    return (
        <div
            className="
                bg-white border border-gray-100 rounded-2xl
                overflow-hidden shadow-sm animate-pulse
            "
        >
            {/* IMAGE */}
            <div className="w-full h-48 bg-gray-200" />

            {/* CONTENT */}
            <div className="p-5">

                {/* CATEGORY */}
                <div className="h-6 w-20 bg-gray-200 rounded-full" />

                {/* DATE */}
                <div className="h-3 w-24 bg-gray-200 rounded mt-3" />

                {/* TITLE */}
                <div className="mt-4 space-y-2">
                    <div className="h-5 w-full bg-gray-200 rounded" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                </div>

                {/* DESCRIPTION */}
                <div className="mt-4 space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>

                {/* BUTTON */}
                <div className="mt-5 h-4 w-28 bg-gray-200 rounded" />

            </div>
        </div>
    );
};

export default BlogCardSkeleton;