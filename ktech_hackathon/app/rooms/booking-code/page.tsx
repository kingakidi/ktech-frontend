"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Users, Info, Download, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookingCodePage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-0 mt-24 md:mt-32">
        {/* Main Container */}
        <div className="max-w-[1192px] mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
          {/* Card Container with Floating Success Icon */}
          <div className="relative">
            {/* Success Icon - Overlaying top border */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-20 z-20 ">
              <div className="bg-[#d3e0fb] p-7 rounded-full">
                <div className="bg-blue-600 p-8 rounded-full">
                  <Check className="w-14 h-14 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="relative bg-white border border-blue-600 rounded-3xl overflow-hidden pt-16">
              {/* Decorative Elements - Left (vector-left.svg) - Hidden on mobile, adjusted on tablet */}
              <div className="absolute left-4 top-9 w-[120px] h-[130px] md:left-11 md:w-[181.529px] md:h-[198.119px] pointer-events-none hidden sm:block">
                <div
                  className="relative w-full h-full"
                  //   style={{ transform: "rotate(144.094deg) scaleY(1)" }}
                >
                  <Image
                    src="/vector-left.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Decorative Elements - Right (vector-right.svg) - Hidden on mobile, adjusted on tablet */}
              <div className="absolute right-4 top-9 w-[120px] h-[130px] md:right-11 md:w-[181.529px] md:h-[198.119px] pointer-events-none hidden sm:block">
                <div className="relative w-full h-full">
                  <Image
                    src="/vector-right.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 px-6 sm:px-12 md:px-16 lg:px-24 py-12 sm:py-16 md:py-20">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-2">
                    Payment Successful, Welcome to Luxe Haven!
                  </h1>
                  <p className="text-[#717680] text-base mb-4">
                    Your room is ready and waiting for you
                  </p>

                  {/* Booking Info */}
                  <div className="flex items-center justify-center gap-4 text-sm text-[#717680]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Sep 22 - Sep 25</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a4a7ae]" />
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>3 Guest</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-1 bg-neutral-100 rounded-full mb-8" />

                {/* Room and Access Cards */}
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  {/* Assigned Room */}
                  <div className="space-y-2">
                    <h2 className="text-base font-semibold text-[#0c214e]">
                      Assigned Room
                    </h2>
                    <div className="bg-[#e9f0fd] rounded-3xl h-[192px] flex items-center justify-center relative overflow-hidden">
                      <div className="text-center">
                        <p className="text-[#717680] text-base">YOUR ROOM</p>
                        <p className="text-blue-600 text-5xl font-semibold tracking-tight leading-none my-2">
                          C01
                        </p>
                        <p className="text-[#717680] text-base mb-3">
                          Penthouse
                        </p>
                        <span className="inline-block bg-[#e9f0fd] border border-[#19429d]/20 text-[#19429d] text-sm font-medium px-3 py-1 rounded-full">
                          Second Floor
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Digital Access */}
                  <div className="space-y-2">
                    <h2 className="text-base font-semibold text-[#0c214e]">
                      Digital Access
                    </h2>
                    <div className="bg-blue-600 rounded-3xl h-[192px] flex items-center justify-center relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800" />
                      </div>

                      <div className="text-center relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <p className="text-white text-base">Access PIN</p>
                          <span className="inline-block bg-[#ecfdf3] text-[#027a48] text-xs font-medium px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-white text-5xl font-semibold tracking-tight leading-none my-2">
                          8 1 4 2
                        </p>
                        <p className="text-[#e9f0fd] text-base">
                          Enter this code on the door keypad
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="border border-blue-600 rounded-3xl p-4 sm:p-6 mb-8">
                  <div className="flex flex-col items-center gap-4">
                    {/* Info Icon */}
                    <div className="bg-[#d3e0fb] p-2 rounded-full">
                      <div className="bg-blue-600 p-2 rounded-full">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <h3 className="text-sm sm:text-base font-medium text-black text-center">
                        Important Information
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 text-center">
                        <div>
                          <p className="text-[#535862] font-medium text-sm sm:text-base mb-1 sm:mb-2">
                            Check-in time
                          </p>
                          <p className="text-[#717680] text-sm sm:text-base">
                            3:00 PM
                          </p>
                        </div>
                        <div>
                          <p className="text-[#535862] font-medium text-sm sm:text-base mb-1 sm:mb-2">
                            Check-out time
                          </p>
                          <p className="text-[#717680] text-sm sm:text-base">
                            11:00 AM
                          </p>
                        </div>
                        <div>
                          <p className="text-[#535862] font-medium text-sm sm:text-base mb-1 sm:mb-2">
                            WiFi Network
                          </p>
                          <p className="text-[#717680] text-sm sm:text-base">
                            Luxe_Haven_Premium
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Button
                    variant="outline"
                    className="w-full bg-[#e9f0fd] border-[#e9f0fd] text-[#19429d] hover:bg-[#d3e0fb] font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Details
                  </Button>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
