"use client";

import React from "react";
import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import Button from "@/app/components/button/Button";

const foodMenus = [
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

const CategoryPage = () => {

    // GET CATEGORY FROM URL PARAMS
    const params = useParams();

    console.log(params);

    const category = params?.category as string;

    // FILTER FOOD BY CATEGORY
    const filteredFoods = foodMenus.filter(
        (item) => item.category === category
    );

    return (
        <MaxWidth>
            <div className="py-12">

                {/* TITLE */}
                <div className="mb-10 text-center">

                    <h1 className="text-4xl font-bold text-gray-800 capitalize">
                        {category} Menu
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Fresh and delicious food items from our {category} category 🍽️
                    </p>

                </div>

                {/* FOOD MENU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredFoods.map((food) => (

                        <div
                            key={food.id}
                            className="
                            bg-white
                            rounded-3xl
                            overflow-hidden
                            shadow-md
                            hover:shadow-2xl
                            transition-all
                            duration-300
                            hover:-translate-y-2
                        "
                            onClick={() => { redirect(`/category/${category}/${food.id}`) }}
                        >

                            {/* IMAGE */}
                            <div className="relative h-60 w-full">

                                <Image
                                    src={food.image}
                                    alt={food.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-xl font-bold text-gray-800">
                                        {food.title}
                                    </h3>

                                    <span className="text-[#0b7211] font-bold">
                                        {food.price}
                                    </span>

                                </div>

                                <p className="text-gray-500 text-sm mt-3">
                                    Freshly prepared delicious food for your healthy lifestyle 🍽️
                                </p>

                                <div className=" my-3 " >
                                    <Button
                                        loading={false}
                                        text="View Details"
                                        py="12px"
                                        px="12px"
                                        color="#fff"
                                        backgroundColor="#0b7211"
                                        textSize="18px"
                                        borderRadius="10px"
                                        fontWeight="600"
                                        width="100%"
                                    />
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* NO DATA */}
                {filteredFoods.length === 0 && (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-bold text-gray-700">
                            No Food Found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            No products available in this category.
                        </p>

                    </div>

                )}

            </div>
        </MaxWidth>
    );
};

export default CategoryPage;