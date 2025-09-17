"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  deleteDeparture,
  fetchDepartures,
  searchDeparture,
  toggleDepartureStatus,
} from "@/redux-store/slices/departureSlice";
import { DepartureItem } from "@/types/departure";

export const useDepartures = (packageId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.departures
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch departures
  useEffect(() => {
    dispatch(
      fetchDepartures({
        id: packageId,
        params: { limit, page },
      })
    );
  }, [dispatch, packageId, limit, page]);

  // Search departures
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        dispatch(
          searchDeparture({
            id: packageId,
            params: { limit, page, search: value },
          })
        );
      }, 300);
    },
    [dispatch, packageId, limit, page]
  );

  // Open modal
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Delete departure
  const handleDelete = useCallback(
    (departureId: number) => {
      dispatch(deleteDeparture({ packageId, departureId }));
    },
    [dispatch, packageId]
  );

  // Toggle status
  const handleToggleStatus = useCallback(
    (departureId: number) => {
      dispatch(toggleDepartureStatus({ packageId, departureId }));
    },
    [dispatch, packageId]
  );

  // Change page
  const changePage = useCallback((newPage: number) => setPage(newPage), []);

  // Change limit
  const changeLimit = useCallback((newLimit: number) => setLimit(newLimit), []);

  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    isModalOpen,
    handleSearch,
    openModal,
    closeModal,
    handleDelete,
    handleToggleStatus,
    changePage,
    changeLimit,
  };
};
