"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";
import { storage } from "@/lib/storage";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin?: () => void;
  onSuccess?: () => void; // Callback after successful signup
}

export default function SignUpDialog({
  open,
  onOpenChange,
  onSwitchToLogin,
  onSuccess,
}: SignUpDialogProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (open && isMobile) {
      router.push("/signup");
      onOpenChange(false);
    }
  }, [open, isMobile, router, onOpenChange]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nin: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form fields
    if (!formData.firstName || !formData.lastName) {
      toast.error("First name and last name are required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email) {
      toast.error("Email is required");
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    if (!formData.nin) {
      toast.error("NIN is required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      // Call signup API
      const response = await axiosInstance.post("/users/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        NIN: formData.nin,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      });

      // Check if response is successful (201 status)
      if (response.status === 201 || response.status === 200) {
        // Backend returns: { status, accessToken, refreshToken, data: { data: user } }
        const { accessToken, refreshToken, data: responseData } = response.data;
        const user = responseData?.data || responseData || response.data.user;

        // Store tokens and user data if available
        if (accessToken) {
          storage.setAccessToken(accessToken);
        }
        if (refreshToken) {
          storage.setRefreshToken(refreshToken);
        }
        if (user) {
          storage.setUser(user);
        }

        // Proceed with login and modal closing regardless of token structure
        if (accessToken && user) {
          // Sign in with NextAuth to establish session
          try {
            const signInResult = await signIn("credentials", {
              email: formData.email,
              password: formData.password,
              redirect: false,
            });

            if (signInResult?.ok) {
              toast.success("Account created and logged in successfully!");
            } else {
              // Signup succeeded but NextAuth sign-in failed
              // Still proceed since tokens are stored
              toast.success("Account created successfully!");
            }

            // Close the modal immediately
            setIsSubmitting(false);
            onOpenChange(false);

            // Call success callback if provided (to update auth state and button)
            if (onSuccess) {
              // Small delay to ensure modal is closed and state is updated
              setTimeout(() => {
                onSuccess();
              }, 200);
            } else {
              // Refresh the page to update auth state
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }
          } catch (signInError) {
            // Signup succeeded but NextAuth sign-in had an error
            // Still proceed since tokens are already stored
            toast.success("Account created successfully!");

            // Close the modal immediately
            setIsSubmitting(false);
            onOpenChange(false);

            if (onSuccess) {
              setTimeout(() => {
                onSuccess();
              }, 200);
            } else {
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }
          }
        } else {
          // Response successful but missing tokens/user - still close modal
          toast.success("Account created successfully! Please log in.");
          setIsSubmitting(false);
          onOpenChange(false);

          if (onSuccess) {
            setTimeout(() => {
              onSuccess();
            }, 200);
          }
        }
      } else {
        // Unexpected response status
        toast.error("Unexpected response. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error: any) {
      // Catch and handle all errors silently - prevent console errors
      let errorMessage = "Failed to create account. Please try again.";

      // Use optional chaining to safely access error properties
      if (error?.response) {
        // Server responded with error status
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          `Request failed: ${error.response?.status || "unknown"}`;
      } else if (error?.request) {
        // Request was made but no response received
        errorMessage = "Network error. Please check your connection.";
      } else if (error?.message) {
        // Something else happened
        errorMessage = error.message;
      }

      // Show user-friendly error message
      toast.error(errorMessage);

      // Error is fully handled - prevent any console logging
      // By catching and handling here, we prevent error propagation
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up
    console.log("Sign up with Google");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[90vw] sm:max-w-[450px] md:max-w-[500px] max-h-[90vh] overflow-y-auto p-0 gap-0">
          <div className="bg-white flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:gap-6 items-center text-center">
              {/* Logo */}
              <div className="flex items-center justify-center">
                <img src="/logo.svg" alt="luxehaven" className="h-12 w-auto" />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <DialogTitle asChild>
                  <h2 className="font-semibold text-[24px] sm:text-[30px] leading-[32px] sm:leading-[38px] text-[#181d27]">
                    Create an account
                  </h2>
                </DialogTitle>
                <p className="text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
                  Join our platform and enjoy fast bookings, secure check-ins,
                  and a smarter hospitality experience.
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 sm:gap-6"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="firstName"
                    className="font-medium text-sm text-[#414651]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="Enter your first name"
                    className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="lastName"
                    className="font-medium text-sm text-[#414651]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Enter your last name"
                    className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

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

                {/* NIN */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nin"
                    className="font-medium text-sm text-[#414651]"
                  >
                    NIN
                  </label>
                  <input
                    type="text"
                    id="nin"
                    value={formData.nin}
                    onChange={(e) =>
                      setFormData({ ...formData, nin: e.target.value })
                    }
                    placeholder="Enter your NIN number"
                    className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <p className="text-sm text-[#535862]">
                    Your ID will be verified using AI. All data is encrypted and
                    processed securely.
                  </p>
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

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="passwordConfirm"
                    className="font-medium text-sm text-[#414651]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passwordConfirm: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 sm:px-[18px] py-2.5 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating account..." : "Get started"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2 w-full">
                <div className="flex-1 h-px bg-[#e9eaeb]" />
                <span className="text-sm text-[#717680]">OR</span>
                <div className="flex-1 h-px bg-[#e9eaeb]" />
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1 text-sm">
              <span className="text-[#535862]">Already have an account?</span>
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onSwitchToLogin?.();
                }}
                className="text-[#19429d] font-semibold hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
