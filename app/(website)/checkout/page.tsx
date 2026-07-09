import type { Metadata } from "next";
import CheckOutPage from "./CheckOutPage";

export const metadata: Metadata = {
    title: "Checkout | LOVELYS",
    description:
        "Securely complete your purchase and proceed with payment on LOVELYS.",
    keywords: ["checkout", "payment", "order", "LOVELYS"],

};

const Page = () => {
    return (
        <div>
            <CheckOutPage/>
        </div>
    );
};

export default Page;