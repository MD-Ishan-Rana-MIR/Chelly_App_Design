// app/actions/login.ts
"use server";

import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function loginAction(data: { email: string; password: string }) {
  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();


  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  // ✅ set cookie
  (
    await // ✅ set cookie
    cookies()
  ).set("token", result?.data?.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return result;
}
