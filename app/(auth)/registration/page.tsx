import type { Metadata } from "next";
import React from "react";
import Registration from "./Registration";

export const metadata: Metadata = {
  title: "Register | LOVELYS",
  description:
    "Create a new LOVELYS account and start exploring our platform.",
  keywords: ["register", "sign up", "create account", "LOVELYS"],
};

const Page = () => {
  return (
    <div>
      <Registration />
    </div>
  );
};

export default Page;