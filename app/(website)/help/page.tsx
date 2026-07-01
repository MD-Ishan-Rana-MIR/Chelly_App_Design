import type { Metadata } from "next";
import HelpPage from "./HelpPage";

export const metadata: Metadata = {
    title: "Help Center | LOVELYS",
    description:
        "Get support and find answers to frequently asked questions on LOVELYS Help Center.",
    keywords: ["help", "support", "faq", "LOVELYS help center"],

};

const Page = () => {
    return (
        <div>
            <HelpPage />
        </div>
    );
};

export default Page;