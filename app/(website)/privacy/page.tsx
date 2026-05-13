import MaxWidth from '@/app/components/max-width/MaxWidth';
import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen ">

      <MaxWidth>


        <div className="bg-[#0b7211] text-white px-6 py-10 rounded-b-[40px]">
          <div className="">
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Privacy Policy
            </h1>
            <p className="mt-4 text-white/80 text-sm md:text-base block text-center ">
              Your privacy is important to us. Learn how we collect and use your data.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className=" py-10">
          <div className=" bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">

            <p className="text-zinc-500 mb-6">
              Last updated: May 2026
            </p>

            <div className="space-y-6 text-zinc-600 leading-7">

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  1. Introduction
                </h2>
                <p className="mt-2">
                  This Privacy Policy explains how our Food Delivery App collects,
                  uses, and protects your information when you use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  2. Information We Collect
                </h2>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Name and contact information</li>
                  <li>Delivery address</li>
                  <li>Order history</li>
                  <li>Payment information (securely processed)</li>
                  <li>Device and usage data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  3. How We Use Information
                </h2>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>To process food orders and deliveries</li>
                  <li>To improve user experience</li>
                  <li>To provide customer support</li>
                  <li>To send order updates and notifications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  4. Data Sharing
                </h2>
                <p className="mt-2">
                  We do not sell your personal data. Information is only shared
                  with restaurants and delivery partners to complete your order.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  5. Data Security
                </h2>
                <p className="mt-2">
                  We use secure technologies to protect your data from unauthorized access,
                  loss, or misuse.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  6. Your Rights
                </h2>
                <p className="mt-2">
                  You can request to access, update, or delete your personal data anytime.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  7. Contact Us
                </h2>
                <p className="mt-2">
                  If you have any questions, contact us at support@foodapp.com
                </p>
              </section>

            </div>
          </div>
        </div>
      </MaxWidth>

    </div>
  );
};

export default page;