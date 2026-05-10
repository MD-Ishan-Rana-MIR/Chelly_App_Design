"use client";

import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import PasswordInput from "@/app/components/input/Password";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  const onSubmit = async (data: FormData) => {

    console.log("Register Data:", data);

    // FAKE API DELAY
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className=" flex items-center justify-center">

      <div
        className="
          w-full
          max-w-3xl
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          border
          border-gray-100
        "
      >

        {/* LOGO */}
        <div className="flex justify-center mb-5">

          <div
            className="
              w-16
              h-16
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
              text-3xl
            "
          >
            🍔
          </div>

        </div>

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Join FoodExpress and order delicious food 🍕
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* FULL NAME */}
          <div>

            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Enter full name"
              register={register}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              }}
              error={errors.fullName?.message}
            />



          </div>

          {/* EMAIL */}
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              error={errors.email?.message}
            />


          </div>


          {/* Phone Number  */}

          <div>
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              register={register}
              rules={{
                required: "Phone number is required",
                // pattern: {
                //   value: /^[0-9]{11}$/,
                //   message: "Phone number must be 11 digits",
                // },
              }}
              error={errors.phone?.message}
            />
          </div>

          {/* PASSWORD */}
          <div>

            <PasswordInput<FormData>
              label="Password"
              name="password"
              placeholder="Enter password"
              register={register}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              }}
              error={errors.password?.message}
            />

          </div>

          {/* CONFIRM PASSWORD */}
          <div>

            <PasswordInput<FormData>
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter confirm password"
              register={register}
              rules={{
                required: "Confirm password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              }}
              error={errors.confirmPassword?.message}
            />

          </div>

          {/* BUTTON */}
          <Button
            loading={isSubmitting}
            text="Create Account"
            py="17px"
            px="12px"
            color="#fff"
            backgroundColor="#0b7211"
            textSize="18px"
            borderRadius="10px"
            fontWeight="600"
            width="100%"
          />

        </form>

        {/* LOGIN */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Already have an account?{" "}

          <Link href={"/login"} className="text-green-700 font-medium cursor-pointer hover:underline">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default RegisterPage;