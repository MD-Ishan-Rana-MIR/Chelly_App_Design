import MaxWidth from '@/app/components/max-width/MaxWidth';
import React from 'react';
import {
    FiPhoneCall,
    FiMail,
    FiMapPin,
    FiClock,
    FiSend,
} from 'react-icons/fi';

const page = () => {
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
                <div className=" mx-auto px-5 py-16">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
                            <h2 className="text-3xl font-bold text-zinc-800">
                                Send Message
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Fill out the form and our team will contact you shortly.
                            </p>

                            <form className="mt-8 space-y-5">

                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="
                    w-full
                    mt-2
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-zinc-200
                    outline-none
                    focus:border-[#0b7211]
                  "
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="
                    w-full
                    mt-2
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-zinc-200
                    outline-none
                    focus:border-[#0b7211]
                  "
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter subject"
                                        className="
                    w-full
                    mt-2
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-zinc-200
                    outline-none
                    focus:border-[#0b7211]
                  "
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-zinc-700">
                                        Message
                                    </label>

                                    <textarea
                                        rows={5}
                                        placeholder="Write your message..."
                                        className="
                    w-full
                    mt-2
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-zinc-200
                    outline-none
                    resize-none
                    focus:border-[#0b7211]
                  "
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="
                  w-full
                  bg-[#0b7211]
                  hover:bg-[#09590e]
                  transition-all
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                "
                                >
                                    <FiSend size={18} />
                                    Send Message
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
                                        <h3 className="text-xl font-bold text-zinc-800">
                                            Phone Support
                                        </h3>

                                        <p className="text-zinc-500 mt-2">
                                            +880 1234-567890
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                        <FiMail size={24} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-800">
                                            Email Address
                                        </h3>

                                        <p className="text-zinc-500 mt-2">
                                            support@fooddelivery.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                        <FiMapPin size={24} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-800">
                                            Office Address
                                        </h3>

                                        <p className="text-zinc-500 mt-2 leading-7">
                                            123 Food Street, Dhaka, Bangladesh
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                        <FiClock size={24} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-800">
                                            Working Hours
                                        </h3>

                                        <p className="text-zinc-500 mt-2">
                                            24/7 Customer Support Available
                                        </p>
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

export default page;