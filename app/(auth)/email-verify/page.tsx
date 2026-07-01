import type { Metadata } from "next";
import React from "react";
import EmailVerifyPage from "./EmailVerify";

export const metadata: Metadata = {
    title: "Email Verification | LOVELYS",
    description:
        "Verify your email address to activate your LOVELYS account securely.",
    keywords: ["email verify", "verification", "LOVELYS", "account activation"],

};

const Page = () => {
    return (
        <div>
            <EmailVerifyPage />
        </div>
    );
};

export default Page;