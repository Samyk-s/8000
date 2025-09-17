import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  deleteBooking,
  fetchBooking,
  searchBooking,
} from "@/redux-store/slices/bookinSlice";

export const useBookingTable = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.bookings
  );
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /** Fetch bookings on page/limit change */
  useEffect(() => {
    dispatch(fetchBooking({ params: { limit, page } }));
  }, [dispatch, limit, page]);

  /** Search with debounce */
  const handleSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchBooking({ params: { limit, page, search: value } }));
    }, 300);
  };

  /** Open modal */
  const handleOpenModal = useCallback((id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }, []);

  /** Close modal */
  const handleCloseModal = useCallback(() => {
    setSelectedId(0);
    setIsModalOpen(false);
  }, []);

  /** Delete booking */
  const handleDelete = (id: number) => {
    dispatch(deleteBooking(id));
  };

  return {
    items,
    loading,
    error,
    meta,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    isModalOpen,
    selectedId,
    handleSearch,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
  };
};
