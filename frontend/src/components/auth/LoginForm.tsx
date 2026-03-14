"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login Attempt:", { loginId, password, rememberMe });
        // Handle login logic here
    };

    const EyeIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );

    const EyeOffIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-flowims-gradient font-sans">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in relative z-10">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/logo.jpeg"
                            alt="FlowIMS Logo"
                            width={160}
                            height={80}
                            className="h-20 w-auto object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500 font-medium lowercase">Sign in to continue to FlowIMS</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Login ID Input */}
                    <div>
                        <label
                            htmlFor="loginId"
                            className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1 uppercase tracking-wider"
                        >
                            Login ID
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-600 transition-colors duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="loginId"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-teal-500 focus:border-teal-500 block w-full pl-11 p-3 transition-all duration-200 outline-none"
                                placeholder="Enter your ID"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1 uppercase tracking-wider"
                        >
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-600 transition-colors duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-teal-500 focus:border-teal-500 block w-full pl-11 pr-11 p-3 transition-all duration-200 outline-none"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-teal-600 transition-colors duration-200"
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer transition-all"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200 font-medium">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors duration-200">
                            <Link href="#">Forgot password?</Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-bold rounded-xl text-md px-5 py-4 text-center transition-all duration-200 shadow-lg hover:shadow-teal-500/30 transform active:scale-[0.98] tracking-wide"
                    >
                        SIGN IN
                    </button>

                    <div className="text-center text-sm text-gray-500 mt-6 font-medium">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-bold text-teal-600 hover:text-teal-700 transition-colors duration-200 ml-1">
                            Sign up now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
