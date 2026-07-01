import type { Metadata } from "next";
import PasswordChange from "./PasswordChange";

export const metadata: Metadata = {
    title: "Change Password | LOVELYS",
    description:
        "Securely update your LOVELYS account password to keep your account safe.",
    keywords: ["change password", "update password", "security", "LOVELYS"],


};

const Page = () => {
    return (
        <div>
            <PasswordChange />
        </div>
    );
};

export default Page;