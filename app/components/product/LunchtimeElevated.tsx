import { FoodType } from '@/app/lib/type';
import { useOnlyGetLunchQuery } from '@/app/redux/collectionApi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const breakfastItems = [
    {
        id: 1,
        name: '3 Egg Omlette',
        price: 'Tk 1,300.00 BDT',
        image: '/images/omelette.jpg',
    },
    {
        id: 2,
        name: 'Parfaits',
        price: 'Tk 1,700.00 BDT',
        image: '/images/parfait.jpg',
    },
    {
        id: 3,
        name: 'Cinnamon Roll French Toast',
        price: 'Tk 1,400.00 BDT',
        image: '/images/french-toast.jpg',
    },
    {
        id: 4,
        name: 'Brunch Combo',
        price: 'Tk 1,400.00 BDT',
        image: '/images/brunch-combo.jpg',
    },
];



export default function LunchtimeElevated() {


    const router = useRouter();

    const { data } = useOnlyGetLunchQuery({})

    const breakfastData: FoodType[] = data?.data?.foods?.data || [];

    return (
        <section className="mx-auto font-sans md:mb-18 mb-8 ">
            {/* Header Section */}
            <div className="mb-10">
                <h2 className="text-[#0c5a1d] text-3xl md:text-4xl font-serif font-semibold tracking-tight">
                    Lunchtime, Elevated

                </h2>
                <p className="text-[#64a170] text-sm md:text-base mt-2 font-medium">
                    The Lunch You Deserve

                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {breakfastData.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-[#f7f9f6] rounded-2xl p-4 flex flex-col justify-between border border-black/[0.02] shadow-sm transition-all duration-300 ease-in-out hover:bg-white hover:shadow-md hover:border-black/[0.05] cursor-pointer"
                    >
                        {/* Image Container with Badges */}
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-[#ecefe9]">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />

                            {/* "Sold out" Badge */}
                            <span className="absolute top-3 left-3 z-10 bg-white/95 text-[#5ea36c] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                                Sold out
                            </span>


                        </div>

                        {/* Product Details */}
                        <div className="space-y-1 pt-2">
                            <h3 className="text-[#3c5942] text-xs font-serif font-medium tracking-wide group-hover:text-[#0c5a1d] transition-colors duration-300">
                                {item.name}
                            </h3>
                            <p className="text-[#2b5c35] text-sm font-semibold">
                                {item.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="md:mt-16 mt-8 flex justify-center">
                <Link href={`/collections/${2}`} className="bg-[#0f621a] cursor-pointer font-semibold  hover:bg-[#0a4612] text-white  py-3 px-8 transition-colors duration-200 text-sm tracking-wide">
                    View All
                </Link>
            </div>
        </section>
    );
}