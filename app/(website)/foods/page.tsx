import type { Metadata } from "next";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import ProductPage from "@/app/components/product/Product";
import FoodPageSlider from "@/app/components/slider/FoodPageSlider";
import React from "react";

export const metadata: Metadata = {
    title: "Foods | LOVELYS",
    description:
        "Explore delicious foods, fresh meals, and tasty products available on LOVELYS.",
    keywords: ["foods", "restaurant", "meals", "LOVELYS", "online food"],
};

const Foods = () => {
    return (
        <div>
            <div>
                <FoodPageSlider />
            </div>

            <MaxWidth>
                <ProductPage />
            </MaxWidth>
        </div>
    );
};

export default Foods;