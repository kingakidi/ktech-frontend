"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Wifi, Coffee, Tv, Wind, Bath, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRoomById } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignUpDialog from "@/components/SignUpDialog";
import LoginDialog from "@/components/LoginDialog";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ConfirmPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = parseInt(resolvedParams.id);
  const room = getRoomById(roomId);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  // Mock booking data
  const nights = 5;
  const totalPrice = room.price * nights;
  const taxesAndFees = 1200;
  const grandTotal = totalPrice + taxesAndFees;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-32 pt-32 pb-16">
          {/* Back Button */}
          <Link
            href={`/rooms/${roomId}/select-date`}
            className="inline-flex items-center gap-4 text-black hover:text-gray-700 mb-8 sm:mb-12 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base font-normal">Back</span>
          </Link>

          {/* 3-Step Progress - All Complete */}
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
              <p className="font-medium text-xs sm:text-sm lg:text-base text-black">
                Confirm
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-blue-600 rounded-[24px]" />
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-[36px] leading-tight lg:leading-[44px] tracking-[-0.72px] text-black mb-1">
              Review Booking
            </h1>
            <p className="text-sm sm:text-base text-[#717680]">
              Confirm booking to secure room
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[687px_1fr] gap-8 lg:gap-5">
            {/* Left Column - Summary */}
            <div className="flex flex-col gap-6">
              {/* Room Summary Card */}
              <div className="flex gap-5">
                <div className="relative w-[182px] h-[123px] rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="182px"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col text-base leading-6">
                    <p className="font-semibold text-black">{room.name}</p>
                    <p className="text-[#717680]">Feb 11, 2024 → Nov 11</p>
                  </div>
                  <p className="text-xs text-[#717680]">2 Guests</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-base">
                  <p className="text-[#717680]">
                    ${room.price} × {nights} nights
                  </p>
                  <p className="font-medium text-[#414651]">
                    ${totalPrice.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between text-base">
                  <p className="text-[#717680]">Taxes & fees</p>
                  <p className="font-medium text-[#414651]">
                    ${taxesAndFees.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between text-base">
                  <p className="text-[#717680]">Total</p>
                  <p className="font-semibold text-[#181d27]">
                    ${grandTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Link href={`/rooms/${roomId}/select-date`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full bg-[#e9f0fd] border-[#e9f0fd] text-[#19429d] hover:bg-[#d0e1fc] hover:border-[#d0e1fc] font-semibold text-base px-5 py-3 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                  >
                    Back
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowSignUp(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-5 py-3 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                >
                  Confirm
                </Button>
              </div>
            </div>

            {/* Right Column - Room Details Card */}
            <div className="flex flex-col gap-6">
              {/* Room Image */}
              <div className="relative w-full h-[275px] rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 485px"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Room Details */}
              <div className="flex flex-col gap-4">
                {/* Basic Info */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-[#181d27]">{room.name}</p>
                  <p className="text-base text-[#717680]">
                    ${room.price} per night
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#717680]">
                      {room.sqft} sq ft
                    </span>
                    <div className="w-1 h-1 rounded-full bg-[#a4a7ae]" />
                    <span className="text-xs text-[#717680]">
                      Up to {room.guests} guests
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-lg text-[#181d27]">
                    Description
                  </p>
                  <p className="text-base text-[#717680]">
                    {room.fullDescription}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xl text-[#181d27]">
                    Highlights
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Premium WiFi
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Espresso machine
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tv className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        65&quot; Smart TV
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Smart climate
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Soaking tub
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wine className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Premium bar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[#717680]">Check-in</p>
                    <p className="font-medium text-[#414651]">Feb 11</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[#717680]">Check-out</p>
                    <p className="font-medium text-[#414651]">Nov 11</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[#717680]">Taxes & fees</p>
                    <p className="font-medium text-[#414651]">
                      ${taxesAndFees.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-px bg-[#d5d7da] my-1" />
                  <div className="flex items-center justify-between text-base">
                    <p className="text-[#717680]">Total</p>
                    <p className="font-semibold text-[#181d27]">
                      ${grandTotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>

      {/* Sign Up Dialog */}
      <SignUpDialog
        open={showSignUp}
        onOpenChange={setShowSignUp}
        onSwitchToLogin={() => {
          setShowSignUp(false);
          setTimeout(() => setShowLogin(true), 300);
        }}
      />

      {/* Login Dialog */}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToSignUp={() => {
          setShowLogin(false);
          setTimeout(() => setShowSignUp(true), 300);
        }}
      />
    </>
  );
}
