import Image from 'next/image'
import React from 'react'
import Button from '../button/Button';
// id: 1,
//         name: "Organic Apples",
//         price: 4.99,
//         image: "https://via.placeholder.com/300",
//         available: true

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    available: boolean
}

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 relative">
                <Image src={product.image} alt={product.name} width={300} height={300} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h4>
                <p className="text-gray-500 text-sm mb-2">Organic Groceries</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {/* <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Add to Cart
                    </button> */}

                    <Button
                        text="View Details"
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
