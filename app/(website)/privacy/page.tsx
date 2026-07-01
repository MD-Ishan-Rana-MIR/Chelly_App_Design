import type { Metadata } from "next";
import React from "react";
import PrivacyPolicyPage from "./PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | LOVELYS",
  description:
    "Read how LOVELYS collects, uses, and protects your personal data.",
  keywords: ["privacy policy", "data protection", "LOVELYS", "privacy"],

};

const Page = () => {
  return (
    <div>
      <PrivacyPolicyPage />
    </div>
  );
};

export default Page;