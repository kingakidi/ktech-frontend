"use client";

import { ChevronRight } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Room Service",
    availability: "Available 24/7",
    icon: "🍽️",
    color: "bg-[#dc6803]",
  },
  {
    id: 2,
    name: "Laundry",
    availability: "Available 24/7",
    icon: "👔",
    color: "bg-[#039855]",
  },
  {
    id: 3,
    name: "SPA & Amenities",
    availability: "Available 24/7",
    icon: "💆",
    color: "bg-[#1570ef]",
  },
  {
    id: 4,
    name: "Housekeeping",
    availability: "Available 24/7",
    icon: "🧹",
    color: "bg-[#7e22ce]",
  },
  {
    id: 5,
    name: "Concierge",
    availability: "Available 24/7",
    icon: "🛎️",
    color: "bg-[#ea580c]",
  },
  {
    id: 6,
    name: "Maintenance",
    availability: "Available 24/7",
    icon: "🔧",
    color: "bg-[#0891b2]",
  },
  {
    id: 7,
    name: "Gym & Fitness",
    availability: "6:00 AM - 10:00 PM",
    icon: "💪",
    color: "bg-[#dc2626]",
  },
  {
    id: 8,
    name: "Restaurant",
    availability: "7:00 AM - 11:00 PM",
    icon: "🍳",
    color: "bg-[#ca8a04]",
  },
  {
    id: 9,
    name: "Transportation",
    availability: "Available 24/7",
    icon: "🚗",
    color: "bg-[#16a34a]",
  },
];

export default function ServicesPage() {
  return (
    <div className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 max-w-full">
      {/* Page Header */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <h2 className="font-['Geist'] font-semibold text-lg sm:text-xl lg:text-2xl text-[#181d27] leading-tight sm:leading-7 lg:leading-8">
          Request a Service
        </h2>
        <p className="font-['Geist'] font-normal text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
          Choose from available hotel services
        </p>
      </div>

      {/* Services Grid */}
      <div className="bg-neutral-100 border border-gray-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              className="bg-white rounded-xl sm:rounded-[18px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 hover:shadow-md transition-shadow text-left"
            >
              <div
                className={`${service.color} p-2 sm:p-3 rounded-lg w-fit flex items-center justify-center`}
              >
                <span className="text-xl sm:text-2xl">{service.icon}</span>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <p className="text-xs sm:text-sm lg:text-base text-[#535862]">
                    {service.availability}
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#181d27] leading-tight sm:leading-[30px] lg:leading-[38px]">
                    {service.name}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#717680] shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
