"use client"

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Building, CreditCard, Lock, CheckCircle, PackageSearch } from 'lucide-react';

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
    const [packages, setPackages] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        pin: '',
        package_id: '',
        permissionSelect: '',
    });

    React.useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ebt-packages`);
                const data = await response.json();
                if (response.ok) {
                    setPackages(data.data || []);
                }
            } catch (error) {
                console.error('Failed to fetch packages:', error);
            }
        };
        fetchPackages();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.permissionSelect !== 'yes') {
            toast.error('You must give permission to charge your EBT card in order to place this order.');
            return;
        }

        if (packages.length > 0 && !formData.package_id) {
            toast.error('Please select a meal plan.');
            return;
        }

        const rawCardNumber = formData.cardNumber.replace(/\D/g, "");
        if (rawCardNumber.length < 16 || rawCardNumber.length > 19) {
            toast.error('EBT Card Number must be between 16 and 19 digits.');
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
                body: JSON.stringify({
                    ...formData,
                    cardNumber: rawCardNumber, // Strip spaces before sending
                    // If no packages exist, bypass package validation by passing dummy value or just omit
                    package_id: packages.length === 0 ? undefined : formData.package_id
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Thank you! Your EBT order has been placed successfully.');
                setFormData({
                    firstName: '', lastName: '', email: '', phone: '', address1: '', address2: '', city: '', state: '', zipCode: '', cardNumber: '', pin: '', package_id: '', permissionSelect: '',
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
        <div className="w-full min-h-screen py-16 px-4 bg-gray-50 flex flex-col justify-start items-center font-sans">
            <div className="w-full max-w-4xl bg-white p-8 md:p-12 shadow-2xl rounded-2xl border border-gray-100">

                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-[#1e3a61] tracking-tight mb-4">
                        Secure EBT Checkout
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        Complete your purchase using your EBT card. Your information is securely encrypted and processed.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    
                    {/* SECTION 1: Personal Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <User className="text-[#1e3a61] w-5 h-5" />
                            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                    placeholder="John"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium flex items-center gap-1"><Mail className="w-4 h-4 text-gray-400"/> Email Address*</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium flex items-center gap-1"><Phone className="w-4 h-4 text-gray-400"/> Phone Number*</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                    placeholder="(555) 000-0000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Shipping Address */}
                    <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <MapPin className="text-[#1e3a61] w-5 h-5" />
                            <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 text-sm font-medium">Address Line 1</label>
                            <input
                                type="text"
                                required
                                value={formData.address1}
                                onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                placeholder="123 Main St"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 text-sm font-medium flex items-center gap-1"><Building className="w-4 h-4 text-gray-400"/> Address Line 2 (Optional)</label>
                            <input
                                type="text"
                                value={formData.address2}
                                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                placeholder="Apt, Suite, Bldg"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium">City</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium">State</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 appearance-none cursor-pointer transition-all"
                                    >
                                        <option value="">Select State</option>
                                        {US_STATES.map((state) => (
                                            <option key={state.code} value={state.code}>{state.name}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium">Zip Code</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.zipCode}
                                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 transition-all"
                                />
                            </div>
                        </div>
                    </div>



                    {/* SECTION 3: Select Package */}
                    {packages.length > 0 ? (
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                                <PackageSearch className="text-[#1e3a61] w-5 h-5" />
                                <h2 className="text-xl font-semibold text-gray-800">Select EBT Package</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {packages.map((pkg) => (
                                    <div 
                                        key={pkg.id} 
                                        onClick={() => setFormData({ ...formData, package_id: String(pkg.id) })}
                                        className={`flex flex-col justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                            String(formData.package_id) === String(pkg.id) 
                                            ? 'border-[#1e3a61] bg-[#1e3a61]/5 shadow-md' 
                                            : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900 text-lg">{pkg.title}</h3>
                                                {String(formData.package_id) === String(pkg.id) && (
                                                    <CheckCircle className="text-[#1e3a61] w-5 h-5" />
                                                )}
                                            </div>
                                            <p className="text-2xl font-extrabold text-[#1e3a61] mb-3">${Number(pkg.price).toFixed(2)}</p>
                                        </div>
                                        {pkg.product_url && (
                                            <a href={pkg.product_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center mt-auto" onClick={(e) => e.stopPropagation()}>
                                                View Details →
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                                <PackageSearch className="text-[#1e3a61] w-5 h-5" />
                                <h2 className="text-xl font-semibold text-gray-800">EBT Packages</h2>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-800">
                                <strong>Note:</strong> There are no predefined EBT packages available right now. However, you can still securely authorize your card, and our team will manually process your custom order.
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: EBT Payment Details */}
                    <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <CreditCard className="text-[#1e3a61] w-5 h-5" />
                            <h2 className="text-xl font-semibold text-gray-800">EBT Payment Secure Checkout</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium flex items-center gap-1">EBT (SNAP) Card Number <Lock className="w-3 h-3 text-gray-400"/></label>
                                <input
                                    type="text"
                                    maxLength={23} // 19 digits + 4 spaces max
                                    required
                                    value={formData.cardNumber}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, "");
                                        if (value.length > 19) value = value.slice(0, 19);
                                        let formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                                        setFormData({ ...formData, cardNumber: formattedValue });
                                    }}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 font-mono tracking-wider transition-all"
                                    placeholder="0000 0000 0000 0000"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 text-sm font-medium flex items-center gap-1">EBT (SNAP) PIN <Lock className="w-3 h-3 text-gray-400"/></label>
                                <input
                                    type="password"
                                    maxLength={4}
                                    required
                                    value={formData.pin}
                                    onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, "") })}
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a61]/30 focus:border-[#1e3a61] text-gray-800 font-mono tracking-widest transition-all text-xl"
                                    placeholder="••••"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-3 mt-6">
                            <input
                                type="checkbox"
                                id="permissionSelect"
                                required
                                checked={formData.permissionSelect === "yes"}
                                onChange={(e) => setFormData({ ...formData, permissionSelect: e.target.checked ? "yes" : "no" })}
                                className="mt-1 w-5 h-5 text-[#1e3a61] rounded focus:ring-[#1e3a61] cursor-pointer"
                            />
                            <label htmlFor="permissionSelect" className="text-sm text-gray-700 cursor-pointer select-none">
                                I confirm and authorize Lovely's to securely charge my EBT card for the total amount of the selected package. I understand this action is final once processed.
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting || formData.permissionSelect !== "yes"}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-[#1e3a61] to-[#2a5288] hover:from-[#172c4a] hover:to-[#1e3a61] text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Secure Checkout...
                                </span>
                            ) : (
                                "Complete EBT Order"
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3" /> Secure 256-bit SSL Encryption
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
