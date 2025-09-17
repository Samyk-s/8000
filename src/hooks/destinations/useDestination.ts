"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  getPageByType,
  searchPages,
  deletePage,
  togglePageStatus,
} from "@/redux-store/slices/pageSlice";
import { PageType } from "@/types/enum/enum";

export const useDestination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector((state: RootState) => state.pages);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch destination pages
  useEffect(() => {
    dispatch(
      getPageByType({
        search: PageType.DESTINATION,
        page,
        limit,
      })
    );
  }, [dispatch, page, limit]);

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      dispatch(
        searchPages({
          params: { search: value, page, limit, type: PageType.DESTINATION },
        })
      );
    }, 300);
  };

  // Actions
  const handleDelete = (id: number) => dispatch(deletePage(id));
  const handleToggleStatus = (id: number) => dispatch(togglePageStatus(id));

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
  };
};
