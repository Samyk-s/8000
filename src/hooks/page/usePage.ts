"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchPages,
  searchPages,
  deletePage,
  togglePageStatus,
  getPageById,
} from "@/redux-store/slices/pageSlice";
import { PageType } from "@/types/enum/enum";

export const usePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta, page: currentPage } = useSelector((state: RootState) => state.pages);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch pages
  useEffect(() => {
    dispatch(fetchPages({ page, limit, search: PageType.PAGE }));
  }, [dispatch, page, limit]);

  // Search pages with debounce
  const handleSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      dispatch(
        searchPages({
          params: { search: value, page, limit, type: PageType.PAGE },
        })
      );
    }, 300);
  };

  // Actions

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deletePage(id));
    },
    [dispatch]
  );

  const handleToggleStatus = useCallback(
    (id: number) => {
      dispatch(togglePageStatus(id));
    },
    [dispatch]
  );

  const getPageByid = useCallback(
    async (id: number) => {
      await dispatch(getPageById(id));
    },
    [dispatch]
  );

  return {
    items,
    loading,
    error,
    meta,
    search,
    page,
    limit,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleToggleStatus,
    currentPage,
    getPageByid
  };
};
