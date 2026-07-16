/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import Image from "next/image";
import { FiEdit3, FiSave, FiX, FiUser } from "react-icons/fi";
import {
    useUserProfileQuery,
    useUserProfileUpdateMutation,
} from "@/app/redux/authApi";
import ProfileSkeleton from "@/app/components/skeleton/ProfileSkeleton";

type ProfileForm = {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
};

export default function ProfilePage() {
    // ===============================================
    // User Profile API
    // ===============================================
    const { data, isLoading: profileLoading } = useUserProfileQuery(undefined);


    // ===============================================
    // Profile Update API
    // ===============================================
    const [userProfileUpdate, { isLoading }] = useUserProfileUpdateMutation();

    const [isEdit, setIsEdit] = useState(false);

    const [form, setForm] = useState<ProfileForm>({
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: "/user.png",
    });

    // ===============================================
    // Set API Data to Form
    // ===============================================
    useEffect(() => {
        if (data?.data) {
            setForm({
                name: data.data.name || "",
                email: data.data.email || "",
                phone: data.data.phone || "",
                address: data.data.address || "",
                avatar: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data.data.avatar}`
            });
        }
    }, [data]);


    // ===============================================
    // Handle Input Change
    // ===============================================
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ===============================================
    // Handle Image Upload
    // ===============================================
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setAvatarFile(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                avatar: reader.result as string,
            }));
        };

        reader.readAsDataURL(file);
    };

    // ===============================================
    // Save Profile
    // ===============================================
    const handleSave = async () => {
        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("address", form.address);

            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }

            await userProfileUpdate(formData).unwrap();

            setIsEdit(false);
        } catch (error) {
            console.error("Profile Update Error:", error);
        }
    };

    // ===============================================
    // Loading
    // ===============================================
    if (profileLoading) {
        return (
            <MaxWidth>
                <div className="text-center text-lg font-medium">
                    <ProfileSkeleton />
                </div>
            </MaxWidth>
        );
    }

    return (
        <MaxWidth>
            <div className="py-12">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Profile Settings
                    </h1>

                    {!isEdit ? (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="flex items-center cursor-pointer gap-2 px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            <FiEdit3 />
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(false)}
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            <FiX />
                            Cancel
                        </button>
                    )}
                </div>

                {/* MAIN CARD */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* LEFT SIDEBAR */}
                        <div className="bg-gradient-to-b from-green-600 to-green-500 p-8 text-white flex flex-col items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <Image
                                    src={form?.avatar}
                                    alt="profile"
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>

                            {isEdit && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mt-4 text-sm w-full"
                                />
                            )}

                            <h2 className="mt-5 text-xl font-bold">
                                {form.name}
                            </h2>

                            <p className="text-white/80 text-sm">
                                {form.email}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-white/90">
                                <FiUser />
                                User Profile
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="lg:col-span-2 p-8 md:p-10 space-y-6">
                            {/* NAME */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    Full Name
                                </label>

                                {isEdit ? (
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold mt-1">
                                        {form.name}
                                    </p>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    Email Address
                                </label>

                                {isEdit ? (
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold mt-1">
                                        {form.email}
                                    </p>
                                )}
                            </div>

                            {/* PHONE */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    Phone Number
                                </label>

                                {isEdit ? (
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold mt-1">
                                        {form.phone}
                                    </p>
                                )}
                            </div>

                            {/* ADDRESS */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    Address
                                </label>

                                {isEdit ? (
                                    <input
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold mt-1">
                                        {form.address}
                                    </p>
                                )}
                            </div>

                            {/* SAVE BUTTON */}
                            {isEdit && (
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="flex cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold mt-6 disabled:opacity-50"
                                >
                                    <FiSave />
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidth>
    );
}