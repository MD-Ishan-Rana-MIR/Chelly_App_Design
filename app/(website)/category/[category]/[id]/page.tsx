"use client";

export type CartItem = {
    id: number;
    title: string;
    category: string;
    price: number;
    // rating: number;
    image: string;
    description: string;
    quantity: number;
};

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    FiArrowLeft,
    FiHeart,
    FiMinus,
    FiPlus,
    FiShoppingCart,
    FiStar,
} from "react-icons/fi";

import MaxWidth from "@/app/components/max-width/MaxWidth";
import ProductImageViewer from "@/app/components/img-view/Image360Viewer";
import toast from "react-hot-toast";

export interface FoodItem {
    id: number;
    handle: string;
    title: string;
    description: string;
    price: string;
    image: string;
    tags: string;
    type: string;
    status: string;
    category: string;
    variants?: [];
}

const foods : FoodItem[] = [
    {
        "id": 1,
        "handle": "3-egg-omlette",
        "title": "3 Egg Omlette",
        "description": "Indulge in our expertly crafted 3 Egg Omelette, a protein-rich breakfast option prepared with three farm-fresh eggs for optimal fluffiness and texture. Customize your culinary experience by selecting ",
        "price": "10.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/3_Egg_Omlette.png?v=1748119540",
        "tags": "",
        "type": "",
        "status": "active",
        "category": "Breakfast"
    },
    {
        "id": 2,
        "handle": "acai-bowl",
        "title": "Açaí Bowl",
        "description": "Acai bowls are a popular breakfast or snack option known for its vibrant color and nutritional benefits. It typically features a base made from acai berries, which are blended into a thick, creamy con",
        "price": "11.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Acai_Bowl.png?v=1748119456",
        "tags": "Açaí Bowl",
        "type": "",
        "status": "active",
        "category": "Breakfast"
    },
    {
        "id": 3,
        "handle": "avocado-toast",
        "title": "Avocado Toast",
        "description": "The Ultimate Health BoostElevate your breakfast with our Avocado Toast, the perfect blend of taste and nutrition. Made with creamy, ripe avocados spread generously over crispy, whole-grain toast, this",
        "price": "13.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Avocado_Toast.png?v=1748119302",
        "tags": "Avocado Toast",
        "type": "",
        "status": "active",
        "category": "Breakfast",
        "variants": []
    },
    {
        "id": 4,
        "handle": "breakfast-burrito-with-country-gravy",
        "title": "Breakfast Burrito with Country Gravy",
        "description": "Our breakfast burrito is a hearty and satisfying meal that blends traditional breakfast ingredients with a side of comforting, creamy sauce. The burrito typically scrambled eggs, your choice of protei",
        "price": "12.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Breakfast_Burrito_with_Country_Gravy.png?v=1748119177",
        "tags": "Breakfast Burrito with Country Gravy",
        "type": "",
        "status": "active",
        "category": "Breakfast"
    },
    {
        "id": 5,
        "handle": "brunch-combo",
        "title": "Brunch Combo",
        "description": "Brunch Combo includes choices for proteins, starches (such as pancakes, waffles, or french toast), This flexibility lets you tailor your meal to your preferences and dietary needs, making it ideal for",
        "price": "11.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Brunch_Combo.png?v=1748118969",
        "tags": "Brunch Combo",
        "type": "",
        "status": "active",
        "category": "Lunch"
    },
    {
        "id": 6,
        "handle": "chicken-and-shrimp",
        "title": "Chicken and Shrimp",
        "description": "A Savory Surf and Turf DelightExperience the best of both worlds with our Chicken and Shrimp dish, a perfect fusion of land and sea. Juicy, tender chicken breasts paired with succulent, perfectly seas",
        "price": "15.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Chicken_and_Shrimp.png?v=1748118697",
        "tags": "Chicken and Shrimp",
        "type": "",
        "status": "active",
        "category": "Lunch"
    },
    {
        "id": 7,
        "handle": "chicken-salad-sandwich",
        "title": "Chicken Salad Sandwich",
        "description": "This Chicken salad sandwich features a flavorful mixture of cooked chicken combined mayonnaise, celery, onions, cranberries and candied pecans. This creamy, savory filling is often seasoned with salt,",
        "price": "14.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Chicken_Salad_Sandwich.png?v=1748117885",
        "tags": "Chicken Salad Sandwich",
        "type": "",
        "status": "active",
        "category": "Lunch"
    },
    {
        "id": 8,
        "handle": "chicken-tortilla-soup",
        "title": "Chicken Tortilla Soup",
        "description": "Chicken tortilla soup is a flavorful, hearty soup with a base of rich, spiced broth,made with chicken stock and seasoned with cumin, chili powder, and garlic. It includes shredded or , tomatoes, onion",
        "price": "15.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Chicken_Tortilla_Soup.png?v=1748117340",
        "tags": "lovelys meal plan Chicken Tortilla Soup",
        "type": "",
        "status": "active",
        "category": "Lunch"
    },
    {
        "id": 9,
        "handle": "chopped-salad",
        "title": "Chopped Salad",
        "description": "Chopped salad is a fresh, mixed romaine salad where all ingredients are finely chopped into small, bite-sized pieces. This includes a variety of vegetables such as lettuce, tomatoes, cucumbers, Apples",
        "price": "13.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Chopped_Salad.png?v=1748117069",
        "tags": "Chopped Salad",
        "type": "",
        "status": "active",
        "category": "Dinner"
    },
    {
        "id": 10,
        "handle": "cinnamon-roll-french-toast",
        "title": "Cinnamon Roll French Toast",
        "description": "Indulge in the perfect fusion of flavors with our Cinnamon Roll French Toast. This exquisite breakfast delight combines the warm, spicy sweetness of cinnamon rolls with the comforting, rich texture of",
        "price": "11.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Cinnamon_Roll_French_Toast.png?v=1748118901",
        "tags": "Cinnamon Roll French Toast",
        "type": "",
        "status": "active",
        "category": "Dinner"
    },
    {
        "id": 11,
        "handle": "crispy-rice-with-spicy-shrimp-salad",
        "title": "Crispy rice with Spicy Shrimp Salad",
        "description": "A Culinary Delight comes with side saladPerfect Balance of Crunch and SpiceIndulge in the exquisite flavors of our crispy rice with spicy shrimp salad, a dish that perfectly balances texture and taste",
        "price": "20.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Crispy_rice_with_Spicy_Shrimp_Salad.png?v=1748116926",
        "tags": "Crispy rice, Crispy rice with Spicy Shrimp, Crispy rice with Spicy Shrimp Salad, rice with Spicy Shrimp, rice with Spicy Shrimp Salad, Shrimp Salad, Spicy Shrimp Salad",
        "type": "food",
        "status": "active",
        "category": "Dinner"
    },
    {
        "id": 12,
        "handle": "grilled-steak-tacos",
        "title": "Grilled Steak Tacos",
        "description": "Unleash the Flavors of MexicoAuthentic Taste ExperienceSavor the vibrant flavors of our grilled steak tacos, a true culinary masterpiece that brings the essence of Mexico to your table. Each taco is m",
        "price": "15.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Grilled_Steak_Tacos.png?v=1748118625",
        "tags": "Grilled Steak Tacos",
        "type": "",
        "status": "active",
        "category": "Dinner"
    },
    {
        "id": 13,
        "handle": "item-customizations",
        "title": "Item customizations",
        "description": "",
        "price": "0.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/image_2025-04-26_214502735.png?v=1745685907",
        "tags": "",
        "type": "",
        "status": "active",
        "category": "WeeklySubscription"
    },
    {
        "id": 14,
        "handle": "ocean-water-1-2-gallon",
        "title": "Ocean Water 1/2 Gallon",
        "description": "This refreshing Ocean Water drink combines the hydrating benefits of coconut water with the vibrant color and flavor of a blue sports drink, making it perfect for a refreshing drink before or after a ",
        "price": "7.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Ocean_Water_1_2_Gallon.png?v=1748115834",
        "tags": "Flavored Drinks, Fruit Drinks, Fruit Flavored, Fruit Flavored Drinks",
        "type": "",
        "status": "active",
        "category": "WeeklySubscription"
    },
    {
        "id": 15,
        "handle": "salisbury-meatballs-platter",
        "title": "Salisbury Meatballs platter",
        "description": "Comfort Food RedefinedClassic Flavors, Modern TwistSavor the hearty and comforting taste of our Salisbury meatballs platter, a delightful twist on a beloved classic. Each meatball is crafted from prem",
        "price": "17.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Salisbury_Meatballs_platter.png?v=1748118325",
        "tags": "Salisbury Meatballs platter",
        "type": "",
        "status": "active",
        "category": "WeeklySubscription"
    },
    {
        "id": 16,
        "handle": "salmon-bite-bowls",
        "title": "Salmon bite bowls",
        "description": "Delight in Every BiteBursting with FlavorIndulge in our salmon bite bowls, a delectable fusion of taste and texture. Each bowl is crafted with succulent, bite-sized pieces of salmon, marinated to perf",
        "price": "20.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Salmon_bite_bowls.png?v=1748118279",
        "tags": "Salmon bite bowls",
        "type": "",
        "status": "active",
        "category": "WeeklySubscription"
    },
    {
        "id": 17,
        "handle": "soft-tacos-2",
        "title": "Soft Tacos",
        "description": "Delight in Every BiteClassic Comfort with a TwistIndulge in the timeless pleasure of our soft tacos, featuring a tender tortilla that wraps around a mouth-watering array of fillings. Whatever protein ",
        "price": "10.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Soft_Tacos.png?v=1748118222",
        "tags": "Soft Tacos",
        "type": "",
        "status": "active",
        "category": "Drinks"
    },
    {
        "id": 18,
        "handle": "spinanch-artichoke-dip",
        "title": "Spinanch Artichoke Dip",
        "description": "This Slow Cooker Spinach Artichoke Dip recipe is rich and creamy, full of the best flavors, and extra-easy to eat for Lunch or snack! Comes with a side of pita chips, carrots and celery.",
        "price": "10.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/image_2025-04-26_010341442.png?v=1745611425",
        "tags": "",
        "type": "Prepared meals",
        "status": "active",
        "category": "Drinks"
    },
    {
        "id": 19,
        "handle": "ultimate-loaded-baked-potato",
        "title": "Ultimate Loaded Baked Potato",
        "description": "The Ultimate Comfort Food Decadent Flavors in Every BiteExperience the ultimate indulgence with our loaded baked potato, a culinary masterpiece that combines the best of comfort food with gourmet flai",
        "price": "10.00",
        "image": "https://cdn.shopify.com/s/files/1/0684/1060/5744/files/Ultimate_Loaded_Baked_Potato.png?v=1748116411",
        "tags": "Entrées, Meals, Meals & Entrées, Prepared Entrées, Prepared Meals, Prepared Meals & Entrées",
        "type": "Prepared meals",
        "status": "active",
        "category": "Drinks"
    }
]

const FoodDetailsPage = () => {
    const router = useRouter();
    const params = useParams();

    console.log(params);

    const id = Number(params.id);

    const food = foods.find((item) => item.id === id);

    const [quantity, setQuantity] = useState(1);

    const [selectedPlan, setSelectedPlan] = useState("Daily");

    const plans = [ "Weekly",];

    if (!food) {
        return (
            <div className="flex h-[40vh] items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Food Not Found
                </h1>
            </div>
        );
    }

    const handleCart = (
        item: FoodItem,
        qty: number = 1
    ) => {
        const cart: CartItem[] = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const existingIndex = cart.findIndex(
            (i) => i.id === item.id
        );

        if (existingIndex !== -1) {
            cart[existingIndex].quantity =
                (cart[existingIndex].quantity || 1) + qty;

            toast.success("Cart updated!");
        } else {
            cart.push({
                id: item.id,
                title: item.title,
                category: item.category,
                price: Number(item.price),
                // rating: item.rating,
                image: item.image,
                description: item.description,
                quantity: qty,
            });

            toast.success("Added to cart!");
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("cartUpdate"));
    };

    const handleWishlist = (item: { id: number }) => {
        const wishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const existingIndex = wishlist.findIndex(
            (i: { id: number }) => i.id === item.id
        );

        let updatedWishlist;

        if (existingIndex !== -1) {
            updatedWishlist = wishlist.filter(
                (i: { id: number }) => i.id !== item.id
            );

            toast.success("Removed from wishlist!");
        } else {
            updatedWishlist = [...wishlist, item];

            toast.success("Added to wishlist!");
        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        window.dispatchEvent(new Event("wishlistUpdate"));
    };

    return (
        <section className="bg-gray-50 py-10">
            <MaxWidth>

                {/* BACK BUTTON */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-3 rounded-full border bg-white px-5 py-3 shadow-sm transition hover:shadow-md"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-[#0b7211]">
                        <FiArrowLeft />
                    </span>

                    <span className="font-medium text-gray-700">
                        Back
                    </span>
                </button>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

                    {/* IMAGE SECTION */}
                    <div className="rounded-[32px] bg-white p-5 shadow-sm">

                        <div className="relative overflow-hidden rounded-3xl">
                            <ProductImageViewer
                                images={[
                                    food.image,
                                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
                                    "https://images.unsplash.com/photo-1544025162-d76694265947",
                                ]}
                                alt={food.title}
                            />

                            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b7211] shadow">
                                {food.category}
                            </span>
                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="rounded-[32px] bg-white p-6 md:p-10 shadow-sm">

                        {/* TITLE */}
                        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
                            {food.title}
                        </h1>

                        {/* RATING */}
                        <div className="mt-5 flex items-center gap-4">

                            {/* <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                                <FiStar className="fill-yellow-500" />
                                {food.rating}
                            </div> */}

                            <p className="text-sm text-gray-500">
                                120+ reviews
                            </p>

                        </div>

                        {/* PRICE */}
                        <h2 className="mt-8 text-4xl font-bold text-[#0b7211] md:text-5xl">
                            ${food.price}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {food.description}
                        </p>

                        {/* QUANTITY */}
                        <div className="mt-8">

                            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                Quantity
                            </h3>

                            <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-200">

                                <button
                                    onClick={() =>
                                        setQuantity((q) =>
                                            q > 1 ? q - 1 : 1
                                        )
                                    }
                                    className="cursor-pointer px-5 py-4 transition hover:bg-gray-100"
                                >
                                    <FiMinus />
                                </button>

                                <span className="px-8 text-lg font-bold">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity((q) => q + 1)
                                    }
                                    className="cursor-pointer px-5 py-4 transition hover:bg-gray-100"
                                >
                                    <FiPlus />
                                </button>

                            </div>

                        </div>

                        {/* ORDER PLAN */}
                        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                            {/* HEADER */}
                            <div className="mb-5 flex items-center justify-between">

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Order Plan
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Choose your delivery schedule
                                    </p>
                                </div>

                                <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[#0b7211]">
                                    Flexible
                                </div>

                            </div>

                            {/* PLAN LIST */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                                {plans.map((plan) => (
                                    <button
                                        key={plan}
                                        onClick={() =>
                                            setSelectedPlan(plan)
                                        }
                                        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300

                                            ${selectedPlan === plan
                                                ? "border-[#0b7211] bg-green-50 shadow-md"
                                                : "border-gray-200 hover:border-[#0b7211]/40 hover:shadow-sm"
                                            }
                                        `}
                                    >

                                        {/* ACTIVE DOT */}
                                        <div
                                            className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border

                                                ${selectedPlan === plan
                                                    ? "border-[#0b7211]"
                                                    : "border-gray-300"
                                                }
                                            `}
                                        >
                                            {selectedPlan === plan && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-[#0b7211]" />
                                            )}
                                        </div>

                                        {/* TEXT */}
                                        <div>

                                            <h3 className="text-base font-semibold text-gray-900">
                                                {plan}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {plan === "Daily" &&
                                                    "Fresh delivery every day"}

                                                {plan === "Weekly" &&
                                                    "Best for weekly routine"}

                                                {plan === "Monthly" &&
                                                    "Save more with monthly plan"}
                                            </p>

                                        </div>

                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                            <button
                                onClick={() =>
                                    handleCart(food, quantity)
                                }
                                className="flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#0b7211] py-4 font-semibold text-white shadow-md transition hover:bg-green-700"
                            >
                                <FiShoppingCart size={20} />

                                Add To Cart
                            </button>

                            <button
                                onClick={() =>
                                    handleWishlist(food)
                                }
                                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl border transition hover:border-red-300 hover:text-red-500 sm:w-14"
                            >
                                <FiHeart size={20} />
                            </button>

                        </div>

                    </div>

                </div>

            </MaxWidth>
        </section>
    );
};

export default FoodDetailsPage;