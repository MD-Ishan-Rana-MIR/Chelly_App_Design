import type { Metadata } from "next";
import React from "react";
import BlogPage from "./BlogPage";

export const metadata: Metadata = {
  title: "Blog | LOVELYS",
  description:
    "Read the latest articles, updates, and news from LOVELYS blog.",
  keywords: ["blog", "LOVELYS blog", "news", "articles", "updates"],
  
};

const Blog = () => {
  return (
    <div>
      <BlogPage />
    </div>
  );
};

export default Blog;