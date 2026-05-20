"use client";

import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import PasswordInput from "@/app/components/input/Password";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((res) => setTimeout(res, 1500));
  };

  return (
    <div className="flex items-center justify-center  my-14 ">

      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg bg-white">

        {/* 🔥 TOP LOGO + TITLE */}
        <div className="flex flex-col items-center mb-6">

          <Image
            src="/logo/logo.png"   // 👉 replace with your logo path
            alt="logo"
            width={300}
            height={300}
            className="w-16 h-16 object-contain mb-2"
          />

          <h1 className="text-2xl font-bold text-center">
            Login
          </h1>

          <p className="text-sm text-gray-500">
            Welcome back! Please login to continue
          </p>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          <div  >
            <p onClick={() => { redirect("/email-verify") }} className=" text-end font-normal text-sm cursor-pointer " >Forget password</p>
          </div>

          {/* BUTTON */}
          <Button
            loading={isSubmitting}
            text="Login"
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

        <div>
          <span className=" text-center block my-6 text-[15px] " >
            You Have no account please!
            <Link className=" underline " href={"/registration"}>SignUp</Link>
          </span>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;