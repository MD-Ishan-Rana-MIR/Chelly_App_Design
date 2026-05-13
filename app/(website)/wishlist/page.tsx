'use client';

import { useEffect, useState } from 'react';
import MaxWidth from '@/app/components/max-width/MaxWidth';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FiTrash2, FiHeart } from 'react-icons/fi';

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function WishlistPage() {

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // ✅ LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const loadWishlist = () => {
      const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(data);
    };

    loadWishlist();

    // real-time sync
    window.addEventListener('wishlistUpdate', loadWishlist);

    return () => {
      window.removeEventListener('wishlistUpdate', loadWishlist);
    };
  }, []);

  // 🗑 REMOVE FROM WISHLIST
  const handleRemove = (id: number) => {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));

    window.dispatchEvent(new Event('wishlistUpdate'));

    toast.success('Removed from wishlist');
  };

  // 🛒 ADD TO CART
  const handleAddToCart = (item: WishlistItem) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const isExist = cart.find((i: any) => i.id === item.id);

    if (isExist) {
      toast.error('Already in cart!');
      return;
    }

    const updatedCart = [...cart, { ...item, quantity: 1 }];

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    window.dispatchEvent(new Event('cartUpdate'));

    toast.success('Added to cart!');
  };

  return (
    <MaxWidth>
      <div className="py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <FiHeart className="text-red-500" />
            My Wishlist
          </h1>

          <span className="text-gray-500 text-sm">
            {wishlist.length} items
          </span>
        </div>

        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <FiHeart className="mx-auto text-gray-400" size={60} />
            <h2 className="text-xl font-semibold mt-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mt-2">
              Save your favorite items here ❤️
            </p>
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
              >

                {/* IMAGE */}
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">

                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>

                  <h2 className="text-lg font-semibold mt-1">
                    {item.name}
                  </h2>

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-green-600 font-bold">
                      ${item.price}
                    </span>

                    {/* REMOVE */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex cursor-pointer items-center gap-1 text-red-500 hover:text-red-600 transition"
                    >
                      <FiTrash2 />
                      Remove
                    </button>

                  </div>

                  {/* ADD TO CART */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 cursor-pointer w-full btnColor text-white py-2 rounded-xl transition"
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </MaxWidth>
  );
}