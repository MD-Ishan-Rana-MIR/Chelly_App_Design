"use client"

import React, { useState } from 'react';

export default function Subscriber() {
    const [email, setEmail] = useState('vilolo@mailinator.com');
    const [isSubscribed, setIsSubscribed] = useState(true); // Set to true to showcase the exact view from your image

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
        }
    };

    return (
        <section className="w-full bg-[#335F47] text-white py-16 px-4 flex flex-col items-center justify-center text-center font-sans selection:bg-white/20">
            <div className="w-full max-w-[620px] flex flex-col items-center">
                
                {/* Heading */}
                <h2 className="font-serif text-3xl md:text-[40px] font-normal tracking-wide leading-tight mb-4">
                    Subscribe to our emails
                </h2>

                {/* Subheading */}
                <p className="text-white/80 text-sm md:text-[15px] font-light tracking-wide mb-8 max-w-[500px]">
                    Be the first to know about new collections and exclusive offers.
                </p>

                {/* Subscription Form */}
                <form onSubmit={handleSubscribe} className="w-full max-w-[420px] mb-4">
                    <div className="relative w-full border border-white/60 hover:border-white rounded-full bg-transparent px-6 py-2.5 flex items-center transition-all duration-200 focus-within:border-white focus-within:ring-1 focus-within:ring-white">
                        
                        {/* Input & Floating-style Label Container */}
                        <div className="flex flex-col items-start flex-grow text-left">
                            <label className="text-[10px] uppercase tracking-wider text-white/70 font-medium select-none -mb-0.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-none outline-none p-0 text-white text-[15px] placeholder-white/50 focus:ring-0 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="text-white/80 hover:text-white transition-colors p-1 pl-3 flex items-center justify-center cursor-pointer"
                            aria-label="Submit subscription"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="w-5 h-5 tracking-tighter"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Success Message Block */}
                {isSubscribed && (
                    <div className="flex items-center gap-2 mt-2 text-white/90 animate-fadeIn select-none">
                        {/* Micro Checkmark Icon */}
                        <svg 
                            viewBox="0 0 20 20" 
                            fill="currentColor" 
                            className="w-[15px] h-[15px] text-white/80"
                        >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        <span className="font-serif text-[14px] italic tracking-wide">
                            Thanks for subscribing
                        </span>
                    </div>
                )}
                
            </div>
        </section>
    );
}