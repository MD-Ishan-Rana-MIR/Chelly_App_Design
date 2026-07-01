"use client";

import React from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { useGetSettingPageQuery } from "@/app/redux/settingApi";
import TermsSkeleton from "@/app/components/skeleton/TermSkeleton";

const PrivacyPolicyPage = () => {
    const { data, isLoading } = useGetSettingPageQuery("privacy_policy");

    if (isLoading) {
        return (
            <div className="min-h-screen ">
                <TermsSkeleton />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MaxWidth>
                {/* Header */}
                <div className="bg-[#0b7211] text-white px-6 py-10 rounded-b-[40px]">
                    <h1 className="text-3xl md:text-5xl font-bold text-center">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-white/80 text-sm md:text-base text-center">
                        Your privacy is important to us. Learn how we collect and use your
                        data.
                    </p>
                </div>

                {/* Content */}
                <div className="py-10">
                    <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
                        {/* <p className="text-zinc-500 mb-6">
              Last updated: May 2026
            </p> */}
                        <div
                            className="prose prose-zinc max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: data?.data?.privacy_policy || "",
                            }}
                        />
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default PrivacyPolicyPage;