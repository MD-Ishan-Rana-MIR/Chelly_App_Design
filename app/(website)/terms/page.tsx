import MaxWidth from '@/app/components/max-width/MaxWidth';
import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen ">



      <MaxWidth>
        <div className="bg-[#0b7211] text-white px-6 py-10 rounded-b-[40px]">
          <div className="">
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-white/80 text-sm md:text-base block text-center ">
              Please read these terms carefully before using our Food Delivery App.
            </p>

          </div>
        </div>

        {/* Content */}
        <div className="py-10">
          <div className=" bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">

            <p className="text-zinc-500 mb-6">
              Last updated: May 2026
            </p>

            <div className="space-y-6 text-zinc-600 leading-7">

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  1. Acceptance of Terms
                </h2>
                <p className="mt-2">
                  By using this app, you agree to comply with and be bound by these Terms and Conditions.
                  If you do not agree, please do not use the app.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  2. Use of the App
                </h2>
                <p className="mt-2">
                  You agree to use the Food Delivery App only for lawful purposes and in a way that does not
                  violate the rights of others or restrict their use of the app.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  3. User Accounts
                </h2>
                <p className="mt-2">
                  You are responsible for maintaining the confidentiality of your account and password.
                  Any activity under your account is your responsibility.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  4. Orders and Payments
                </h2>
                <p className="mt-2">
                  All orders placed through the app are subject to availability.
                  We reserve the right to cancel or refuse any order.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  5. Delivery
                </h2>
                <p className="mt-2">
                  Delivery times are estimated and may vary due to traffic, weather, or other conditions.
                  We are not responsible for delays outside our control.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  6. Refund Policy
                </h2>
                <p className="mt-2">
                  Refunds are provided only in cases of failed delivery or valid issues with the order,
                  as per our refund policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  7. Changes to Terms
                </h2>
                <p className="mt-2">
                  We may update these Terms & Conditions at any time.
                  Continued use of the app means you accept the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-800">
                  8. Contact Us
                </h2>
                <p className="mt-2">
                  If you have any questions, please contact us at support@foodapp.com
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