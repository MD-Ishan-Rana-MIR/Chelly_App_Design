const FoodCardSkeleton = () => {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-md">
            {/* IMAGE */}
            <div className="relative h-60 w-full bg-gray-200 animate-pulse" />

            {/* CONTENT */}
            <div className="p-5 space-y-4">

                {/* TITLE + PRICE */}
                <div className="flex items-center justify-between">
                    <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* BUTTON */}
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
            </div>
        </div>
    );
};

export default FoodCardSkeleton;