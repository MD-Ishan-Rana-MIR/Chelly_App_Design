"use client"
import Image from 'next/image'
import React from 'react'
import Button from '../button/Button';
import { useRouter } from "next/navigation";
// id: 1,
//         name: "Organic Apples",
//         price: 4.99,
//         image: "https://via.placeholder.com/300",
//         available: true

export interface Product {
    id: number;
    Title: string;
    BodyHTML: string;
    VariantPrice: number;
    ImageSrc: string;
    Category: string;
}

const ProductCard = ({ product }: { product: Product }) => {
    const router = useRouter();
    const navigateOnClick = () => {
        // Implement navigation logic here, e.g., using Next.js router
        router.push(`/food/${product.id}`);
    }

    return (
        <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 relative">
                <Image src={product.ImageSrc} alt={product.Title} width={300} height={300} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.Title}
                </h4>
                <p className="text-gray-500 text-sm mb-2">{product.BodyHTML.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50)}...</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">${product.VariantPrice.toFixed(2)}</span>
                    {/* <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Add to Cart
                    </button> */}

                    <Button
                        text="View Details"
                        onClick={navigateOnClick}
                        py="7px"
                        px="12px"
                        color="#fff"
                        backgroundColor="#0b7211"
                        textSize="14px"
                        borderRadius="10px"
                        fontWeight="semibold"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard
