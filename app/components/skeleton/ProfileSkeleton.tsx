import MaxWidth from "@/app/components/max-width/MaxWidth";

export default function ProfileSkeleton() {
    return (
        <MaxWidth>
            <div className=" py-10 animate-pulse">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">
                    <div className="h-10 w-64 bg-gray-200 rounded-lg" />
                    <div className="h-10 w-32 bg-gray-200 rounded-full" />
                </div>

                {/* MAIN CARD */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* LEFT SIDEBAR */}
                        <div className="bg-gray-100 p-8 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full bg-gray-300" />

                            <div className="h-6 w-40 bg-gray-300 rounded mt-5" />
                            <div className="h-4 w-52 bg-gray-200 rounded mt-3" />

                            <div className="h-5 w-28 bg-gray-200 rounded mt-6" />
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="lg:col-span-2 p-8 md:p-10 space-y-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item}>
                                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                    <div className="h-12 w-full bg-gray-100 rounded-xl" />
                                </div>
                            ))}

                            <div className="h-12 w-40 bg-gray-300 rounded-xl mt-6" />
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidth>
    );
}