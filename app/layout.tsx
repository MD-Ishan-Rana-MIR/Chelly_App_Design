import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StickySliderNavbar from "./components/navbar/StickyNavbar";
import Navbar from "./components/navbar/MainNavbar";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "./components/provider/Provider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LOVELYS",
  description: "LOVELYS - Your trusted platform for quality products and services.",
  keywords: ["lovelys", "ecommerce", "online shop", "products"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="">
        <StickySliderNavbar />

        <div className=" min-h-[calc(100vh-564px)]">
          <Providers>

            <Suspense fallback={<h1>Loading....</h1>} >
              <Navbar />
              {children}
              <Footer></Footer>

            </Suspense>
          </Providers>

        </div>
        <div>

        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
