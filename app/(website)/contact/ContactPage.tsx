"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth';
import { errorMessage } from '@/app/lib/errorMsg';
import { usePostContactMutation } from '@/app/redux/contactApi';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiPhoneCall,
    FiMail,
    FiMapPin,
    FiClock,
    FiSend,
} from 'react-icons/fi';

const ContactPage = () => {
    // 1. Initialize the RTK mutation hook
    const [postContact, { isLoading }] = usePostContactMutation();

    // 2. Initialize localized form input values state matching your schema
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        subject: '',
        message: ''
    });

    // 3. Dynamic change handler for updating specific state keys matching input names
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 4. Submission intercept handler logic
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple runtime sanity layout protection validation
        if (!formData.full_name || !formData.email || !formData.message) {
            alert('Please fill out all required fields.');
            return;
        }

        try {
            // Trigger payload dispatch out directly to your API endpoint
            const payload = await postContact(formData).unwrap();

            if (payload) {
                toast.success('Your message has been sent successfully!');
                return setFormData({ full_name: '', email: '', subject: '', message: '' });
            }

        } catch (error) {
            return errorMessage(error)
        }
    };

    return (
        <MaxWidth>
            <div className="">
                {/* Hero Section */}
                <div className="bg-[#0b7211] text-white px-6 py-10 rounded-b-[40px]">
                    <div className=" text-center">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            Contact Us
                        </h1>
                        <p className="mt-5 text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-8 block text-center ">
                            Have questions about your food order or delivery?
                            Our support team is always ready to help you.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className=" mx-auto py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
                            <h2 className="text-3xl font-bold text-zinc-800">
                                Send Message
                            </h2>
                            <p className="text-zinc-500 mt-2">
                                Fill out the form and our team will contact you shortly.
                            </p>

                            {/* Added standard onSubmit event listener here */}
                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your name"
                                        className="w-full mt-2 px-5 py-4 rounded-2xl border border-zinc-200 outline-none focus:border-[#0b7211]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your email"
                                        className="w-full mt-2 px-5 py-4 rounded-2xl border border-zinc-200 outline-none focus:border-[#0b7211]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="Enter subject"
                                        className="w-full mt-2 px-5 py-4 rounded-2xl border border-zinc-200 outline-none focus:border-[#0b7211]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Write your message..."
                                        className="w-full mt-2 px-5 py-4 rounded-2xl border border-zinc-200 outline-none resize-none focus:border-[#0b7211]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#0b7211] hover:bg-[#09590e] disabled:bg-zinc-400 transition-all text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        <>
                                            <FiSend size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-5">
                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                        <FiPhoneCall size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-800">Phone Support</h3>
                                        <p className="text-zinc-500 mt-2">+880 1234-567890</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                        <FiMail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-800">Email Address</h3>
                                        <p className="text-zinc-500 mt-2">support@fooddelivery.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                        <FiMapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-800">Office Address</h3>
                                        <p className="text-zinc-500 mt-2 leading-7">123 Food Street, Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                        <FiClock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-800">Working Hours</h3>
                                        <p className="text-zinc-500 mt-2">24/7 Customer Support Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </MaxWidth>
    );
};

export default ContactPage;