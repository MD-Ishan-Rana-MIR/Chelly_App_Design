"use client"
import React, { Suspense } from 'react'
import PaymentFrom from './PaymentFrom'
import { useSearchParams } from 'next/navigation';

// 1. Separate the logic into a inner child component that safely reads search parameters
const PaymentPageContent = () => {
    const searchParams = useSearchParams();

    // Get individual parameters by their keys
    const fullName = searchParams.get('full_name') || '';
    const email = searchParams.get('email') || '';
    const phone = searchParams.get('phone') || '';
    const address = searchParams.get('address') || '';
    
    // Parse the amount string into a number (fallback to 0 if null/invalid)
    const amount = Number(searchParams.get('amount')) || 0;

    return (
        <div>
            {/* 2. Pass all parameters down as props to your form */}
            <PaymentFrom 
                amount={amount} 
                fullName={fullName}
                email={email}
                phone={phone}
                address={address}
            />
        </div>
    )
}

// 3. Next.js 13/14/15 strictly REQUIRES useSearchParams() to be wrapped in a Suspense boundary 
// during client-side rendering to avoid build/hydration errors.
export default function Page() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading payment details...</div>}>
            <PaymentPageContent />
        </Suspense>
    );
}