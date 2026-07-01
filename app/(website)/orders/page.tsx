import type { Metadata } from "next";
import React from "react";
import OrdersPage from "./OrderPage";

export const metadata: Metadata = {
    title: "My Orders | LOVELYS",
    description:
        "View and track your order history and current purchases on LOVELYS.",
    keywords: ["orders", "order history", "track order", "LOVELYS"],
};

const Page = () => {
    return (
        <div>
            <OrdersPage />
        </div>
    );
};

export default Page;