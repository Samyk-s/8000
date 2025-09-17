"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchSummitterStories,
  searchchSummitterStories,
  deleteSummitterStory,
  toggleSummitterStory,
} from "@/redux-store/slices/storySlice";
import { message } from "antd";

export const useSummitterStory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.stories
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch stories
  useEffect(() => {
    dispatch(fetchSummitterStories({ page, limit }));
  }, [dispatch, page, limit]);

  // Delete story
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteSummitterStory(id));
    },
    [dispatch]
  );

  // Toggle story status
  const handleToggle = useCallback(
    (id: number) => {
      dispatch(toggleSummitterStory(id));
    },
    [dispatch]
  );

  // Search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchchSummitterStories({ page, limit, search: value }));
    }, 300);
  };

  // Show error message if any
  if (error) message.error(error);

  return {
    items,
    loading,
    meta,
    page,
    limit,
    search,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleToggle,
  };
};
