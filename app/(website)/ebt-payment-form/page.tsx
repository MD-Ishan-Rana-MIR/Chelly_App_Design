"use client"

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export default function UnifiedEbtOrderForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        pin: '',
        meal70Select: '',
        meal130Select: '',
        permissionSelect: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.permissionSelect !== 'yes') {
            toast.error('You must give permission to charge your EBT card in order to place this order.');
            return;
        }

        if (formData.meal70Select !== 'yes' && formData.meal130Select !== 'yes') {
            toast.error('Please select a meal plan.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ebt-orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Thank you! Your EBT order has been placed successfully.');
                setFormData({
                    firstName: '', lastName: '', email: '', address1: '', address2: '', city: '', state: '', zipCode: '', cardNumber: '', pin: '', meal70Select: '', meal130Select: '', permissionSelect: '',
                });
            } else {
                toast.error(data.message || 'Failed to place EBT order. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting EBT order:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen py-12 px-4 flex flex-col justify-start items-center ">
            {/* Form Container Card */}
            <div className="w-full max-w-[700px] bg-white border border-[#cccccc] p-6 md:p-12 shadow-sm rounded-sm">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-[#1e3a61] text-3xl font-bold font-sans tracking-wide mb-3">
                        EBT Order Form
                    </h1>
                    <p className="text-[#666666] text-sm md:text-base leading-relaxed font-normal">
                        This form is used to process EBT payments. You will receive a promo code to complete your order once you complete the form.
                    </p>
                </div>

        {/* Global Form element */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* =========================================================
                      PART 1: PROFILE AND ADDRESS DATA
                     ========================================================= */}

          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#333333] text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#333333] text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#333333] text-sm font-medium">Email*</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
            />
          </div>

          {/* Row 3: Address Line 1 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#333333] text-sm font-medium">
              Address Line 1
            </label>
            <input
              type="text"
              value={formData.address1}
              onChange={(e) =>
                setFormData({ ...formData, address1: e.target.value })
              }
              className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
            />
          </div>

          {/* Row 4: Address Line 2 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#333333] text-sm font-medium">
              Address Line 2
            </label>
            <input
              type="text"
              value={formData.address2}
              onChange={(e) =>
                setFormData({ ...formData, address2: e.target.value })
              }
              className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
            />
          </div>

          {/* Row 5, 6 & 7: City, State, Zip Code (Grouped for a cleaner grid flow) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#333333] text-sm font-medium">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
              />
            </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#333333] text-sm font-medium">State</label>
                            <div className="relative w-full">
                                <select
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    className="w-full h-10 pl-3 pr-10 border border-[#cccccc] bg-white rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Please Select</option>
                                    <option value="CA">California</option>
                                    <option value="NY">New York</option>
                                    <option value="TX">Texas</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#1e3a61]">
                                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#333333] text-sm font-medium">
                Zip Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
              />
            </div>
          </div>

          {/* =========================================================
                      PART 2: CARD SECURITY DATA & CUSTOM SELECTIONS
                     ========================================================= */}

          {/* Row 8: EBT Card & PIN Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#333333] text-sm font-medium">
                EBT (SNAP) Card Number
              </label>
              <input
                type="text"
                maxLength={19}
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cardNumber: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#333333] text-sm font-medium">
                EBT (SNAP) PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={formData.pin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pin: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full h-10 px-3 border border-[#cccccc] rounded-sm focus:outline-none focus:border-[#1e3a61] text-gray-800 text-sm transition-colors"
              />
            </div>
          </div>

          {/* Row 9: Meal Options Radio Split Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {/* 10 Meals Segment */}
            <div className="flex flex-col">
              <span className="text-[#333333] text-base font-medium border-b border-[#eeeeee] pb-1.5 mb-3">
                10 Meals for $70
              </span>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer text-[#333333] text-sm subpixel-antialiased">
                  <input
                    type="radio"
                    name="meal70Select"
                    value="yes"
                    checked={formData.meal70Select === "yes"}
                    onChange={(e) =>
                      setFormData({ ...formData, meal70Select: e.target.value })
                    }
                    className="w-4 h-4 text-[#1e3a61] focus:ring-[#1e3a61] border-gray-300"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-[#333333] text-sm subpixel-antialiased">
                  <input
                    type="radio"
                    name="meal70Select"
                    value="no"
                    checked={formData.meal70Select === "no"}
                    onChange={(e) =>
                      setFormData({ ...formData, meal70Select: e.target.value })
                    }
                    className="w-4 h-4 text-[#1e3a61] focus:ring-[#1e3a61] border-gray-300"
                  />
                  No
                </label>
              </div>
            </div>

            {/* 21 Meals Segment */}
            <div className="flex flex-col">
              <span className="text-[#333333] text-base font-medium border-b border-[#eeeeee] pb-1.5 mb-3">
                21 meals for $130
              </span>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer text-[#333333] text-sm subpixel-antialiased">
                  <input
                    type="radio"
                    name="meal130Select"
                    value="yes"
                    checked={formData.meal130Select === "yes"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        meal130Select: e.target.value,
                      })
                    }
                    className="w-4 h-4 text-[#1e3a61] focus:ring-[#1e3a61] border-gray-300"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-[#333333] text-sm subpixel-antialiased">
                  <input
                    type="radio"
                    name="meal130Select"
                    value="no"
                    checked={formData.meal130Select === "no"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        meal130Select: e.target.value,
                      })
                    }
                    className="w-4 h-4 text-[#1e3a61] focus:ring-[#1e3a61] border-gray-300"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Row 10: Legal Consent Radio Block */}
          <div className="flex flex-col pt-4">
            <span className="text-[#333333] text-base font-medium border-b border-[#eeeeee] pb-1.5 mb-3">
              You give Lovely's Permission to charge your EBT card
            </span>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 cursor-pointer text-[#333333] text-sm subpixel-antialiased">
                <input
                  type="radio"
                  name="permissionSelect"
                  value="yes"
                  checked={formData.permissionSelect === "yes"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      permissionSelect: e.target.value,
                    })
                  }
                  className="w-4 h-4 text-[#1e3a61] focus:ring-[#1e3a61] border-gray-300"
                />
                Yes
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-[#333333] text-sm subpixel-antialiased">
                <input
                  type="radio"
                  name="permissionSelect"
                  value="no"
                  checked={formData.permissionSelect === "no"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      permissionSelect: e.target.value,
                    })
                  }
                  className="w-4 h-4 text-[#1e3a61] focus:ring-[#1e3a61] border-gray-300"
                />
                No
              </label>
            </div>
          </div>

                    {/* Row 11: Final Submit Trigger */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full bg-[#333333] hover:bg-[#222222] text-white font-sans font-bold text-lg py-3.5 transition-colors duration-200 shadow-sm rounded-xs cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
