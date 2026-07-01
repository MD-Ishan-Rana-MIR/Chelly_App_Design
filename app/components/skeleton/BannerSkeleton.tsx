const HeroBannerSkeleton = () => {
    return (
        <section className="w-full h-[70vh] relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gray-300" />
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-16 left-10">
                <div className="h-10 w-72 bg-gray-200 rounded-lg mb-4" />
                <div className="h-5 w-48 bg-gray-200 rounded-lg" />
            </div>

            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-200" />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-200" />

            <div className="absolute bottom-6 w-full flex justify-center gap-2">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="w-2.5 h-2.5 rounded-full bg-gray-200"
                    />
                ))}
            </div>
        </section>
    );
};


export default HeroBannerSkeleton;