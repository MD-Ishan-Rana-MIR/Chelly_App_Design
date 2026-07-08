import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

    prepareHeaders: (headers) => {
      // Prevent localStorage access during SSR
      if (typeof window === "undefined") {
        return headers;
      }

      try {
        // Get auth data
        const auth = localStorage.getItem("auth");

        if (!auth) {
          return headers;
        }

        const parsedAuth = JSON.parse(auth);

        // Check auth token expiry
        if (parsedAuth?.expiry && Date.now() > Number(parsedAuth.expiry)) {
          localStorage.removeItem("auth");
          return headers;
        }

        // Set Authorization header
        if (parsedAuth?.token) {
          headers.set("Authorization", `Bearer ${parsedAuth.token}`);
        }

        // Optional: Check f-token expiry
        const fToken = localStorage.getItem("f-token");

        if (fToken) {
          const parsedFToken = JSON.parse(fToken);

          if (
            parsedFToken?.expiry &&
            Date.now() > Number(parsedFToken.expiry)
          ) {
            localStorage.removeItem("f-token");
          }
        }
      } catch (error) {
        console.error("Error parsing auth token:", error);
        localStorage.removeItem("auth");
      }

      return headers;
    },
  }),

  tagTypes: ["Auth", "Blog", "Category", "User", "Setting","Order","CheckOut","Notification","Collection"],

  endpoints: () => ({}),
});
