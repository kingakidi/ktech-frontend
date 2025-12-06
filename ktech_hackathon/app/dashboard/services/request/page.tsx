"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Loader2,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { useBookings } from "@/lib/hooks/useBookings";
import { storage } from "@/lib/storage";

function ServiceRequestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const { myBookings, fetchMyBookings } = useBookings();

  const serviceId = searchParams.get("service");
  const serviceName = searchParams.get("name");

  const [formData, setFormData] = useState({
    priority: "medium",
    description: "",
  });

  // Get user's active booking - must be checked in
  useEffect(() => {
    const fetchActiveBooking = async () => {
      try {
        setLoading(true);
        // Get user's own bookings
        const bookings = await fetchMyBookings();
        
        // Find the user's checked-in booking from their own bookings
        const checkedInBooking = bookings.find(
          (b: any) => b.status === "checked-in" || b.checkedIn === true
        );
        
        if (checkedInBooking) {
          setActiveBooking(checkedInBooking);
        } else {
          toast.error("Please check in to your booking first before requesting services.");
          router.push("/dashboard");
        }
      } catch (error: any) {
        console.error("Error fetching active booking:", error);
        toast.error("Failed to load booking information");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeBooking) {
      toast.error("No active booking found");
      return;
    }

    if (!serviceId) {
      toast.error("Service not selected");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please provide request details");
      return;
    }

    setIsSubmitting(true);

    try {
      // Map priority to backend format
      const priorityMap: { [key: string]: string } = {
        Low: "low",
        Normal: "medium",
        High: "high",
        Urgent: "urgent",
      };

      const requestData = {
        booking: activeBooking._id,
        service: serviceId,
        type: serviceName || "service",
        description: formData.description,
        priority: priorityMap[formData.priority] || formData.priority,
      };

      const response = await axiosInstance.post("/service-requests", requestData);

      if (response.data.status === "success") {
        setShowSuccess(true);
        toast.success("Service request submitted successfully!");

        setTimeout(() => {
          router.push("/dashboard/requests");
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit service request";
      toast.error(errorMessage);
      console.error("Error submitting service request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 max-w-full">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-4 text-[#535862] hover:text-[#181d27] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span
          className="text-sm sm:text-base"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Back to Services
        </span>
      </button>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 sm:p-3 rounded-lg flex items-center justify-center">
            <Send className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h2
              className="font-semibold text-lg sm:text-xl lg:text-2xl text-[#181d27] leading-tight"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Request {serviceName || "Service"}
            </h2>
            <p
              className="text-sm sm:text-base text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Fill in the details below
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-[#ecfdf3] border border-[#039855] rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#039855] rounded-full flex items-center justify-center shrink-0">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <p
              className="font-medium text-[#027a48] text-sm sm:text-base"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Request Submitted Successfully!
            </p>
            <p
              className="text-xs sm:text-sm text-[#039855]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Our team will respond shortly.
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : !activeBooking ? (
        <div className="bg-white border border-[#e9eaeb] rounded-2xl p-8 text-center">
          <p className="text-[#535862] mb-4">No active booking found.</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#e9eaeb] rounded-2xl p-4 sm:p-6">
          {/* Guest Info Display */}
          <div className="bg-[#f0f5fe] border border-[#d3e0fb] rounded-lg p-4 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Guest:
                </span>
                <span
                  className="text-sm font-medium text-[#181d27]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {activeBooking.user?.firstName && activeBooking.user?.lastName
                    ? `${activeBooking.user.firstName} ${activeBooking.user.lastName}`
                    : activeBooking.user?.email || "Guest"}
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#d3e0fb]" />
              <div className="flex items-center gap-2">
                <span
                  className="text-sm text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Room:
                </span>
                <span
                  className="text-sm font-medium text-[#181d27]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {activeBooking.room?.alphabet && activeBooking.room?.number
                    ? `${activeBooking.room.alphabet}${activeBooking.room.number.toString().padStart(2, "0")}`
                    : activeBooking.room?.roomNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Priority */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-[#414651]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                style={{ fontFamily: "Geist, sans-serif", fontSize: "16px" }}
              >
                <option value="low">Low</option>
                <option value="medium">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-[#414651]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Request Details *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Please provide details about your request..."
                rows={5}
                className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                style={{ fontFamily: "Geist, sans-serif", fontSize: "16px" }}
              />
            </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-5 py-3 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full shadow-sm hover:bg-[#d3e0fb] transition-colors"
            >
              <span
                className="text-base font-semibold text-[#19429d]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Cancel
              </span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-5 py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Submitting...
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Submit Request
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      )}
    </div>
  );
}

export default function ServiceRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceRequestContent />
    </Suspense>
  );
}
