"use client";

import {
  Users,
  Hotel,
  FileText,
  AlertCircle,
  ArrowUp,
  Upload,
  Check,
  Loader2,
  Search,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useBookings } from "@/lib/hooks/useBookings";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { activeBookings, fetchActiveBookings } = useBookings();
  const [totalGuests, setTotalGuests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch active bookings
        await fetchActiveBookings();

        // Fetch service requests for pending count
        try {
          const requestsResponse = await axiosInstance.get("/service-requests");
          const requests =
            requestsResponse.data.data?.requests ||
            requestsResponse.data.doc ||
            [];
          const pending = requests.filter(
            (req: any) => req.status === "pending" || req.status === "assigned"
          ).length;
          setPendingRequests(pending);
        } catch (err) {
          console.error("Error fetching service requests:", err);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate total unique guests from active bookings
  useEffect(() => {
    if (activeBookings.length > 0) {
      const uniqueGuests = new Set(
        activeBookings.map((booking) => booking.user?._id || booking.user)
      );
      setTotalGuests(uniqueGuests.size);
    }
  }, [activeBookings]);
  const statsCards = [
    {
      title: "Total Guests",
      value: loading ? "..." : totalGuests.toString(),
      change: "Currently active",
      icon: Users,
      iconBg: "bg-[#1570ef]",
      iconColor: "text-white",
    },
    {
      title: "Active Rooms",
      value: loading ? "..." : activeBookings.length.toString(),
      change: "Currently booked",
      icon: Hotel,
      iconBg: "bg-[#6938ef]",
      iconColor: "text-white",
    },
    {
      title: "Pending Requests",
      value: loading ? "..." : pendingRequests.toString(),
      change: "Requires attention",
      icon: FileText,
      iconBg: "bg-[#dc6803]",
      iconColor: "text-white",
    },
    {
      title: "Active Alerts",
      value: "7",
      change: "+12% from last month",
      icon: AlertCircle,
      iconBg: "bg-[#d92d20]",
      iconColor: "text-white",
    },
  ];

  const handleCheckIn = async (bookingId: string, room: any) => {
    try {
      setCheckingIn(bookingId);

      // Quick frontend validation using room data from booking
      if (room) {
        if (room.status === "occupied") {
          toast.error("Room is already occupied by another guest");
          setCheckingIn(null);
          return;
        }

        if (room.status === "maintenance" || room.status === "unserviceable") {
          toast.error(
            "Room is not available for check-in (maintenance/unserviceable)"
          );
          setCheckingIn(null);
          return;
        }
      }

      // Call check-in endpoint (backend will do final validation)
      const response = await axiosInstance.post(
        `/bookings/${bookingId}/checkin`
      );

      if (response.data.status === "success") {
        toast.success("Guest checked in successfully!");

        // Refresh bookings
        await fetchActiveBookings();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to check in guest";
      toast.error(errorMessage);
      console.error("Error checking in guest:", error);
    } finally {
      setCheckingIn(null);
    }
  };

  // Calculate time until check-in
  const getTimeUntilCheckIn = (startDate: string) => {
    const checkInDate = new Date(startDate);
    checkInDate.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const diffMs = checkInDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (diffMs < 0) {
      return { text: "Check-in date passed", days: 0, hours: 0, isPast: true };
    }

    if (diffDays > 0) {
      return {
        text: `${diffDays} day${diffDays > 1 ? "s" : ""}${
          diffHours > 0 ? `, ${diffHours} hour${diffHours > 1 ? "s" : ""}` : ""
        }`,
        days: diffDays,
        hours: diffHours,
        isPast: false,
      };
    } else if (diffHours > 0) {
      return {
        text: `${diffHours} hour${diffHours > 1 ? "s" : ""}`,
        days: 0,
        hours: diffHours,
        isPast: false,
      };
    } else {
      return {
        text: "Today",
        days: 0,
        hours: 0,
        isPast: false,
      };
    }
  };

  // Generate recent activities from active bookings
  const allActivities = activeBookings.map((booking) => {
    const userName =
      booking.user?.firstName && booking.user?.lastName
        ? `${booking.user.firstName} ${booking.user.lastName}`
        : booking.user?.email || "Guest";
    const roomName =
      booking.room?.number && booking.room?.alphabet
        ? `Room ${booking.room.alphabet}${booking.room.number
            .toString()
            .padStart(2, "0")}`
        : booking.room?.roomNumber || "Room";
    const status = booking.status === "checked-in" ? "Completed" : "Pending";
    const statusColor =
      status === "Completed"
        ? "bg-[#ecfdf3] text-[#027a48]"
        : "bg-[#fffaeb] text-[#b54708]";
    const borderColor =
      status === "Completed" ? "bg-[#039855]" : "bg-[#dc6803]";

    const createdAt = new Date(booking.createdAt);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - createdAt.getTime()) / 60000
    );
    const timeAgo =
      diffMinutes < 1
        ? "Just now"
        : diffMinutes < 60
        ? `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`
        : Math.floor(diffMinutes / 60) < 24
        ? `${Math.floor(diffMinutes / 60)} hour${
            Math.floor(diffMinutes / 60) > 1 ? "s" : ""
          } ago`
        : `${Math.floor(diffMinutes / 1440)} day${
            Math.floor(diffMinutes / 1440) > 1 ? "s" : ""
          } ago`;

    // Calculate time until check-in
    const timeUntilCheckIn = booking.startDate
      ? getTimeUntilCheckIn(booking.startDate)
      : null;

    return {
      id: booking._id,
      name: userName,
      action: `${
        status === "Completed" ? "Check-in" : "Booking"
      } • ${roomName}`,
      status,
      statusColor,
      time: timeAgo,
      borderColor,
      booking,
      room: booking.room,
      timeUntilCheckIn,
      startDate: booking.startDate,
    };
  });

  // Filter activities based on search query
  const recentActivities = allActivities
    .filter((activity) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        activity.name.toLowerCase().includes(query) ||
        activity.action.toLowerCase().includes(query) ||
        activity.booking?.confirmationCode?.toLowerCase().includes(query) ||
        activity.booking?.user?.email?.toLowerCase().includes(query) ||
        activity.booking?.user?.phone?.includes(query)
      );
    })
    .slice(0, 10);

  const staffMembers = Array(9).fill({
    name: "Alice Johnson",
    role: "Housekeeping",
    status: "Active",
    statusColor: "bg-[#ecfdf3] text-[#027a48]",
    tasks: "8 tasks",
  });

  return (
    <div className="p-6 bg-white min-h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h2
            className="text-xl font-semibold leading-[30px] text-[#181d27]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Hotel Operations
          </h2>
          <p
            className="text-base leading-6 text-[#535862]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Dashboard management
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors">
          <Upload className="w-6 h-6" />
          <span
            className="text-sm inline-block font-semibold leading-5"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Export Data
          </span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="bg-neutral-100 border border-[#e9eaeb] rounded-3xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-[18px] p-4 flex flex-col"
              >
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1">
                      <p
                        className="text-base leading-6 text-[#535862]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        {card.title}
                      </p>
                      <p
                        className="text-[30px] leading-[38px] font-semibold text-[#181d27]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        {card.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#ecfdf3] rounded-2xl px-2 py-0.5 w-fit">
                      <ArrowUp className="w-3 h-3 text-[#027a48]" />
                      <p
                        className="text-xs leading-[18px] text-[#027a48] font-medium"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        {card.change}
                      </p>
                    </div>
                  </div>
                  <div className={`${card.iconBg} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity and Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white border border-[#e9eaeb] rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#e9eaeb]">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-base font-medium leading-6 text-black"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Recent Activity
              </h3>
              {searchQuery && (
                <span
                  className="text-xs text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {recentActivities.length} result
                  {recentActivities.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-[#717680]" />
              </div>
              <input
                type="text"
                placeholder="Search by guest name, room, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-3 py-2 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-sm font-normal leading-5 text-[#181d27] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: "Geist, sans-serif" }}
              />
            </div>
          </div>
          <div className="px-4 pb-4 overflow-y-auto max-h-[700px]">
            <div className="flex flex-col gap-5">
              {loading ? (
                <div className="text-center py-8 text-[#535862]">
                  Loading activities...
                </div>
              ) : recentActivities.length === 0 ? (
                <div className="text-center py-8 text-[#535862]">
                  No recent activities
                </div>
              ) : (
                recentActivities.map((activity, index) => (
                  <div
                    key={activity.id || index}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className={`${activity.borderColor} w-1 h-[45px] rounded-lg`}
                        />
                        <div className="flex flex-col gap-0.5 min-w-[118px] flex-1">
                          <p
                            className="text-sm leading-5 text-[#181d27]"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            {activity.name}
                          </p>
                          <p
                            className="text-xs leading-[18px] text-[#717680]"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            {activity.action}
                          </p>
                          {activity.timeUntilCheckIn &&
                            activity.status === "Pending" && (
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3 text-[#dc6803]" />
                                <p
                                  className="text-xs leading-[18px] text-[#dc6803] font-medium"
                                  style={{ fontFamily: "Geist, sans-serif" }}
                                >
                                  {activity.timeUntilCheckIn.isPast
                                    ? activity.timeUntilCheckIn.text
                                    : `Check-in in ${activity.timeUntilCheckIn.text}`}
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-0.5 items-end">
                          <div
                            className={`${activity.statusColor} px-2 py-0.5 rounded-2xl text-center`}
                          >
                            <p
                              className="text-xs leading-[18px] font-medium"
                              style={{ fontFamily: "Pretendard, sans-serif" }}
                            >
                              {activity.status}
                            </p>
                          </div>
                          <p
                            className="text-xs leading-[18px] text-[#717680] text-center"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            {activity.time}
                          </p>
                        </div>
                        {activity.status === "Pending" && activity.room && (
                          <button
                            onClick={() =>
                              handleCheckIn(activity.id, activity.room)
                            }
                            disabled={checkingIn === activity.id}
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#039855] hover:bg-[#027a48] text-white rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {checkingIn === activity.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Check className="w-3.5 h-3.5" />
                            )}
                            <span
                              className="text-xs font-medium leading-[18px]"
                              style={{ fontFamily: "Geist, sans-serif" }}
                            >
                              {checkingIn === activity.id
                                ? "Checking..."
                                : "Check In"}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    {index < recentActivities.length - 1 && (
                      <div className="h-0.5 bg-[#e9eaeb] rounded-lg" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Staff Status */}
        <div className="bg-white border border-[#e9eaeb] rounded-2xl overflow-hidden">
          <div className="p-4">
            <h3
              className="text-base font-medium leading-6 text-black"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Staff Status
            </h3>
          </div>
          <div className="px-4 pb-4 overflow-y-auto max-h-[700px]">
            <div className="flex flex-col gap-5">
              {staffMembers.map((staff, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#e9f0fd] flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-[118px]">
                        <p
                          className="text-sm leading-5 text-[#181d27]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {staff.name}
                        </p>
                        <p
                          className="text-xs leading-[18px] text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {staff.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 items-end">
                      <div
                        className={`${staff.statusColor} px-2 py-0.5 rounded-2xl text-center`}
                      >
                        <p
                          className="text-xs leading-[18px] font-medium"
                          style={{ fontFamily: "Pretendard, sans-serif" }}
                        >
                          {staff.status}
                        </p>
                      </div>
                      <p
                        className="text-xs leading-[18px] text-[#717680] text-center"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {staff.tasks}
                      </p>
                    </div>
                  </div>
                  {index < staffMembers.length - 1 && (
                    <div className="h-0.5 bg-[#e9eaeb] rounded-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
