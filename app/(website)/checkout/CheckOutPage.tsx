/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import MaxWidth from '@/app/components/max-width/MaxWidth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    FiCreditCard,
    FiMapPin,
    FiPhone,
    FiShoppingBag,
    FiCheckCircle,
} from 'react-icons/fi';
import { CartItem, CheckoutFormData } from '@/app/lib/type';
import { usePaymentApiMutation } from '@/app/redux/orderApi';
import { errorMessage } from '@/app/lib/errorMsg';
import ConfirmModal from '@/app/lib/alert/ConfirmModal';
import toast from 'react-hot-toast';

export default function CheckOutPage() {
    // const token = localStorage.getItem("token");

    const router = useRouter();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [isLoadingCart, setIsLoadingCart] = useState(true);
    const [openPopUpModal, setOpenPopUpModal] = useState(false);
    const [pendingFormData, setPendingFormData] = useState<CheckoutFormData | null>(null);

    const [paymentApi, { isLoading }] = usePaymentApiMutation();

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        defaultValues: { payment_method: 'cash_on_delivery' },
    });

    // Watch the live form value directly instead of pushing it through state
    const selectedPaymentMethod = watch('payment_method');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal;

    const handleLogoutCancel = () => {
        setOpenPopUpModal(false);
        setPendingFormData(null);
    };

    // Typed explicitly to avoid 'SubmitHandler' parameter type assignability problems
    const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (data.payment_method === 'card') {
            // Bypass popup validation entirely for Card payments to redirect smoothly
            const params = new URLSearchParams({
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                amount: total.toFixed(2),
            });
            router.push(`/payment-from?${params.toString()}`);
        } else {
            // For Cash on Delivery, save state and ask for modal confirmation
            setPendingFormData(data);
            setOpenPopUpModal(true);
        }
    };

    // Fires only when Cash on Delivery order is finalized inside the ConfirmModal
    const handleLogoutConfirm = async () => {
        if (!pendingFormData) return;
        setOpenPopUpModal(false);

        const payload = {
            payment_method: pendingFormData?.payment_method,
            address: pendingFormData?.address,
            phone: pendingFormData?.phone,
            email: pendingFormData?.email,
            full_name: pendingFormData?.full_name,
            items: cartItems.map((item) => ({
                food_id: item.id,
                quantity: item.quantity,
                plan_type: "weekly"
            }))
        };

        try {
            const res = await paymentApi(payload).unwrap();
            if (res) {
                setOpenModal(true);
                localStorage.removeItem('cart');
                setCartItems([]);
                window.dispatchEvent(new Event("cartUpdate"));
                return toast.success(res?.message)
            }
        } catch (error) {
            return errorMessage(error);
        }
    };

    // if (!token) {
    //     return router.push("/login")
    // }

    return (
        <section className="bg-gray-50 min-h-screen py-10">
            <MaxWidth>
                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold">Checkout</h1>
                    <p className="text-gray-500 mt-2">Complete your order details below</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] gap-8">
                    <div className="space-y-8">
                        {/* Delivery Info */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <FiMapPin className="text-[#0b7211]" size={22} />
                                <h2 className="text-xl font-bold">Delivery Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1">
                                    <input
                                        {...register('full_name', { required: 'Full name is required' })}
                                        className={`border p-3 rounded-xl focus:outline-none focus:ring-2 ${errors.full_name ? 'border-red-500 focus:ring-red-200' : 'focus:ring-green-200'}`}
                                        placeholder="Full Name"
                                    />
                                    {errors.full_name && <span className="text-red-500 text-xs pl-1">{errors.full_name.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
                                        })}
                                        className={`border p-3 rounded-xl focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'focus:ring-green-200'}`}
                                        placeholder="Email"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs pl-1">{errors.email.message}</span>}
                                </div>

                                <div className="md:col-span-2 flex flex-col gap-1">
                                    <div className="relative">
                                        <FiPhone className="absolute top-4 left-4 text-gray-400" />
                                        <input
                                            {...register('phone', { required: 'Phone number is required' })}
                                            className={`w-full border pl-11 p-3 rounded-xl focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'focus:ring-green-200'}`}
                                            placeholder="Phone"
                                        />
                                    </div>
                                    {errors.phone && <span className="text-red-500 text-xs pl-1">{errors.phone.message}</span>}
                                </div>

                                <div className="md:col-span-2 flex flex-col gap-1">
                                    <textarea
                                        {...register('address', { required: 'Address is required' })}
                                        className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-200' : 'focus:ring-green-200'}`}
                                        rows={4}
                                        placeholder="Address"
                                    />
                                    {errors.address && <span className="text-red-500 text-xs pl-1">{errors.address.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Payment Selection */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <FiCreditCard className="text-[#0b7211]" size={22} />
                                <h2 className="text-xl font-bold">Payment Method</h2>
                            </div>
                            <div className="space-y-4">
                                {/* <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input type="radio" value="cash_on_delivery" {...register('payment_method')} className="w-4 h-4 accent-[#0b7211]" />
                                    <span>Cash on Delivery</span>
                                </label> */}
                                <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input type="radio" value="card" {...register('payment_method')} className="w-4 h-4 accent-[#0b7211]" />
                                    <span>Card Payment</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Column */}
                    {cartItems && (
                        <div className="bg-white rounded-3xl p-6 h-fit sticky top-24 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <FiShoppingBag className="text-[#0b7211]" size={22} />
                                <h2 className="text-xl font-bold">Order Summary</h2>
                            </div>

                            {isLoadingCart ? (
                                <p className="text-sm text-gray-400 py-4 text-center">Loading your items...</p>
                            ) : cartItems.length === 0 ? (
                                <p className="text-sm text-gray-400 py-4 text-center">Your cart is empty.</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 mb-4 items-center">
                                        <div className="relative w-17.5 h-17.5 min-w-17.5">
                                            <Image
                                                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                                                alt={item.name}
                                                fill
                                                className="rounded-xl object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                                            <p className="text-xs text-gray-400 font-medium">
                                                {typeof item.category === 'object' ? (item.category as any)?.name : item.category || 'Food'}
                                            </p>
                                            <p className="text-sm text-gray-500 font-medium">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-[#0b7211] text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))
                            )}

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-[#0b7211] text-lg pt-2 border-t border-dashed">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={cartItems.length === 0 || isLoading}
                                className="w-full mt-6 bg-[#0b7211] cursor-pointer hover:bg-[#095c0d] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-colors"
                            >
                                {isLoading ? "Processing..." : selectedPaymentMethod === "card" ? "Proceed to Payment" : "Place Order"}
                            </button>
                        </div>
                    )}
                </form>
            </MaxWidth>

            {/* Success Modal for COD */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-3xl text-center w-[90%] max-w-md shadow-xl">
                        <FiCheckCircle className="mx-auto text-[#0b7211]" size={60} />
                        <h2 className="text-2xl font-bold mt-4">Order Placed!</h2>
                        <p className="text-gray-500 mt-2">Your order has been successfully placed via Cash on Delivery.</p>
                        <button onClick={() => router.push('/')} className=" cursor-pointer mt-6 w-full bg-[#0b7211] text-white py-3 rounded-xl font-semibold">
                            Go to Home
                        </button>
                    </div>
                </div>
            )}

            {/* Render confirmation popup directly using the live selected value */}
            {selectedPaymentMethod === "cash_on_delivery" && (
                <ConfirmModal
                    open={openPopUpModal}
                    title="Are you sure you want to place this order?"
                    description="Please review your delivery information and total cost before confirming."
                    confirmText={isLoading ? "Placing Order..." : "Confirm Order"}
                    cancelText="Cancel"
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                />
            )}
        </section>
    );
}