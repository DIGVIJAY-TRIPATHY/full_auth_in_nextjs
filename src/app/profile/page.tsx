"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");

            toast.success("Logout successful");

            router.push("/login");
        } catch (error: any) {
            console.log(error.message);

            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");

        console.log(res.data);

        setData(res.data.data._id);
    };

    return (
        <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-2xl font-bold text-white">P</span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Manage and view your account information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Info */}
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                                <span className="text-xl font-bold text-white">
                                    U
                                </span>
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-gray-400">
                                    Profile Information
                                </p>

                                <h2 className="text-lg font-semibold text-white">
                                    Your Account
                                </h2>
                            </div>
                        </div>

                        {/* User ID Section */}
                        <div className="mt-7 p-4 bg-gray-950 border border-gray-800 rounded-xl">
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                                User ID
                            </p>

                            {data === "nothing" ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-500" />

                                    <span className="text-sm text-gray-400">
                                        User details not loaded yet
                                    </span>
                                </div>
                            ) : (
                                <Link
                                    href={`/profile/${data}`}
                                    className="block truncate text-sm font-medium text-blue-400 hover:text-blue-300 transition"
                                >
                                    {data}
                                </Link>
                            )}
                        </div>

                        {/* Get Details Button */}
                        <button
                            onClick={getUserDetails}
                            className="w-full mt-6 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold transition-all duration-200"
                        >
                            Get User Details
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-800" />

                    {/* Logout Section */}
                    <div className="p-6 sm:p-8 bg-gray-900/50">
                        <p className="text-sm text-gray-400 mb-4">
                            Want to leave your account?
                        </p>

                        <button
                            onClick={logout}
                            className="w-full py-3 px-4 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 active:scale-[0.98] text-red-400 font-semibold transition-all duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    Your account information is securely managed.
                </p>
            </div>
        </main>
    );
}
