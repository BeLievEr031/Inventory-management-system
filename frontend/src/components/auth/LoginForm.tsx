"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", { loginId, password, rememberMe });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center px-4 py-8">
            {/* Card */}
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 w-full max-w-[460px] px-10 py-12 flex flex-col">

                {/* Logo & Brand */}
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 relative flex-shrink-0 bg-[#e2e8f0] rounded-lg flex items-center justify-center overflow-hidden">
                        {/* Fallback to a styled div if image fails */}
                        <Image
                            src="/logo.jpeg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                            priority
                            onError={(e) => {
                                // Simple fallback if logo.jpeg is missing
                                (e.target as any).style.display = 'none';
                            }}
                        />
                        <div className="text-[#4f46e5] font-bold text-xs">F-IMS</div>
                    </div>
                    <span className="text-[22px] font-bold text-[#111827] tracking-tight">FlowIMS</span>
                </div>

                {/* Heading */}
                <div className="px-2">
                    <h1 className="text-[32px] font-extrabold text-[#111827] mb-2 leading-tight">Welcome Back</h1>
                    <p className="text-[15px] font-medium text-[#6b7280] mb-8 leading-relaxed">
                        Manage your inventory with precision and ease.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-2">

                    {/* Login ID */}
                    <div className="space-y-2">
                        <label className="block text-[14px] font-semibold text-[#374151]">
                            Login ID
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-[18px] h-[18px] text-[#9ca3af] group-focus-within:text-[#4f46e5] transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                placeholder="login123"
                                className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl pl-12 pr-4 py-3.5 text-[15px] text-[#111827] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#4f46e5]/10 focus:border-[#4f46e5] transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-[14px] font-semibold text-[#374151]">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-[18px] h-[18px] text-[#9ca3af] group-focus-within:text-[#4f46e5] transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl pl-12 pr-12 py-3.5 text-[15px] text-[#111827] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#4f46e5]/10 focus:border-[#4f46e5] transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9ca3af] hover:text-[#6b7280] transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943-9.543-7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between text-[14px] mt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-[18px] h-[18px] text-[#4f46e5] border-gray-300 rounded focus:ring-[#4f46e5]/20 cursor-pointer transition-all"
                            />
                            <span className="text-[#64748b] font-medium group-hover:text-[#334155] transition-colors">Remember me</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-[#4f46e5] hover:text-[#4338ca] font-bold transition-colors"
                        >
                            Forgot password ?
                        </Link>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#4f46e5] hover:bg-[#4338ca] active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] transition-all mt-2 tracking-wide text-[16px]"
                    >
                        SIGN IN
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8 px-2">
                    <div className="flex-1 h-[1px] bg-gray-100" />
                    <span className="text-[13px] font-medium text-[#94a3b8] whitespace-nowrap">Or continue with</span>
                    <div className="flex-1 h-[1px] bg-gray-100" />
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4 px-2">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 border border-[#e5e7eb] rounded-xl py-3 text-[14px] font-bold text-[#475569] hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 border border-[#e5e7eb] rounded-xl py-3 text-[14px] font-bold text-[#475569] hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        <div className="w-[20px] h-[20px] rounded-full border-2 border-[#475569] flex items-center justify-center relative">
                            <div className="w-1.5 h-1.5 bg-[#475569] rounded-full mt-1.5" />
                        </div>
                        SSO
                    </button>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-10">
                    <p className="text-[15px] font-medium text-[#64748b]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#4f46e5] font-bold hover:underline underline-offset-4 ml-1"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <p className="text-[13px] font-medium text-[#94a3b8] mt-8">
                © 2024 FlowIMS Systems. All rights reserved.
            </p>
        </div>
    );
}
