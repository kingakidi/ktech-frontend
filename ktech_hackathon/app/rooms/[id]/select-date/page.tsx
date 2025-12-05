"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRoomById } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SelectDatePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = parseInt(resolvedParams.id);
  const room = getRoomById(roomId);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");

  if (!room) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-32 px-4">
          <div className="max-w-[1440px] mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Room not found
            </h1>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Calculate nights and total price
  const nights = 5; // Mock value - would be calculated from dates
  const totalPrice = room.price * nights;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-32 pt-32 pb-16">
          {/* Back Button */}
          <Link
            href={`/rooms/${roomId}`}
            className="inline-flex items-center gap-4 text-black hover:text-gray-700 mb-8 sm:mb-12 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base font-normal">Back</span>
          </Link>

          {/* 3-Step Progress */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-14 mb-8 sm:mb-12 lg:mb-16">
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-black">
                Reserve Room
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-blue-600 rounded-[24px]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-black">
                Select Date
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-blue-600 rounded-[24px]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-[#717680]">
                Confirm
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-[#e9f0fd] rounded-[24px]" />
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-[36px] leading-tight lg:leading-[44px] tracking-[-0.72px] text-black mb-1">
              Choose Your Dates
            </h1>
            <p className="text-sm sm:text-base text-[#717680]">
              Select your check-in and check-out dates
            </p>
          </div>

          {/* Date Selection Form */}
          <div className="max-w-[788px]">
            <div className="flex flex-col gap-6 mb-6">
              {/* Check-In and Check-Out Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Check-In */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="check-in"
                    className="font-medium text-sm text-[#414651]"
                  >
                    Check-In
                  </label>
                  <input
                    type="date"
                    id="check-in"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <p className="text-sm text-[#535862]">
                    Sunday, February 11, 2024
                  </p>
                </div>

                {/* Check-Out */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="check-out"
                    className="font-medium text-sm text-[#414651]"
                  >
                    Check-Out
                  </label>
                  <input
                    type="date"
                    id="check-out"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <p className="text-sm text-[#535862]">
                    Monday, November 11, 2024
                  </p>
                </div>
              </div>

              {/* Stay Summary */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-base">
                  <p className="text-blue-600">Total length of stay</p>
                  <p className="font-medium text-black">{nights} nights</p>
                </div>
                <div className="flex items-center justify-between text-base">
                  <p className="text-blue-600">Total price</p>
                  <p className="font-medium text-black">
                    ${totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Guests Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="guests"
                  className="font-medium text-sm text-[#414651]"
                >
                  Guests
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Link href={`/rooms/${roomId}`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full bg-[#e9f0fd] border-[#e9f0fd] text-[#19429d] hover:bg-[#d0e1fc] hover:border-[#d0e1fc] font-semibold text-base px-5 py-3 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                >
                  Back
                </Button>
              </Link>
              <Link href={`/rooms/${roomId}/confirm`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-5 py-3 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                  Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
