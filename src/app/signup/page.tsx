"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">S</span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Create an account
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Sign up to get started with StudyHub
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <div className="space-y-5">
                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={user.username}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        username: e.target.value,
                                    })
                                }
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        {/* Signup Button */}
                        <button
                            onClick={onSignup}
                            disabled={buttonDisabled}
                            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 text-white font-semibold transition duration-200"
                        >
                            {buttonDisabled ? "Processing..." : "Signup"}
                        </button>
                    </div>

                    {/* Login */}
                    <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-500 hover:text-blue-400 font-medium transition"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    © {new Date().getFullYear()} StudyHub
                </p>
            </div>
        </div>
    );
}
