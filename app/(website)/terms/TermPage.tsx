"use client";

import React from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import TermsSkeleton from "@/app/components/skeleton/TermSkeleton";
import { useGetSettingPageQuery } from "@/app/redux/settingApi";

const TermsConditionsPage = () => {
  const { data, isLoading } = useGetSettingPageQuery("terms_conditions");

  if (isLoading) {
    return <TermsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MaxWidth>
        {/* Header */}
        <div className="bg-[#0b7211] text-white px-6 py-10 rounded-b-[40px]">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Terms & Conditions
            </h1>

            <p className="mt-4 text-white/80 text-sm md:text-base text-center">
              Please read these terms carefully before using our Food Delivery
              App.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="py-10">
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
            {data?.data?.terms_conditions ? (
              <div
                className="prose prose-zinc max-w-none
                  prose-headings:text-zinc-800
                  prose-p:text-zinc-600
                  prose-li:text-zinc-600
                  prose-strong:text-zinc-800"
                dangerouslySetInnerHTML={{
                  __html: data.data.terms_conditions,
                }}
              />
            ) : (
              <div className="text-center py-10 text-zinc-500">
                No Terms & Conditions available.
              </div>
            )}
          </div>
        </div>
      </MaxWidth>
    </div>
  );
};

export default TermsConditionsPage;