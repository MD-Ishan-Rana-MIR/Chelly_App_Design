const CategoryCardSkeleton = () => {
    return (
        <div className="py-4 w-full ">
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-green-100
                    bg-white
                    p-5 md:p-6
                    flex items-center justify-between
                    shadow-lg shadow-gray-200
                    w-full
                "
            >
                {/* Background Glow */}
                <div
                    className="
                        absolute -top-10 -right-10
                        w-40 h-40
                        bg-green-100
                        rounded-full
                        blur-3xl
                        opacity-40
                    "
                />

                {/* Left Content */}
                <div className="relative z-10 space-y-3 w-2/3">

                    {/* TITLE */}
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />

                    {/* SUBTITLE */}
                    <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* ICON */}
                <div
                    className="
                        relative z-10
                        w-12 h-12 md:w-14 md:h-14
                        rounded-full
                        bg-gray-200
                        animate-pulse
                    "
                />
            </div>
        </div>
    );
};

export default CategoryCardSkeleton;