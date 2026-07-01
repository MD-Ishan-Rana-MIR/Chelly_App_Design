import type { Metadata } from "next";
import React from "react";
import CartPage from "./CartPage";

export const metadata: Metadata = {
    title: "Cart | LOVELYS",
    description:
        "View and manage your selected items in the LOVELYS shopping cart.",
    keywords: ["cart", "shopping cart", "checkout", "LOVELYS"],
};

const Page = () => {
    return (
        <div>
            <CartPage />
        </div>
    );
};

export default Page;