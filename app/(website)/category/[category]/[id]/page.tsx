"use client";
export type CartItem = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    image: string;
    description: string;
    quantity: number
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


const foods = [
    {
        id: 1,
        title: "Classic Beef Burger",
        category: "fast food",
        price: 8,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1550547660-d9450f859349",
        description:
            "Juicy grilled beef patty with fresh lettuce, tomato, cheese, and signature sauce.",
    },
    {
        id: 2,
        title: "Margherita Pizza",
        category: "pizza",
        price: 10,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1601924582971-b9f1b5c4b6b3",
        description:
            "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves.",
    },
    {
        id: 3,
        title: "Chicken Biryani",
        category: "rice",
        price: 12,
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        description:
            "Aromatic basmati rice cooked with spiced chicken and traditional herbs.",
    },
    {
        id: 4,
        title: "Creamy Pasta Alfredo",
        category: "pasta",
        price: 9,
        rating: 4.6,
        image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e",
        description:
            "Rich creamy Alfredo sauce tossed with perfectly cooked fettuccine pasta.",
    },
    {
        id: 5,
        title: "Grilled Chicken Salad",
        category: "salad",
        price: 7,
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
        description:
            "Healthy salad with grilled chicken, fresh greens, and light dressing.",
    },
    {
        id: 6,
        title: "Chocolate Milkshake",
        category: "drinks",
        price: 5,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
        description:
            "Thick creamy chocolate shake topped with whipped cream and chocolate syrup.",
    },
    {
        id: 7,
        title: "Sushi Platter",
        category: "japanese",
        price: 15,
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1553621042-f6e147245754",
        description:
            "Fresh assorted sushi rolls with salmon, tuna, and avocado.",
    },
    {
        id: 8,
        title: "French Fries",
        category: "snacks",
        price: 4,
        rating: 4.4,
        image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
        description:
            "Golden crispy fries served hot with ketchup dip.",
    },
    {
        id: 9,
        title: "Doner Kebab Wrap",
        category: "street food",
        price: 11,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
        description:
            "Juicy spiced meat wrapped in soft flatbread with veggies and sauce.",
    },
];

const FoodDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);

    const food = foods.find((item) => item.id === id);
    const [quantity, setQuantity] = useState(1);

    if (!food) {
        return (
            <div className="h-[40vh] flex items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Food Not Found
                </h1>
            </div>
        );
    }

    const handleCart = (item: Omit<CartItem, "quantity">, qty: number = 1) => {
        const cart: CartItem[] = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const existingIndex = cart.findIndex((i) => i.id === item.id);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity =
                (cart[existingIndex].quantity || 1) + qty;

            toast.success("Cart updated!");
        } else {
            cart.push({
                id: item.id,
                title: item.title,
                category: item.category,
                price: item.price,
                rating: item.rating,
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
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

        const existingIndex = wishlist.findIndex(
            (i: { id: number }) => i.id === item.id
        );

        let updatedWishlist;

        if (existingIndex !== -1) {
            // remove from wishlist (toggle off)
            updatedWishlist = wishlist.filter((i: { id: number }) => i.id !== item.id);
            toast.success("Removed from wishlist!");
        } else {
            // add to wishlist
            updatedWishlist = [...wishlist, item];
            toast.success("Added to wishlist!");
        }

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        // trigger real-time update
        window.dispatchEvent(new Event("wishlistUpdate"));
    };

    return (
        <section className="py-10">

            <MaxWidth>

                {/* BACK */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border hover:shadow-md transition"
                >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-[#0b7211]">
                        <FiArrowLeft />
                    </span>
                    <span className="font-medium text-gray-700">
                        Back
                    </span>
                </button>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* IMAGE */}
                    <div className="relative bg-white p-4 rounded-3xl ">
                        <ProductImageViewer
                            images={[
                                food.image,
                                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
                                "https://images.unsplash.com/photo-1544025162-d76694265947",
                            ]}
                            alt={food.title}
                        />

                        <span className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full text-sm font-semibold text-[#0b7211] shadow">
                            {food.category}
                        </span>
                    </div>

                    {/* CONTENT */}
                    <div className="bg-white rounded-3xlp-6 md:p-10">

                        {/* TITLE */}
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                            {food.title}
                        </h1>

                        {/* RATING */}
                        <div className="flex items-center gap-4 mt-5">
                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                                <FiStar className="fill-yellow-500" />
                                {food.rating}
                            </div>

                            <p className="text-gray-500 text-sm">
                                120+ reviews
                            </p>
                        </div>

                        {/* PRICE */}
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0b7211] mt-8">
                            ${food.price}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 text-lg leading-8 mt-6">
                            {food.description}
                        </p>

                        {/* QUANTITY */}
                        <div className="mt-8">
                            <h3 className="font-semibold mb-3 text-gray-700">
                                Quantity
                            </h3>

                            <div className="flex items-center border rounded-2xl w-fit overflow-hidden">
                                <button
                                    onClick={() =>
                                        setQuantity((q) => (q > 1 ? q - 1 : 1))
                                    }
                                    className="px-5 cursor-pointer py-3 hover:bg-gray-100"
                                >
                                    <FiMinus />
                                </button>

                                <span className="px-8  font-bold text-lg">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="px-5 cursor-pointer py-3 hover:bg-gray-100"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-10">

                            <button onClick={() => handleCart(food, quantity)} className="flex-1  cursor-pointer flex items-center justify-center gap-3 bg-[#0b7211] hover:bg-green-700 text-white py-4 rounded-2xl font-semibold shadow-md transition">
                                <FiShoppingCart size={20} />
                                Add To Cart
                            </button>

                            <button onClick={() => handleWishlist(food)} className="w-full cursor-pointer sm:w-14 h-14 border rounded-2xl flex items-center justify-center hover:text-red-500 hover:border-red-300 transition">
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