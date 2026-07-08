"use client";

import {  useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { errorMessage } from "@/app/lib/errorMsg";
import { useEmailVerifyMutation, useForgetOtpVerifyMutation, useOtpVerifyMutation } from "@/app/redux/authApi";
import toast from "react-hot-toast";
type FormData = {
    otp: string[];
};

const OtpVerify = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const pageName = searchParams.get("pageName");


    // ===========================================
    // Resend Otp 
    // ==============================================

    const [emailVerify] = useEmailVerifyMutation();

    const handleResendOtp = async () => {
        try {
            const res = await emailVerify({ email }).unwrap();

            if (res) {
                toast.success(res?.message || "OTP resent successfully!");
            }
        } catch (error) {
            return errorMessage(error);
        }
    }





    const {
        handleSubmit,
        setValue,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            otp: ["", "", "", "", "", ""],
        },
    });

    const otp = watch("otp");

    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);

    // TIMER
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // HANDLE OTP INPUT
    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setValue("otp", newOtp);

        // auto focus next input
        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };


    // ========================================== TODO: OTP VERIFY API CALL ==========================================
    const [forgetOtpVerify] = useForgetOtpVerifyMutation();

    const router = useRouter();

    const [otpVerify] = useOtpVerifyMutation();

    const onSubmit = async (data: FormData) => {
        const code = data.otp.join("");

        // validation
        if (code.length !== 6) {
            toast.error("Please enter the 6-digit OTP");
            return;
        }

        if (!/^\d{6}$/.test(code)) {
            toast.error("OTP must be a 6-digit number");
            return;
        }

        const payload = {
            email,
            otp: code,
        };

        try {
            setLoading(true);

            // =========================
            // 🔥 REGISTRATION FLOW
            // =========================
            if (pageName === "registration") {
                const res = await otpVerify(payload).unwrap();

                const token = res?.data?.access_token;

                if (!token) {
                    toast.error("Token not found");
                    return;
                }

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        token,
                        expiry: Date.now() + 4 * 24 * 60 * 60 * 1000,
                    })
                );

                toast.success(res.message || "Registration successful");
                router.push("/");
                return;
            }

            // =========================
            // 🔥 FORGOT PASSWORD FLOW
            // =========================
            if (pageName == "email-verify") {
                const res = await forgetOtpVerify(payload).unwrap();

                const token = res?.data?.reset_token || res?.data?.reset_token;


                if (!token) {
                    toast.error("Token not received");
                    return;
                }

                toast.success(res.message || "OTP verified");

                localStorage.setItem(
                    "f-token",
                    JSON.stringify({
                        token,
                        expiry: Date.now() + 10 * 60 * 1000, // 10 minutes
                    })
                );

                router.push(`/password-change?email=${email}`);
                return;
            }



        } catch (error) {
            return errorMessage(error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="flex items-center justify-center h-[60vh]   px-4">

            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

                {/* TITLE */}
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Verify Your Otp
                </h1>

                <p className="text-center text-gray-500 mt-2 text-sm">
                    We sent a 6-digit code to your email address
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">

                    {/* OTP INPUTS */}
                    <div className="flex justify-between gap-2">

                        {otp.map((_, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-lg font-bold border rounded-xl focus:outline-none focus:border-[#0b7211]"
                                value={otp[index]}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                            />
                        ))}

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 cursor-pointer btnColor hover:bg-[#095c0e] text-white py-3 rounded-xl font-semibold transition"
                    >
                        {loading ? "Verifying..." : "Verify Otp"}
                    </button>

                </form>

                {/* RESEND */}
                <div className="text-center mt-6 text-sm text-gray-600">

                    {timer > 0 ? (
                        <p>
                            Resend code in{" "}
                            <span className="font-bold text-[#0b7211]">
                                {timer}s
                            </span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            className="text-[#0b7211] font-semibold hover:underline cursor-pointer "
                        >
                            Resend Code
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
};

export default OtpVerify;