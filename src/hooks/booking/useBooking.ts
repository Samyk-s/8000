"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchBooking,
  searchBooking,
  deleteBooking,
  fetchBookingById,
} from "@/redux-store/slices/bookinSlice";

export const useBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta, booking } = useSelector(
    (state: RootState) => state.bookings
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch bookings on page/limit change
  useEffect(() => {
    dispatch(fetchBooking({ params: { limit, page } }));
  }, [dispatch, limit, page]);

  // Search bookings with debounce
  const handleSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchBooking({ params: { limit, page, search: value } }));
    }, 300);
  };

  // Modal handlers
  const handleOpenModal = useCallback((id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedId(0);
  }, []);

  // Delete booking
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteBooking(id));
    },
    [dispatch]
  );
  const getBookingByid = async (id: number) => {
    await dispatch(fetchBookingById(id))
  }

  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    selectedId,
    isModalOpen,
    setPage,
    setLimit,
    handleSearch,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
    booking,
    getBookingByid
  };
};
