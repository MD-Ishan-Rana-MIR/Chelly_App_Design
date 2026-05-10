"use client"
import Link from "next/link";
import Button from "./components/button/Button";
import { redirect } from "next/navigation";

export default function NotFound() {
    const handleNavigate = ()=>{
        redirect("/")
    }
    return (
        <div className="flex h-[68vh] flex-col items-center justify-center bg-white text-center px-4">

            <h1 className="text-6xl font-bold text-gray-800">
                404
            </h1>

            <p className="mt-4 text-lg seconderyText">
                Page Not Found
            </p>

            <p className="mt-2 text-sm seconderyText">
                The page you are looking for doesn’t exist or has been moved.
            </p>

            {/* <Link
                href="/"
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Go Home
            </Link> */}
            <div className=" my-6 " >
                <Button text={"Go Home"}  onClick = {handleNavigate} />
            </div>

        </div>
    );
}