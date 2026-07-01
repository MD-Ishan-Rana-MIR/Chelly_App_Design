import type { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Login | LOVELYS",
  description: "Login to your LOVELYS account securely and access your dashboard.",
  keywords: ["login", "LOVELYS login", "sign in", "account access"],
};

const Page = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Page;