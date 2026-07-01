import type { Metadata } from "next";
import React from "react";
import TermsConditionsPage from "./TermPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | LOVELYS",
  description:
    "Read the terms and conditions for using the LOVELYS platform and services.",
  keywords: ["terms and conditions", "terms", "legal", "LOVELYS"],


};

const Page = () => {
  return (
    <div>
      <TermsConditionsPage />
    </div>
  );
};

export default Page;