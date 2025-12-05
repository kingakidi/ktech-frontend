"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Check,
  X,
  Clock,
  Filter,
  UserPlus,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  service: string;
  roomNumber: string;
  guestName: string;
  priority: string;
  details: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  timestamp: string;
  assignedTo?: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "break";
  tasks: string;
}

export default function AdminServicesPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null
  );

  // Mock staff data
  const staffMembers: StaffMember[] = [
    {
      id: "1",
      name: "Maria Garcia",
      email: "mariagarcia@gmail.com",
      role: "Housekeeping",
      status: "active",
      tasks: "4/7 Task",
    },
    {
      id: "2",
      name: "John Smith",
      email: "johnsmith@gmail.com",
      role: "Maintenance",
      status: "active",
      tasks: "1 Task",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarahjohnson@gmail.com",
      role: "Concierge",
      status: "active",
      tasks: "0 Task",
    },
    {
      id: "4",
      name: "David Lee",
      email: "davidlee@gmail.com",
      role: "Room Service",
      status: "active",
      tasks: "0 Task",
    },
    {
      id: "5",
      name: "Emily Chen",
      email: "emilychen@gmail.com",
      role: "Laundry",
      status: "active",
      tasks: "0 Task",
    },
    {
      id: "6",
      name: "Michael Brown",
      email: "michaelbrown@gmail.com",
      role: "SPA & Amenities",
      status: "active",
      tasks: "1 Task",
    },
    {
      id: "7",
      name: "Lisa Anderson",
      email: "lisaanderson@gmail.com",
      role: "Restaurant",
      status: "active",
      tasks: "1 Task",
    },
    {
      id: "8",
      name: "Robert Taylor",
      email: "roberttaylor@gmail.com",
      role: "Transportation",
      status: "active",
      tasks: "0 Task",
    },
    {
      id: "9",
      name: "Jennifer White",
      email: "jenniferwhite@gmail.com",
      role: "Gym & Fitness",
      status: "break",
      tasks: "0 Task",
    },
  ];

  const statuses = [
    "All Status",
    "Pending",
    "In Progress",
    "Completed",
    "Cancelled",
  ];

  useEffect(() => {
    // Mock service data with dynamic timestamps
    const getMockRequests = (): ServiceRequest[] => [
      {
        id: "1",
        service: "Room Service",
        roomNumber: "A01",
        guestName: "Daniel Kyle",
        priority: "Urgent",
        details:
          "Need breakfast delivered to room. Vegetarian options preferred with fresh orange juice.",
        status: "Pending",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
      },
      {
        id: "2",
        service: "Housekeeping",
        roomNumber: "B12",
        guestName: "Sarah Mitchell",
        priority: "Normal",
        details:
          "Please clean room and replace towels. Also need extra pillows.",
        status: "In Progress",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
        assignedTo: "Maria Garcia",
      },
      {
        id: "3",
        service: "Maintenance",
        roomNumber: "C05",
        guestName: "James Wilson",
        priority: "High",
        details: "Air conditioning not working properly. Room is too warm.",
        status: "Pending",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      },
      {
        id: "4",
        service: "SPA & Amenities",
        roomNumber: "A03",
        guestName: "Emma Thompson",
        priority: "Normal",
        details:
          "Would like to book a massage session for 3 PM today. Prefer Swedish massage.",
        status: "Completed",
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
      },
      {
        id: "5",
        service: "Laundry",
        roomNumber: "B08",
        guestName: "Michael Chen",
        priority: "Low",
        details:
          "Have some clothes for express laundry service. Need them back by tomorrow morning.",
        status: "In Progress",
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
        assignedTo: "Staff Member",
      },
      {
        id: "6",
        service: "Concierge",
        roomNumber: "A05",
        guestName: "Lisa Anderson",
        priority: "Normal",
        details:
          "Need restaurant recommendations for tonight. Prefer Italian cuisine within walking distance.",
        status: "Completed",
        timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
      },
      {
        id: "7",
        service: "Transportation",
        roomNumber: "C02",
        guestName: "Robert Taylor",
        priority: "High",
        details:
          "Need airport pickup tomorrow at 6 AM. Flight lands at 5:30 AM.",
        status: "Pending",
        timestamp: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
      },
      {
        id: "8",
        service: "Restaurant",
        roomNumber: "B05",
        guestName: "Amanda White",
        priority: "Urgent",
        details:
          "Reservation for 4 people at 7 PM tonight. Celebrating anniversary.",
        status: "In Progress",
        timestamp: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
      },
    ];

    // Initialize with mock data if localStorage is empty
    const initializeData = () => {
      const stored = localStorage.getItem("serviceRequests");
      if (!stored || JSON.parse(stored).length === 0) {
        const mockRequests = getMockRequests();
        localStorage.setItem("serviceRequests", JSON.stringify(mockRequests));
        setRequests(mockRequests);
      } else {
        setRequests(JSON.parse(stored));
      }
    };

    initializeData();

    // Load requests from localStorage
    const loadRequests = () => {
      const stored = localStorage.getItem("serviceRequests");
      if (stored) {
        setRequests(JSON.parse(stored));
      }
    };

    // Set up interval to refresh data
    const interval = setInterval(loadRequests, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Status" || request.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (
    requestId: string,
    newStatus: ServiceRequest["status"]
  ) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("serviceRequests", JSON.stringify(updatedRequests));
    setActiveDropdown(null);
  };

  const handleAssignStaff = (staffName: string) => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map((request) =>
      request.id === selectedRequest.id
        ? { ...request, assignedTo: staffName, status: "In Progress" as const }
        : request
    );
    setRequests(updatedRequests);
    localStorage.setItem("serviceRequests", JSON.stringify(updatedRequests));
    setIsAssignModalOpen(false);
    setSelectedRequest(null);
    setActiveDropdown(null);
  };

  const openAssignModal = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsAssignModalOpen(true);
    setActiveDropdown(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-[#fffaeb] text-[#b54708]";
      case "In Progress":
        return "bg-[#eff8ff] text-[#175cd3]";
      case "Completed":
        return "bg-[#ecfdf3] text-[#027a48]";
      case "Cancelled":
        return "bg-[#fef3f2] text-[#b42318]";
      default:
        return "bg-neutral-100 text-[#535862]";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-[#fef3f2] text-[#b42318]";
      case "High":
        return "bg-[#fffaeb] text-[#b54708]";
      case "Normal":
        return "bg-[#eff8ff] text-[#175cd3]";
      case "Low":
        return "bg-neutral-100 text-[#535862]";
      default:
        return "bg-neutral-100 text-[#535862]";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 bg-white min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h2
            className="text-lg sm:text-xl font-semibold leading-[30px] text-[#181d27]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Service Requests
          </h2>
          <p
            className="text-sm sm:text-base leading-6 text-[#535862]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Manage and track guest service requests
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f5fe] rounded-full">
          <Clock className="w-4 h-4 text-blue-600" />
          <span
            className="text-sm font-medium text-blue-600"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            {filteredRequests.filter((r) => r.status === "Pending").length}{" "}
            Pending
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717680]" />
          <input
            type="text"
            placeholder="Search by guest, room, or service"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            style={{ fontFamily: "Geist, sans-serif", fontSize: "16px" }}
          />
        </div>
        <div className="relative w-full sm:w-48">
          <button
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm hover:bg-gray-50 transition-colors w-full"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#717680]" />
              <span
                className="font-medium text-[#181d27] text-sm sm:text-base"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {selectedStatus}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[#717680] transition-transform ${
                statusDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {statusDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#d5d7da] rounded-lg shadow-lg z-50 py-1">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setStatusDropdownOpen(false);
                  }}
                  className={`w-full px-3.5 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    selectedStatus === status
                      ? "bg-[#e9f0fd] text-[#19429d] font-medium"
                      : "text-[#181d27]"
                  }`}
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Requests List - Desktop */}
      <div className="hidden lg:block bg-white border border-[#e9eaeb] rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-[#e9eaeb]">
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Guest & Room
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Service
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Priority
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Status
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Time
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p
                    className="text-sm text-[#717680]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    No service requests found
                  </p>
                </td>
              </tr>
            ) : (
              filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-[#e9eaeb]">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <p
                        className="text-sm font-medium text-[#181d27]"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {request.guestName}
                      </p>
                      <p
                        className="text-sm text-[#535862]"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        Room {request.roomNumber}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="text-sm text-[#535862]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {request.service}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getPriorityColor(
                        request.priority
                      )}`}
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="text-sm text-[#535862]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {formatTimestamp(request.timestamp)}
                    </p>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === request.id ? null : request.id
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-[#a4a7ae]" />
                    </button>
                    {activeDropdown === request.id && (
                      <div className="absolute right-0 top-12 bg-white border border-[#e9eaeb] rounded-lg shadow-lg p-2 z-10 w-48">
                        <button
                          onClick={() => openAssignModal(request)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#535862] hover:bg-gray-50 rounded transition-colors"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          <UserPlus className="w-4 h-4" />
                          Assign Staff
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(request.id, "In Progress")
                          }
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#535862] hover:bg-gray-50 rounded transition-colors"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          <Clock className="w-4 h-4" />
                          Mark In Progress
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(request.id, "Completed")
                          }
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#039855] hover:bg-gray-50 rounded transition-colors"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          <Check className="w-4 h-4" />
                          Mark Completed
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(request.id, "Cancelled")
                          }
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#d92d20] hover:bg-gray-50 rounded transition-colors"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          <X className="w-4 h-4" />
                          Cancel Request
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Requests Cards - Mobile */}
      <div className="lg:hidden flex flex-col gap-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white border border-[#e9eaeb] rounded-lg shadow-sm p-12 text-center">
            <p
              className="text-sm text-[#717680]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              No service requests found
            </p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white border border-[#e9eaeb] rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p
                    className="text-sm font-medium text-[#181d27] mb-0.5"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {request.guestName}
                  </p>
                  <p
                    className="text-xs text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Room {request.roomNumber} • {request.service}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === request.id ? null : request.id
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-[#a4a7ae]" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getPriorityColor(
                    request.priority
                  )}`}
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {request.priority}
                </span>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getStatusColor(
                    request.status
                  )}`}
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {request.status}
                </span>
              </div>

              <p
                className="text-xs text-[#717680] mb-3"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {request.details}
              </p>

              <p
                className="text-xs text-[#717680]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {formatTimestamp(request.timestamp)}
              </p>

              {activeDropdown === request.id && (
                <div className="mt-3 pt-3 border-t border-[#e9eaeb] flex flex-col gap-2">
                  <button
                    onClick={() => openAssignModal(request)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <UserPlus className="w-4 h-4" />
                    Assign Staff
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(request.id, "In Progress")
                    }
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-[#535862] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <Clock className="w-4 h-4" />
                    Mark In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(request.id, "Completed")}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-[#039855] hover:bg-[#027a48] rounded-lg transition-colors"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <Check className="w-4 h-4" />
                    Mark Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(request.id, "Cancelled")}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-[#d92d20] hover:bg-[#b42318] rounded-lg transition-colors"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <X className="w-4 h-4" />
                    Cancel Request
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Assign Staff Modal */}
      {isAssignModalOpen && selectedRequest && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setIsAssignModalOpen(false);
              setSelectedRequest(null);
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e9eaeb]">
                <div>
                  <h3
                    className="text-lg font-semibold text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Assign Staff to Request
                  </h3>
                  <p
                    className="text-sm text-[#535862] mt-1"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {selectedRequest.service} - Room{" "}
                    {selectedRequest.roomNumber}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsAssignModalOpen(false);
                    setSelectedRequest(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#717680]" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Request Details */}
                <div className="bg-[#f0f5fe] border border-[#d3e0fb] rounded-lg p-4 mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p
                        className="text-sm font-medium text-[#181d27]"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {selectedRequest.guestName}
                      </p>
                      <p
                        className="text-xs text-[#535862]"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        Room {selectedRequest.roomNumber}
                      </p>
                    </div>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getPriorityColor(
                        selectedRequest.priority
                      )}`}
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {selectedRequest.priority}
                    </span>
                  </div>
                  <p
                    className="text-sm text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {selectedRequest.details}
                  </p>
                </div>

                {/* Available Staff */}
                <div>
                  <h4
                    className="text-sm font-medium text-[#181d27] mb-3"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Available Staff ({selectedRequest.service})
                  </h4>
                  <div className="space-y-2">
                    {staffMembers
                      .filter(
                        (staff) =>
                          staff.role === selectedRequest.service &&
                          staff.status === "active"
                      )
                      .map((staff) => (
                        <button
                          key={staff.id}
                          onClick={() => handleAssignStaff(staff.name)}
                          className="w-full flex items-center justify-between p-4 bg-white border border-[#e9eaeb] rounded-lg hover:border-blue-600 hover:bg-[#f0f5fe] transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span
                                className="text-sm font-semibold text-blue-600"
                                style={{ fontFamily: "Geist, sans-serif" }}
                              >
                                {staff.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="text-left">
                              <p
                                className="text-sm font-medium text-[#181d27]"
                                style={{ fontFamily: "Geist, sans-serif" }}
                              >
                                {staff.name}
                              </p>
                              <p
                                className="text-xs text-[#535862]"
                                style={{ fontFamily: "Geist, sans-serif" }}
                              >
                                {staff.email} • {staff.tasks}
                              </p>
                            </div>
                          </div>
                          <UserPlus className="w-5 h-5 text-[#717680] group-hover:text-blue-600" />
                        </button>
                      ))}
                    {staffMembers.filter(
                      (staff) =>
                        staff.role === selectedRequest.service &&
                        staff.status === "active"
                    ).length === 0 && (
                      <div className="text-center py-8">
                        <p
                          className="text-sm text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          No available staff for {selectedRequest.service}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
