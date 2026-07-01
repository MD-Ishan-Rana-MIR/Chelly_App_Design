import type { Metadata } from "next";
import React from "react";
import WishListPage from "./WishListPage";

export const metadata: Metadata = {
  title: "Wishlist | LOVELYS",
  description:
    "Save your favorite products and view your wishlist anytime on LOVELYS.",
  keywords: ["wishlist", "favorites", "saved items", "LOVELYS"],
  
};

const Page = () => {
  return (
    <div>
      <WishListPage />
    </div>
  );
};

export default Page;