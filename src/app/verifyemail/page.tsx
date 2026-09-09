"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });

            setVerified(true);
        } catch (error: any) {
            setError(true);

            console.log(error.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];

        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                {/* Logo / Brand */}
                <div className="text-center mb-8">

                    <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/20">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Email Verification
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        We're verifying your email address
                    </p>

                </div>

                {/* Main Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Verification Status */}
                    <div className="p-6 sm:p-8">

                        {!verified && !error && (
                            <div className="text-center">

                                {/* Loading Icon */}
                                <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">

                                    <svg
                                        className="w-8 h-8 text-blue-500 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />

                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>

                                </div>

                                <h2 className="text-xl font-semibold text-white">
                                    Verifying your email
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    Please wait while we verify your account.
                                </p>

                            </div>
                        )}

                        {/* Success State */}
                        {verified && (
                            <div className="text-center">

                                <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">

                                    <svg
                                        className="w-8 h-8 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>

                                </div>

                                <h2 className="text-2xl font-bold text-white">
                                    Email Verified!
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Your email address has been successfully
                                    verified. Your account is now ready to use.
                                </p>

                                {/* Token Display */}
                                <div className="mt-6 p-4 rounded-xl bg-gray-950 border border-gray-800 text-left">

                                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                                        Verification Token
                                    </p>

                                    <p className="text-xs font-mono text-gray-400 break-all">
                                        {token ? `${token}` : "no token"}
                                    </p>

                                </div>

                                <Link
                                    href="/login"
                                    className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold transition-all duration-200"
                                >
                                    Continue to Login

                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>

                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="text-center">

                                <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">

                                    <svg
                                        className="w-8 h-8 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                </div>

                                <h2 className="text-2xl font-bold text-white">
                                    Verification Failed
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    We couldn't verify your email address.
                                    The verification link may be invalid or
                                    expired.
                                </p>

                                {/* Error Box */}
                                <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-left">

                                    <div className="flex items-start gap-3">

                                        <svg
                                            className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>

                                        <div>
                                            <p className="text-sm font-medium text-red-400">
                                                Invalid verification link
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Please request a new verification
                                                email and try again.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <Link
                                    href="/login"
                                    className="mt-6 w-full inline-flex items-center justify-center py-3 px-4 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white font-semibold transition-all duration-200"
                                >
                                    Back to Login
                                </Link>

                            </div>
                        )}

                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    Secure account verification
                </p>

            </div>

        </main>
    );
}