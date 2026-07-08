import { FoodType } from "@/app/lib/type";
import { useTwoMealApiQuery } from "@/app/redux/foodApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TwoMealPlans() {

    const router = useRouter();
    

    const {data} = useTwoMealApiQuery({});

    const towMealData : FoodType[] = data?.data?.data || [];

    return (
        <div className="flex flex-row gap-x-6 md:mb-16 mb-10">

            {towMealData.map((item) => (
                <div
                    key={item.id}
                    onClick={()=>{router.push(`/food/${item?.id}`)}}
                    className="flex-1 cursor-pointer group bg-[#F4F7F3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2  p-5 "
                >
                    {/* IMAGE */}
                    <div className="overflow-hidden">
                        <Image
                            width={400}
                            height={300}
                            src={item?.image}
                            alt="Delicious healthy food recipe breakfast"
                            unoptimized
                            className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="my-5">
                        <p className="text-[#37674A] text-sm">
                            {item.name}
                        </p>
                        <p className="text-[#37674A] text-lg">
                            {item.price}
                        </p>
                    </div>
                </div>
            ))}

        </div>
    );
}