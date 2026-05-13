'use client';

import MaxWidth from '@/app/components/max-width/MaxWidth';
import React from 'react';
import {
    FiHelpCircle,
    FiPhoneCall,
    FiMail,
    FiMessageCircle,
    FiChevronRight,
} from 'react-icons/fi';

const helpItems = [
    {
        title: 'Track Your Order',
        description: 'Check real-time delivery status and updates.',
        icon: <FiHelpCircle size={22} />,
    },
    {
        title: 'Payment Issues',
        description: 'Resolve payment or refund related problems.',
        icon: <FiPhoneCall size={22} />,
    },
    {
        title: 'Report Food Problem',
        description: 'Missing item, damaged food or wrong order.',
        icon: <FiMessageCircle size={22} />,
    },
    {
        title: 'Account & Security',
        description: 'Password, login or account management help.',
        icon: <FiMail size={22} />,
    },
];

export default function HelpPage() {
    return (
        <div className="min-h-screen  " >
            <MaxWidth >
                {/* Header */}
                <div className="bg-[#0b7211] text-white px-6 py-10 rounded-b-[40px]">
                    <div className="">
                        <h1 className="text-3xl md:text-4xl font-bold text-center">
                            Help & Support
                        </h1>

                        <p className="mt-3 text-sm md:text-base text-white/80  block text-center ">
                            Need help with your food order? We are here to assist you
                            anytime.
                        </p>

                        {/* Search */}
                        {/* <div className="mt-6 bg-white rounded-2xl overflow-hidden flex items-center px-4 py-3">
                            <input
                                type="text"
                                placeholder="Search help topics..."
                                className="w-full outline-none text-black"
                            />
                        </div> */}
                    </div>
                </div>

                {/* Help Cards */}
                <div className=" mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {helpItems.map((item, index) => (
                        <button
                            key={index}
                            className="
              bg-white
              rounded-3xl
              p-5
              border border-zinc-100
              shadow-sm
              hover:shadow-lg
              transition-all
              text-left
              group
            "
                        >
                            <div className="flex items-start justify-between">
                                <div className="w-14 h-14 rounded-2xl bg-[#0b7211]/10 flex items-center justify-center text-[#0b7211]">
                                    {item.icon}
                                </div>

                                <FiChevronRight
                                    size={22}
                                    className="text-zinc-400 group-hover:translate-x-1 transition-all"
                                />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-zinc-800">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-sm text-zinc-500 leading-6">
                                {item.description}
                            </p>
                        </button>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-12 pb-16">
                    <div className="bg-white rounded-3xl p-7 border border-zinc-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-zinc-800">
                            Contact Support
                        </h2>

                        <p className="mt-2 text-zinc-500">
                            Our support team is available 24/7 for your assistance.
                        </p>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-zinc-100 rounded-2xl p-5">
                                <FiPhoneCall size={24} className="text-[#0b7211]" />
                                <h4 className="mt-3 font-semibold text-zinc-800">
                                    Phone Support
                                </h4>
                                <p className="text-sm text-zinc-500 mt-1">
                                    +880 1234-567890
                                </p>
                            </div>

                            <div className="border border-zinc-100 rounded-2xl p-5">
                                <FiMail size={24} className="text-[#0b7211]" />
                                <h4 className="mt-3 font-semibold text-zinc-800">
                                    Email Support
                                </h4>
                                <p className="text-sm text-zinc-500 mt-1">
                                    support@foodapp.com
                                </p>
                            </div>

                            <div className="border border-zinc-100 rounded-2xl p-5">
                                <FiMessageCircle size={24} className="text-[#0b7211]" />
                                <h4 className="mt-3 font-semibold text-zinc-800">
                                    Live Chat
                                </h4>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Chat with our support team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
}