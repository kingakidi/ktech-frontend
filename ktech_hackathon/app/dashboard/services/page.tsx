"use client";

import {
  ChevronRight,
  UtensilsCrossed,
  Shirt,
  Sparkles,
  Brush,
  Hotel,
  Wrench,
  Dumbbell,
  ChefHat,
  Car,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useServices } from "@/lib/hooks/useServices";
import { useBookings } from "@/lib/hooks/useBookings";
import { toast } from "react-toastify";

// Icon mapping for service categories
const categoryIcons: { [key: string]: any } = {
  "room-service": UtensilsCrossed,
  "housekeeping": Brush,
  "maintenance": Wrench,
  "concierge": Hotel,
  "other": Sparkles,
};

const categoryColors: { [key: string]: string } = {
  "room-service": "bg-[#dc6803]",
  "housekeeping": "bg-[#7e22ce]",
  "maintenance": "bg-[#0891b2]",
  "concierge": "bg-[#ea580c]",
  "other": "bg-[#1570ef]",
};

export default function ServicesPage() {
  const router = useRouter();
  const { services, loading, fetchServices } = useServices();
  const { activeBookings } = useBookings();
  const [activeServices, setActiveServices] = useState<any[]>([]);
  const [hasCheckedInBooking, setHasCheckedInBooking] = useState(false);
  const [checkingBooking, setCheckingBooking] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    // Filter only active services
    const active = services.filter((service) => service.active);
    setActiveServices(active);
  }, [services]);

  useEffect(() => {
    // Check if user has a checked-in booking
    const checkedInBooking = activeBookings.find(
      (booking) => booking.status === "checked-in" || booking.checkedIn === true
    );
    setHasCheckedInBooking(!!checkedInBooking);
    setCheckingBooking(false);
  }, [activeBookings]);

  const handleServiceClick = (serviceId: string, serviceName: string) => {
    router.push(
      `/dashboard/services/request?service=${serviceId}&name=${encodeURIComponent(
        serviceName
      )}`
    );
  };

  const getServiceIcon = (category: string) => {
    return categoryIcons[category] || Sparkles;
  };

  const getServiceColor = (category: string) => {
    return categoryColors[category] || "bg-[#1570ef]";
  };

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

      {/* Check if user is checked in */}
      {checkingBooking ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : !hasCheckedInBooking ? (
        <div className="bg-white border border-[#e9eaeb] rounded-2xl p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#fffaeb] rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-[#dc6803]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#181d27] mb-2">
                Check-in Required
              </h3>
              <p className="text-[#535862] mb-4">
                Please check in to your booking first before accessing services.
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : activeServices.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-[#535862]">No services available at the moment.</p>
        </div>
      ) : (
        <div className="bg-neutral-100 border border-gray-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {activeServices.map((service) => {
              const IconComponent = getServiceIcon(service.category);
              const serviceColor = getServiceColor(service.category);
              return (
                <button
                  key={service._id}
                  onClick={() => handleServiceClick(service._id, service.name)}
                  className="bg-white rounded-xl sm:rounded-[18px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 hover:shadow-md transition-shadow text-left"
                >
                  <div
                    className={`${serviceColor} p-2 sm:p-3 rounded-lg w-fit flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <div className="flex items-end justify-between gap-2">
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      <p className="text-xs sm:text-sm lg:text-base text-[#535862]">
                        {service.estimatedDuration
                          ? `Est. ${service.estimatedDuration} min`
                          : "Available"}
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#181d27] leading-tight sm:leading-[30px] lg:leading-[38px]">
                        {service.name}
                      </p>
                      {service.description && (
                        <p className="text-xs text-[#717680] line-clamp-2 mt-1">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#717680] shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
