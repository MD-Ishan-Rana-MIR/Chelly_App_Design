import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
    title: "Contact Us | LOVELYS",
    description:
        "Get in touch with LOVELYS support team for help, inquiries, or business questions.",
    keywords: ["contact", "support", "LOVELYS contact", "help center"],

};

const Page = () => {
    return (
        <div>
            <ContactPage />
        </div>
    );
};

export default Page;