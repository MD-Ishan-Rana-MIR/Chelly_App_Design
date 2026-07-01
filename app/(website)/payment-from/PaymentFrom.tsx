/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { CartItem } from "@/app/lib/type";
import { usePaymentApiMutation } from "@/app/redux/orderApi";
import { errorMessage } from "@/app/lib/errorMsg";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiCreditCard, FiCalendar, FiLock, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

interface PaymentFromProps {
    amount: number;
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

export const PaymentFrom = ({ amount, fullName, email, phone, address }: PaymentFromProps) => {
    const router = useRouter();
    const [isLoadingCart, setIsLoadingCart] = useState(true); // Added missing state variable
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState({
        cardNumber: "",
        expMonth: "",
        expYear: "",
        cvv: "",
    });

    const [paymentApi, { isLoading: isApiSubmitting }] = usePaymentApiMutation();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error("Error parsing cart data from localStorage:", error);
            } finally {
                setIsLoadingCart(false);
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            card_number: formData.cardNumber,
            exp_month: formData.expMonth,
            exp_year: formData.expYear,
            cvv: formData.cvv,
            full_name: fullName,
            email: email,
            phone: phone,
            address: address,
            payment_method: 'card',
            items: cartItems.map((item) => ({
                food_id: item.id,
                quantity: item.quantity,
                plan_type: "weekly"
            }))
        };

        try {
            const res = await paymentApi(payload).unwrap();
            if (res) {
                localStorage.removeItem('cart');
                setCartItems([]);
                window.dispatchEvent(new Event("cartUpdate"));
                router.push("/")
                return toast.success(res?.message)
            }
        } catch (error) {
            console.log(error)
            return errorMessage(error);
        }
    };

    return (
        <div className="bg-slate-50  flex items-center justify-center p-4">
            <form
                onSubmit={handlePaymentSubmit}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-6 md:p-8"
            >
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-800">Card Details</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Enter your payment information below</p>
                </div>

                {/* Card Number */}
                <div className="mb-5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <FiCreditCard className="text-slate-400" /> Card Number
                    </label>
                    <input
                        type="text"
                        name="cardNumber"
                        maxLength={16}
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-[#0b7211] focus:bg-white focus:ring-4 focus:ring-green-50 transition-all duration-200"
                        required
                    />
                </div>

                {/* Expiry Details & CVV */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <FiCalendar className="text-slate-400" /> Month
                        </label>
                        <input
                            type="text"
                            name="expMonth"
                            maxLength={2}
                            placeholder="MM"
                            value={formData.expMonth}
                            onChange={handleInputChange}
                            className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 font-medium text-center placeholder-slate-400 focus:outline-none focus:border-[#0b7211] focus:bg-white focus:ring-4 focus:ring-green-50 transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <FiCalendar className="text-slate-400" /> Year
                        </label>
                        <input
                            type="text"
                            name="expYear"
                            maxLength={4}
                            placeholder="YY"
                            value={formData.expYear}
                            onChange={handleInputChange}
                            className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 font-medium text-center placeholder-slate-400 focus:outline-none focus:border-[#0b7211] focus:bg-white focus:ring-4 focus:ring-green-50 transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <FiLock className="text-slate-400" /> CVV
                        </label>
                        <input
                            type="password"
                            name="cvv"
                            maxLength={3}
                            placeholder="***"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 font-medium text-center placeholder-slate-400 focus:outline-none focus:border-[#0b7211] focus:bg-white focus:ring-4 focus:ring-green-50 transition-all duration-200"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isApiSubmitting || isLoadingCart || cartItems.length === 0}
                    className="w-full bg-[#0b7211] cursor-pointer hover:bg-green-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2 transition duration-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                    {isApiSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>Pay Now</span>
                            <span className="opacity-80 font-medium">|</span>
                            <span>${amount ? amount : "0.00"}</span>
                        </>
                    )}
                </button>

                <p className="text-[11px] text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                    <FiCheckCircle className="text-emerald-500" /> Secure and encrypted checkout.
                </p>
            </form>
        </div>
    );
};

export default PaymentFrom;