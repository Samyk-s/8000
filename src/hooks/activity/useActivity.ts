"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  getPageByType,
  searchPages,
  deletePage,
  togglePageStatus,
} from "@/redux-store/slices/pageSlice";
import { PageType } from "@/types/enum/enum";

export const useActivity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.pages
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(1);
  const [search, setSearch] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch pages
  const fetchData = useCallback(() => {
    dispatch(getPageByType({ search: PageType.ACTIVITIES, page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Search with debounce
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        dispatch(
          searchPages({
            params: { limit, page, search: value, type: PageType.ACTIVITIES },
          })
        );
      }, 300);
    },
    [dispatch, limit, page]
  );

  // Delete page
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deletePage(id));
    },
    [dispatch]
  );

  // Toggle status
  const handleToggleStatus = useCallback(
    (id: number) => {
      dispatch(togglePageStatus(id));
    },
    [dispatch]
  );

  // Pagination and limit handlers
  const changePage = useCallback((newPage: number) => setPage(newPage), []);
  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // reset to first page
  }, []);

  return {
    items,
    loading,
    error,
    meta,
    search,
    page,
    limit,
    handleSearch,
    handleDelete,
    handleToggleStatus,
    changePage,
    changeLimit,
  };
};
