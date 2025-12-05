"use client";

import { useState } from "react";
import {
  Zap,
  UserPlus,
  Search,
  ChevronDown,
  MoreVertical,
  Settings,
  Edit3,
  Phone,
  Trash2,
  X,
  Stars,
  Mail,
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "break";
  tasks: string;
  assignedRooms: string[];
  shift: string;
}

export default function StaffPage() {
  const [staffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Maria Garcia",
      email: "Mariagarcia@gmail.com",
      role: "Housekeeping",
      status: "active",
      tasks: "4/7 Task",
      assignedRooms: ["A01", "A03", "A05", "+4"],
      shift: "Morning",
    },
    {
      id: "2",
      name: "Maria Garcia",
      email: "Mariagarcia@gmail.com",
      role: "Maintenance",
      status: "active",
      tasks: "1 Task",
      assignedRooms: ["A01", "A03", "A05", "+4"],
      shift: "Afternoon",
    },
    {
      id: "3",
      name: "Maria Garcia",
      email: "Mariagarcia@gmail.com",
      role: "Concierge",
      status: "break",
      tasks: "0 Task",
      assignedRooms: ["A01", "A03", "A05", "+4"],
      shift: "Evening",
    },
    {
      id: "4",
      name: "Maria Garcia",
      email: "Mariagarcia@gmail.com",
      role: "Room Service",
      status: "active",
      tasks: "0 Task",
      assignedRooms: ["A01", "A03", "A05", "+4"],
      shift: "Night",
    },
    {
      id: "5",
      name: "Maria Garcia",
      email: "Mariagarcia@gmail.com",
      role: "Housekeeping",
      status: "active",
      tasks: "0 Task",
      assignedRooms: ["A01", "A03", "A05", "+4"],
      shift: "Morning",
    },
    {
      id: "6",
      name: "Maria Garcia",
      email: "Mariagarcia@gmail.com",
      role: "Housekeeping",
      status: "active",
      tasks: "1 Task",
      assignedRooms: ["A01", "A03", "A05", "+4"],
      shift: "Morning",
    },
    {
      id: "7",
      name: "Maria Garcia",
      email: "Mariagarcia@gmail.com",
      role: "Housekeeping",
      status: "active",
      tasks: "1 Task",
      assignedRooms: ["A01", "A03", "A05", "+4"],
      shift: "Morning",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isThinkingModalOpen, setIsThinkingModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isManualAssignModalOpen, setIsManualAssignModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    role: "Room Service",
    shift: "Morning",
  });

  const roles = [
    "All Roles",
    "Room Service",
    "Laundry",
    "SPA & Amenities",
    "Housekeeping",
    "Concierge",
    "Maintenance",
    "Gym & Fitness",
    "Restaurant",
    "Transportation",
  ];
  const itemsPerPage = 5;

  // Filter staff members based on search query and selected role
  const filteredStaffMembers = staffMembers.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "All Roles" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredStaffMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStaffMembers = filteredStaffMembers.slice(
    startIndex,
    endIndex
  );

  // Reset to page 1 when filters change
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
    setRoleDropdownOpen(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const availableRooms = [
    "A01",
    "A02",
    "A03",
    "A04",
    "A05",
    "B05",
    "B09",
    "B10",
    "B11",
    "B12",
    "B13",
    "B14",
    "C01",
    "C02",
    "C03",
    "C04",
    "C05",
    "C06",
    "C07",
    "C08",
    "C09",
    "C10",
    "C11",
    "C12",
  ];

  const handleAutoAssign = () => {
    setIsThinkingModalOpen(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Show complete modal after 2 seconds
    setTimeout(() => {
      setIsThinkingModalOpen(false);
      setIsCompleteModalOpen(true);
      clearInterval(progressInterval);
    }, 2000);
  };

  const handleManualAssign = (member: StaffMember) => {
    setSelectedStaff(member);
    setSelectedRooms([]);
    setIsManualAssignModalOpen(true);
    setActiveDropdown(null);
  };

  const handleRemoveStaff = (member: StaffMember) => {
    setSelectedStaff(member);
    setIsRemoveModalOpen(true);
    setActiveDropdown(null);
  };

  const handleEditStaff = (member: StaffMember) => {
    setSelectedStaff(member);
    setFormData({
      fullName: member.name,
      phoneNumber: "",
      email: member.email,
      role: member.role,
      shift: member.shift,
    });
    setIsEditModalOpen(true);
    setActiveDropdown(null);
  };

  const handleContactStaff = (member: StaffMember) => {
    setSelectedStaff(member);
    setIsContactModalOpen(true);
    setActiveDropdown(null);
  };

  const toggleRoomSelection = (room: string) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const getStatusColor = (status: string) => {
    if (status === "active") return "bg-[#ecfdf3] text-[#027a48]";
    return "bg-neutral-100 text-[#414651]";
  };

  const getRoomBadgeColors = (index: number) => {
    const colors = [
      "bg-[#e9f0fd] text-[#19429d]", // Primary
      "bg-[#eff8ff] text-[#175cd3]", // Blue
      "bg-[#eef4ff] text-[#3538cd]", // Indigo
      "bg-neutral-100 text-[#414651]", // Gray
    ];
    return colors[index % colors.length];
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
            Staff Management
          </h2>
          <p
            className="text-sm sm:text-base leading-6 text-[#535862]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Assign and manage staff tasks
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleAutoAssign}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full shadow-sm hover:bg-[#d3e0fb] transition-colors"
          >
            <Zap className="w-5 h-5 text-[#19429d]" />
            <span
              className="text-sm font-semibold leading-5 text-[#19429d]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Auto Assign All
            </span>
          </button>
          <button
            onClick={() => setIsAddStaffModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span
              className="text-sm font-semibold leading-5"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Add Staff
            </span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717680]" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-11 pr-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            style={{ fontFamily: "Geist, sans-serif", fontSize: "16px" }}
          />
        </div>
        <div className="relative w-full sm:w-40">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm hover:bg-gray-50 transition-colors w-full"
          >
            <span
              className="font-medium text-[#181d27] text-sm sm:text-base"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              {selectedRole}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#717680] transition-transform ${
                roleDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {roleDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#d5d7da] rounded-lg shadow-lg z-50 py-1">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`w-full px-3.5 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    selectedRole === role
                      ? "bg-[#e9f0fd] text-[#19429d] font-medium"
                      : "text-[#181d27]"
                  }`}
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden lg:block bg-white border border-[#e9eaeb] rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-[#e9eaeb]">
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Staff Member
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Role
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
                Tasks
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Assigned Room
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Shift
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
            {paginatedStaffMembers.map((member) => (
              <tr key={member.id} className="border-b border-[#e9eaeb]">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <p
                      className="text-sm font-medium text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {member.name}
                    </p>
                    <p
                      className="text-sm text-[#535862]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {member.email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p
                    className="text-sm text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {member.role}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getStatusColor(
                      member.status
                    )}`}
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {member.status === "active" ? "Active" : "Break"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p
                    className="text-sm text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {member.tasks}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {member.assignedRooms.map((room, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getRoomBadgeColors(
                          idx
                        )}`}
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p
                    className="text-sm text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {member.shift}
                  </p>
                </td>
                <td className="px-6 py-4 relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === member.id ? null : member.id
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-[#a4a7ae]" />
                  </button>
                  {activeDropdown === member.id && (
                    <div className="absolute right-0 top-12 bg-white border border-[#e9eaeb] rounded-lg shadow-lg p-4 z-10 w-48">
                      <div className="flex flex-col gap-4">
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            handleAutoAssign();
                          }}
                          className="flex items-center gap-2 px-3.5 py-2 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full hover:bg-[#d3e0fb] transition-colors w-full"
                        >
                          <Zap className="w-5 h-5 text-[#19429d]" />
                          <span
                            className="text-sm font-semibold text-[#19429d]"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            Auto Assign
                          </span>
                        </button>
                        <button
                          onClick={() => handleManualAssign(member)}
                          className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#181d27] transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span style={{ fontFamily: "Geist, sans-serif" }}>
                            Manual Assign
                          </span>
                        </button>
                        <button
                          onClick={() => handleEditStaff(member)}
                          className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#181d27] transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span style={{ fontFamily: "Geist, sans-serif" }}>
                            Edit Details
                          </span>
                        </button>
                        <button
                          onClick={() => handleContactStaff(member)}
                          className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#181d27] transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span style={{ fontFamily: "Geist, sans-serif" }}>
                            Contact
                          </span>
                        </button>
                        <button
                          onClick={() => handleRemoveStaff(member)}
                          className="flex items-center gap-2 text-sm text-[#d92d20] hover:text-[#b42318] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span style={{ fontFamily: "Geist, sans-serif" }}>
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#e9eaeb]">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3.5 py-2 bg-white border border-[#d5d7da] rounded-full shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className="text-sm font-semibold text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Previous
            </span>
          </button>
          <p
            className="text-sm font-medium text-[#414651]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 bg-white border border-[#d5d7da] rounded-full shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className="text-sm font-semibold text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Next
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden flex flex-col gap-4">
        {paginatedStaffMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-[#e9eaeb] rounded-lg shadow-sm p-4 relative"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-col flex-1">
                <p
                  className="text-sm font-medium text-[#181d27] mb-0.5"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-xs text-[#535862] mb-2"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {member.email}
                </p>
                <span
                  className={`inline-flex w-fit px-2 py-0.5 rounded-2xl text-xs font-medium ${getStatusColor(
                    member.status
                  )}`}
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {member.status === "active" ? "Active" : "Break"}
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === member.id ? null : member.id
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-[#a4a7ae]" />
                </button>
                {activeDropdown === member.id && (
                  <div className="absolute right-0 top-10 bg-white border border-[#e9eaeb] rounded-lg shadow-lg p-4 z-10 w-48">
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          handleAutoAssign();
                        }}
                        className="flex items-center gap-2 px-3.5 py-2 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full hover:bg-[#d3e0fb] transition-colors w-full"
                      >
                        <Zap className="w-5 h-5 text-[#19429d]" />
                        <span
                          className="text-sm font-semibold text-[#19429d]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          Auto Assign
                        </span>
                      </button>
                      <button
                        onClick={() => handleManualAssign(member)}
                        className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#181d27] transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span style={{ fontFamily: "Geist, sans-serif" }}>
                          Manual Assign
                        </span>
                      </button>
                      <button
                        onClick={() => handleEditStaff(member)}
                        className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#181d27] transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span style={{ fontFamily: "Geist, sans-serif" }}>
                          Edit Details
                        </span>
                      </button>
                      <button
                        onClick={() => handleContactStaff(member)}
                        className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#181d27] transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span style={{ fontFamily: "Geist, sans-serif" }}>
                          Contact
                        </span>
                      </button>
                      <button
                        onClick={() => handleRemoveStaff(member)}
                        className="flex items-center gap-2 text-sm text-[#d92d20] hover:text-[#b42318] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span style={{ fontFamily: "Geist, sans-serif" }}>
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p
                  className="text-xs text-[#717680] mb-1"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Role
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {member.role}
                </p>
              </div>
              <div>
                <p
                  className="text-xs text-[#717680] mb-1"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Tasks
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {member.tasks}
                </p>
              </div>
              <div>
                <p
                  className="text-xs text-[#717680] mb-1"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Shift
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {member.shift}
                </p>
              </div>
            </div>

            <div>
              <p
                className="text-xs text-[#717680] mb-2"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Assigned Rooms
              </p>
              <div className="flex gap-1 flex-wrap">
                {member.assignedRooms.map((room, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getRoomBadgeColors(
                      idx
                    )}`}
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {room}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3.5 py-2 bg-white border border-[#d5d7da] rounded-full shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className="text-sm font-semibold text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Previous
            </span>
          </button>
          <p
            className="text-sm font-medium text-[#414651]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 bg-white border border-[#d5d7da] rounded-full shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className="text-sm font-semibold text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Next
            </span>
          </button>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddStaffModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 flex flex-col gap-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-semibold text-[#181d27]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Add New Staff Member
              </h2>
              <button
                onClick={() => setIsAddStaffModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#181d27]" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#414651]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Daniel Kyle"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#414651]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="0905652525"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#414651]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="DanielKyle@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#414651]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "16px",
                    }}
                  >
                    <option value="Room Service">Room Service</option>
                    <option value="Laundry">Laundry</option>
                    <option value="SPA & Amenities">SPA & Amenities</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Concierge">Concierge</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Gym & Fitness">Gym & Fitness</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Transportation">Transportation</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717680] pointer-events-none" />
                </div>
              </div>

              {/* Shift */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#414651]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Shift
                </label>
                <div className="relative">
                  <select
                    value={formData.shift}
                    onChange={(e) =>
                      setFormData({ ...formData, shift: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "16px",
                    }}
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717680] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-5">
              <button
                onClick={() => setIsAddStaffModalOpen(false)}
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
                onClick={() => {
                  // Handle form submission here
                  console.log("Form data:", formData);
                  setIsAddStaffModalOpen(false);
                  // Reset form
                  setFormData({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    role: "Room Service",
                    shift: "Morning",
                  });
                }}
                className="flex-1 px-5 py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
              >
                <span
                  className="text-base font-semibold"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Add Staff
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Thinking Modal */}
      {isThinkingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 flex flex-col gap-8">
            {/* Header with Icon */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ecfdf3] rounded-lg flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#039855]" />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-base font-medium text-[#0c214e]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  AI is Thinking...
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Analyzing workload and selecting rooms
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5">
              {/* Current Stage */}
              <div className="flex flex-col gap-2">
                <p
                  className="text-sm text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Current Stage
                </p>
                <div className="bg-[#f0f5fe] p-4 rounded-lg">
                  <p
                    className="text-sm text-blue-600"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Analyzing workload
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="flex flex-col gap-1.5">
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Progress
                </p>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Done Button */}
            <button
              onClick={() => setIsThinkingModalOpen(false)}
              className="w-full px-5 py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span
                className="text-base font-semibold"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Done
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Auto-Assignment Complete Modal */}
      {isCompleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 flex flex-col gap-8">
            {/* Header with Icon */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ecfdf3] rounded-lg flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#039855]" />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-base font-medium text-[#0c214e]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Auto-Assignment Complete
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Alice Johnson
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5">
              {/* AI Reasoning */}
              <div className="flex flex-col gap-2">
                <p
                  className="text-sm text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  AI Reasoning
                </p>
                <div className="bg-[#f0f5fe] p-4 rounded-lg">
                  <p
                    className="text-sm text-blue-600"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Moderate assignment: 5 rooms to balance current workload and
                    prevent burnout. Adjacent rooms selected.
                  </p>
                </div>
              </div>

              {/* Assigned Rooms */}
              <div className="flex flex-col gap-1.5">
                <p
                  className="text-sm text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Assigned Rooms (5)
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Room A01",
                    "Room A02",
                    "Room A03",
                    "Room A04",
                    "Room A05",
                  ].map((room) => (
                    <span
                      key={room}
                      className="inline-flex px-3 py-1 bg-[#ecfdf3] text-[#027a48] rounded-2xl text-sm font-medium"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {room}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Done Button */}
            <button
              onClick={() => setIsCompleteModalOpen(false)}
              className="w-full px-5 py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span
                className="text-base font-semibold"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Done
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Manual Assign Modal */}
      {isManualAssignModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 flex flex-col gap-8 max-h-[90vh] overflow-y-auto">
            {/* Header with Icon */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ecfdf3] rounded-lg flex items-center justify-center shrink-0">
                <Stars className="w-6 h-6 text-[#039855]" />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-base font-medium text-[#0c214e]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Manual Room Assignment
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {selectedStaff.name} - {selectedStaff.role}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5">
              {/* AI Reasoning */}
              <div className="flex flex-col gap-2">
                <p
                  className="text-sm text-[#314158]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  AI Reasoning
                </p>
                <div className="bg-[#f0f5fe] p-4 rounded-lg">
                  <p
                    className="text-sm text-blue-600"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Moderate assignment: 5 rooms to balance current workload and
                    prevent burnout. Adjacent rooms selected.
                  </p>
                </div>
              </div>

              {/* Assigned Rooms */}
              <div className="flex flex-col gap-1.5">
                <p
                  className="text-sm text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Assigned Rooms ({selectedStaff.assignedRooms.length})
                </p>
                <div className="flex flex-wrap gap-4">
                  {selectedStaff.assignedRooms.map((room, idx) => (
                    <span
                      key={idx}
                      className="inline-flex px-3 py-1 rounded-2xl text-sm font-medium bg-[#ecfdf3] text-[#027a48]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Room {room}
                    </span>
                  ))}
                </div>
              </div>

              {/* Room Selection */}
              <div className="flex flex-col gap-3">
                <p
                  className="text-sm text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Select Additional Rooms to Assign
                </p>
                <div className="bg-[#f0f5fe] p-4 rounded-lg">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {availableRooms.map((room) => {
                      const isAssigned =
                        selectedStaff.assignedRooms.includes(room);
                      const isSelected = selectedRooms.includes(room);
                      return (
                        <button
                          key={room}
                          onClick={() =>
                            !isAssigned && toggleRoomSelection(room)
                          }
                          disabled={isAssigned}
                          className={`px-3 py-2 rounded-lg text-sm font-normal transition-colors ${
                            isAssigned
                              ? "bg-blue-600 text-[#f0f5fe] cursor-not-allowed"
                              : isSelected
                              ? "bg-blue-600 text-[#f0f5fe]"
                              : "bg-white border border-[#d3e0fb] text-blue-600 hover:bg-blue-50"
                          }`}
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {room}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p
                  className="text-xs text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Click to select/deselect rooms. Blued rooms are already
                  assigned.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <button
                onClick={() => {
                  setIsManualAssignModalOpen(false);
                  setSelectedRooms([]);
                }}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full shadow-sm hover:bg-[#d3e0fb] transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-semibold text-[#19429d]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Cancel
                </span>
              </button>
              <button
                onClick={() => {
                  console.log("Assigning rooms:", selectedRooms);
                  setIsManualAssignModalOpen(false);
                  setSelectedRooms([]);
                }}
                disabled={selectedRooms.length === 0}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Assign {selectedRooms.length} Room
                  {selectedRooms.length !== 1 ? "s" : ""}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Staff Modal */}
      {isRemoveModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-8">
            {/* Content */}
            <div className="flex flex-col gap-5 items-center">
              {/* Icon */}
              <div className="w-12 h-12 bg-[#fee4e2] border-8 border-[#fef3f2] rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-[#d92d20]" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 items-center text-center">
                <p
                  className="text-lg font-semibold text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Remove {selectedStaff.name}?
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Are you sure you want to delete {selectedStaff.name}? This
                  action cannot be undone.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-white border border-[#d5d7da] rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-semibold text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  No, Don&apos;t Remove
                </span>
              </button>
              <button
                onClick={() => {
                  console.log("Removing staff:", selectedStaff.name);
                  setIsRemoveModalOpen(false);
                }}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#d92d20] border border-[#d92d20] text-white rounded-full shadow-sm hover:bg-[#b42318] transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Yes, Remove
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {isEditModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <h3
                className="text-lg font-semibold text-[#181d27]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Edit Staff Details
              </h3>
              <p
                className="text-sm text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Update information for {selectedStaff.name}
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label
                    className="text-sm font-medium text-[#181d27]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <option>Room Service</option>
                    <option>Laundry</option>
                    <option>SPA & Amenities</option>
                    <option>Housekeeping</option>
                    <option>Concierge</option>
                    <option>Maintenance</option>
                    <option>Gym & Fitness</option>
                    <option>Restaurant</option>
                    <option>Transportation</option>
                  </select>
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <label
                    className="text-sm font-medium text-[#181d27]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    Shift
                  </label>
                  <select
                    value={formData.shift}
                    onChange={(e) =>
                      setFormData({ ...formData, shift: e.target.value })
                    }
                    className="px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Night</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full shadow-sm hover:bg-[#d3e0fb] transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-semibold text-[#19429d]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Cancel
                </span>
              </button>
              <button
                onClick={() => {
                  console.log("Updating staff:", formData);
                  setIsEditModalOpen(false);
                }}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Save Changes
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Staff Modal */}
      {isContactModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#eff8ff] rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-[#175cd3]" />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-lg font-semibold text-[#181d27]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Contact {selectedStaff.name}
                </p>
                <p
                  className="text-sm text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {selectedStaff.role}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                <Mail className="w-5 h-5 text-[#535862]" />
                <div className="flex flex-col">
                  <p
                    className="text-xs text-[#717680]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Email
                  </p>
                  <p
                    className="text-sm font-medium text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {selectedStaff.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                <Phone className="w-5 h-5 text-[#535862]" />
                <div className="flex flex-col">
                  <p
                    className="text-xs text-[#717680]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Phone
                  </p>
                  <p
                    className="text-sm font-medium text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label
                  className="text-sm font-medium text-[#181d27]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Send Quick Message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  rows={4}
                  className="px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full shadow-sm hover:bg-[#d3e0fb] transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-semibold text-[#19429d]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Cancel
                </span>
              </button>
              <button
                onClick={() => {
                  console.log("Sending message to:", selectedStaff.name);
                  setIsContactModalOpen(false);
                }}
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Send Message
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
