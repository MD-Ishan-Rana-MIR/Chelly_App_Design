import MaxWidth from "@/app/components/max-width/MaxWidth";

const TermsSkeleton = () => {
    return (
        <div className="min-h-screen animate-pulse">
            <MaxWidth>
                {/* Header */}
                <div className="bg-[#0b7211] px-6 py-10 rounded-b-[40px]">
                    <div className="flex flex-col items-center">
                        <div className="h-10 w-72 bg-green-500/40 rounded-lg" />
                        <div className="h-4 w-96 bg-green-500/30 rounded mt-4" />
                    </div>
                </div>

                {/* Content */}
                <div className="py-10">
                    <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
                        {/* Last Updated */}
                        <div className="h-4 w-40 bg-zinc-200 rounded mb-8" />

                        <div className="space-y-10">
                            {[...Array(8)].map((_, index) => (
                                <div key={index}>
                                    {/* Section Title */}
                                    <div className="h-7 w-64 bg-zinc-200 rounded mb-4" />

                                    {/* Paragraph Lines */}
                                    <div className="space-y-3">
                                        <div className="h-4 w-full bg-zinc-100 rounded" />
                                        <div className="h-4 w-[95%] bg-zinc-100 rounded" />
                                        <div className="h-4 w-[85%] bg-zinc-100 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default TermsSkeleton;