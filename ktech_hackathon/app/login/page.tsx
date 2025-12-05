"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerificationDialog from "@/components/VerificationDialog";
import Link from "next/link";

export default function LoginPage() {
  const [showVerification, setShowVerification] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login with:", formData);
    // Show verification dialog
    setShowVerification(true);
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Sign in with Google");
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log("Forgot password");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32">
        <div className="bg-white w-full max-w-[500px] flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center text-center">
            {/* Logo */}
            <div className="relative w-[43px] h-[43px] rounded-[11px] bg-white border border-[rgba(10,13,18,0.12)] shadow-[0px_1.353px_1.353px_-0.676px_rgba(10,13,18,0.13),0px_1.353px_4.058px_0px_rgba(10,13,18,0.1),0px_1.353px_2.705px_0px_rgba(10,13,18,0.06)] flex items-center justify-center">
              <span className="text-[#19429d] text-[25px] font-extrabold leading-[38px]">
                L
              </span>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <h2 className="font-semibold text-[24px] sm:text-[30px] leading-8 sm:leading-[38px] text-[#181d27]">
                Welcome Back
              </h2>
              <p className="text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
                Sign in to access your dashboard, bookings, and real-time
                updates.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-[#414651]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="font-medium text-sm text-[#414651]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 bg-white border border-[#d5d7da] rounded text-blue-600 focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-[#414651]">
                  Remember for 30 days
                </span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-[#19429d] hover:underline"
              >
                Forgot password
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 sm:px-[18px] py-2.5 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
            >
              Sign in
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-px bg-[#e9eaeb]" />
              <span className="text-sm text-[#717680]">OR</span>
              <div className="flex-1 h-px bg-[#e9eaeb]" />
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-[#d5d7da] text-[#414651] hover:bg-gray-50 font-semibold text-sm sm:text-base px-4 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] flex items-center justify-center gap-2 sm:gap-3"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-[#535862]">Don&apos;t have an account?</span>
            <Link
              href="/signup"
              className="text-[#19429d] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      {/* Verification Dialog */}
      <VerificationDialog
        open={showVerification}
        onOpenChange={setShowVerification}
        onContinue={() => {
          console.log("Continue to check-in");
          // Navigate to dashboard or booking page
        }}
      />
    </>
  );
}
