"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchAddons,
  searchAddons,
  deleteAddon,
  toggleAddonStatus,
} from "@/redux-store/slices/addonSlice";
import { AddOnItem } from "@/types/addOns";

export const useAddons = (packageId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.addons
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [selectedAddon, setSelectedAddon] = useState<AddOnItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch addons
  const fetchData = useCallback(() => {
    dispatch(fetchAddons({ id: packageId, params: { limit, page } }));
  }, [dispatch, packageId, limit, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced search
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        dispatch(searchAddons({ id: packageId, params: { limit, page, search: value } }));
      }, 300);
    },
    [dispatch, packageId, limit, page]
  );

  // Modal handlers
  const openModal = useCallback((addon?: AddOnItem) => {
    setSelectedAddon(addon || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedAddon(null);
    setIsModalOpen(false);
  }, []);

  // Delete addon
  const handleDelete = useCallback(
    (addonId: number) => {
      dispatch(deleteAddon({ packageId, addonId }));
    },
    [dispatch, packageId]
  );

  // Toggle addon status
  const handleToggleStatus = useCallback(
    (addonId: number) => {
      dispatch(toggleAddonStatus({ packageId, addonId }));
    },
    [dispatch, packageId]
  );

  // Pagination & limit
  const changePage = useCallback((newPage: number) => setPage(newPage), []);
  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // reset page when limit changes
  }, []);

  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    selectedAddon,
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
