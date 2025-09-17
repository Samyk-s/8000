"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchPackages,
  getPacakgeById,
  searchPackages,
  togglePackageStatus,
} from "@/redux-store/slices/packageSlice";

export const usePackage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta, currentPackage } = useSelector(
    (state: RootState) => state.packges
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch packages
  useEffect(() => {
    dispatch(fetchPackages({ page, limit }));
  }, [dispatch, page, limit]);

  // Search packages with debounce
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        dispatch(
          searchPackages({
            params: { page, limit, search: value },
          })
        );
      }, 300);
    },
    [dispatch, page, limit]
  );

  // Toggle package status
  const handleToggleStatus = useCallback(
    (id: number) => dispatch(togglePackageStatus(id)),
    [dispatch]
  );

  // Pagination handlers
  const changePage = useCallback((newPage: number) => setPage(newPage), []);
  const changeLimit = useCallback((newLimit: number) => setLimit(newLimit), []);
  const getPackage = useCallback((id: number) => dispatch(getPacakgeById(id)), [dispatch]);


  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    handleSearch,
    handleToggleStatus,
    changePage,
    changeLimit,
    setLimit,
    setPage,
    currentPackage,
    getPackage
  };
};
