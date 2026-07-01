import type { Metadata } from "next";
import React from "react";
import EbtPayment from "./EbtPayment";

export const metadata: Metadata = {
  title: "EBT Payment | LOVELYS",
  description:
    "Secure and fast EBT payment processing on LOVELYS platform.",
  keywords: ["EBT payment", "payment", "LOVELYS", "secure checkout"],

};

const Page = () => {
  return (
    <div>
      <EbtPayment />
    </div>
  );
};

export default Page;