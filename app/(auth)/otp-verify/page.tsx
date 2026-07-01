import type { Metadata } from "next";
import React from "react";
import OtpVerify from "./OtpVerify";

export const metadata: Metadata = {
    title: "OTP Verification | LOVELYS",
    description:
        "Enter the OTP sent to your email or phone to verify your LOVELYS account.",
    keywords: ["otp verification", "otp", "LOVELYS", "security code"],

};

const Page = () => {
    return (
        <div>
            <OtpVerify />
        </div>
    );
};

export default Page;