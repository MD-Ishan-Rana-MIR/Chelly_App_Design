/* eslint-disable @typescript-eslint/no-explicit-any */
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios, { type AxiosResponse } from "axios";

console.log("=== DEBUG 1: echo.ts file is loaded successfully! ===");

// ১. Pusher এবং Window ইন্টারফেস টাইপ ডিফাইন করা
declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

// ২. এনভায়রনমেন্ট ভেরিয়েবল ও কনফিগারেশন টাইপস
const reverbHost: string = process.env.NEXT_PUBLIC_REVERB_HOST || "10.10.28.53";
const reverbPort: number = Number(process.env.NEXT_PUBLIC_REVERB_PORT || 8020);
const authEndpoint: string =
  process.env.NEXT_PUBLIC_BROADCAST_AUTH_ENDPOINT ||
  "http://10.10.28.53:60/api/broadcasting/auth";
const reverbAppKey: string =
  process.env.NEXT_PUBLIC_REVERB_APP_KEY || "oskghldeokkdfjdslhnfd";
const isTls: boolean = process.env.NEXT_PUBLIC_REVERB_SCHEME === "https";

console.log("=== DEBUG 3: Final Echo Config ===", {
  reverbHost,
  reverbPort,
  isTls,
  authEndpoint,
});

interface BroadcastChannel {
  name: string;
}

interface AuthResponseData {
  auth: string;
  channel_data?: string;
}

interface ConnectionStates {
  previous: string;
  current: string;
}

let echo: Echo<any> | null = null;

if (typeof window !== "undefined") {
  window.Pusher = Pusher;
  Pusher.logToConsole = true;

  echo = new Echo({
    broadcaster: "reverb",
    key: reverbAppKey,
    wsHost: reverbHost,
    wsPort: reverbPort,
    wssPort: reverbPort,
    forceTLS: isTls,
    enabledTransports: isTls ? ["wss"] : ["ws"],
    authEndpoint: authEndpoint,
    authorizer: (channel: BroadcastChannel) => {
      return {
        authorize: (
          socketId: string,
          callback: (
            error: Error | null,
            responseData: AuthResponseData | null,
          ) => void,
        ): void => {
          const token = localStorage.getItem("token");

          axios
            .post<AuthResponseData>(
              authEndpoint,
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                headers: {
                  Accept: "application/json",
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
              },
            )
            .then((response: AxiosResponse<AuthResponseData>) => {
              console.log("=== DEBUG 6: Auth Success ===", response.data);
              callback(null, response.data);
            })
            .catch((error: Error) => {
              console.error("=== DEBUG 7: Auth Failed ===", error);
              callback(error, null);
            });
        },
      };
    },
  });

  echo.connector.pusher.connection.bind(
    "state_change",
    formatStateChange
  );
}

function formatStateChange(states: ConnectionStates) {
  console.log(
    `Connection changed from ${states.previous} to ${states.current}`,
  );
}

export default echo;