"use client";

import { Search, Calendar, Users } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <section className="relative w-full max-w-[100vw] h-screen min-h-[600px] sm:min-h-[700px] lg:h-[789px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-2 sm:px-4">
        <div className="w-full max-w-[718px] flex flex-col items-center gap-4 sm:gap-6 mt-12 md:mt-0">
          {/* Hero Text */}
          <div className="text-center text-white space-y-2 sm:space-y-3 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Find your <span className="inline-block">perfect</span> stay
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-90 max-w-md mx-auto">
              Discover luxury accommodations with AI-powered personalization
            </p>
          </div>

          {/* Simple Search Bar - Mobile First */}
          <div className="w-full backdrop-blur-sm bg-white/20 rounded-full p-2 sm:p-3 lg:hidden">
            <div className="bg-white rounded-full flex items-center px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search room"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 ml-2 sm:ml-3 text-sm sm:text-base text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 whitespace-nowrap">
                Search
              </button>
            </div>
          </div>

          {/* Advanced Search Bar - Desktop */}
          <div className="hidden lg:block w-full backdrop-blur-sm bg-white/20 rounded-full p-4">
            <div className="bg-white rounded-full flex items-center justify-between p-3 shadow-xl">
              <div className="flex items-center gap-6 flex-1">
                {/* Search Room */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-xs font-medium text-gray-900">
                    Search room
                  </label>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search room..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent w-full"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Check In */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-xs font-medium text-gray-900">
                    Check in
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Add date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent w-full"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Check Out */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-xs font-medium text-gray-900">
                    Check out
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Add date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent w-full"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Guests */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-xs font-medium text-gray-900">
                    Guests
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Add guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg flex-shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Decorative Gradient Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}
