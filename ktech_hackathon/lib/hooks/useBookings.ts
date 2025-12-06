import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

export interface Booking {
  _id: string;
  user: any;
  room: any;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  confirmationCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookedRoom {
  _id: string;
  number: number;
  alphabet: string;
  category: string;
  price: number;
  status: string;
  maxGuest: number;
  bedType: string;
  oceanView: boolean;
  images: string[];
}

export interface BookedRoomsResponse {
  rooms: BookedRoom[];
  bookings: Booking[];
}

export function useBookings() {
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [bookedRooms, setBookedRooms] = useState<BookedRoomsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/bookings/active");
      const bookings = response.data.data?.bookings || [];
      setActiveBookings(bookings);
      return bookings;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch active bookings";
      setError(errorMessage);
      console.error("Error fetching active bookings:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/bookings/my-bookings");
      const bookings = response.data.data?.bookings || [];
      setMyBookings(bookings);
      // Also set activeBookings for guest users (filtered to checked-in bookings)
      const checkedInBookings = bookings.filter(
        (booking: Booking) => booking.status === "checked-in" || (booking as any).checkedIn === true
      );
      setActiveBookings(checkedInBookings);
      return bookings;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch your bookings";
      setError(errorMessage);
      console.error("Error fetching my bookings:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/bookings/booked-rooms");
      const data: BookedRoomsResponse = {
        rooms: response.data.data?.rooms || [],
        bookings: response.data.data?.bookings || [],
      };
      setBookedRooms(data);
      return data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch booked rooms";
      setError(errorMessage);
      console.error("Error fetching booked rooms:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    activeBookings,
    myBookings,
    bookedRooms,
    loading,
    error,
    fetchActiveBookings,
    fetchMyBookings,
    fetchBookedRooms,
  };
}

