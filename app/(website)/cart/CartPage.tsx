"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { redirect } from "next/navigation";
import { getToken } from "@/app/lib/token";

type CartItem = {
  id: number;
  cartItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options?: {
    protein: string;
    side: string;
    plan: string;
  };
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);


  // LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(stored);
    };

    loadCart();

    // real-time sync
    window.addEventListener("cartUpdate", loadCart);

    return () => {
      window.removeEventListener("cartUpdate", loadCart);
    };
  }, []);

  // UPDATE LOCALSTORAGE HELPER
  const updateCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  // INCREASE
  const increaseQty = (cartItemId: string) => {
    const updated = cart.map((item) =>
      item.cartItemId === cartItemId
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    updateCart(updated);
  };

  // DECREASE
  const decreaseQty = (cartItemId: string) => {
    const updated = cart.map((item) =>
      item.cartItemId === cartItemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    updateCart(updated);
  };

  // REMOVE
  const removeItem = (cartItemId: string) => {
    const updated = cart.filter((item) => item.cartItemId !== cartItemId);
    updateCart(updated);
  };

  // TOTAL
  const calculateSubtotal = (cartItems: CartItem[]) => {
    let total = 0;
    const consolidatedBreakdown: { label: string; amount: number }[] = [];

    cartItems.forEach((item) => {
      let qty = item.quantity;
      let itemTotal = 0;

      // Apply 21-Meal Bundle pricing only if the user added 21 of the SAME item
      // AND the normal price is more than the bundle price ($120 for 21)
      while (qty >= 21 && (21 * item.price > 120)) {
        itemTotal += 120;
        consolidatedBreakdown.push({ label: `21-Meal Bundle (${item.name})`, amount: 120 });
        qty -= 21;
      }
      
      // Apply 10-Meal Bundle pricing only if the user added 10 of the SAME item
      // AND the normal price is more than the bundle price ($70 for 10)
      while (qty >= 10 && (10 * item.price > 70)) {
        itemTotal += 70;
        consolidatedBreakdown.push({ label: `10-Meal Bundle (${item.name})`, amount: 70 });
        qty -= 10;
      }
      
      if (qty > 0) {
        itemTotal += qty * item.price;
        consolidatedBreakdown.push({ label: `${qty}x ${item.name}`, amount: qty * item.price });
      }
      
      total += itemTotal;
    });

    return { total, breakdown: consolidatedBreakdown };
  };

  const { total: subtotal, breakdown: priceBreakdown } =
    calculateSubtotal(cart);

  const delivery = cart.length > 0 ? 0 : 0;
  const total = subtotal + delivery;

  const [userToken, setUserToken] = useState<string | null>(null);

  const token = getToken();
  useEffect(() => {
    setUserToken(token);
  }, [token]);


  const navigateCheckoutPage = () => {
    if (userToken) {
      redirect("/checkout");
    } else {
      redirect("/login");
    }
  };

  return (
    <section className=" py-10">
      <MaxWidth>
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-10">
          <FiShoppingBag size={28} className="text-[#0b7211]" />
          <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          {/* CART ITEMS */}
          <div className="space-y-5">
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow">
                <FiShoppingBag size={60} className="mx-auto text-gray-400" />
                <h2 className="text-xl font-semibold mt-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mt-2">Add some delicious food 🍔</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{item.name}</h2>

                    {item.options && (
                      <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                        {Object.entries(item.options).map(([key, val]) => (
                          <p key={key}>
                            {key}: {val}
                          </p>
                        ))}
                      </div>
                    )}

                    <p className="text-[#0b7211] font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item.cartItemId)}
                        className="p-2  cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <FiMinus />
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.cartItemId)}
                        className="p-2 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-red-500 cursor-pointer hover:bg-red-50 p-3 rounded-xl transition"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* SUMMARY */}
          {cart.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
              <h2 className="text-xl font-bold mb-5">Order Summary</h2>

              <div className="space-y-3 text-gray-600">
                {priceBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span>${item.amount.toFixed(2)}</span>
                  </div>
                ))}

                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={navigateCheckoutPage}
                className="w-full mt-6 btnColor cursor-pointer hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </MaxWidth>
    </section>
  );
}
