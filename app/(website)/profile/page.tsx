import type { Metadata } from "next";
import React from "react";
import ProfilePage from "./Profile";

export const metadata: Metadata = {
    title: "Profile | LOVELYS",
    description:
        "Manage your LOVELYS account profile, personal details, and settings.",
    keywords: ["profile", "account", "user profile", "LOVELYS"],

};

const Page = () => {
    return (
        <div>
            <ProfilePage />
        </div>
    );
};

export default Page;