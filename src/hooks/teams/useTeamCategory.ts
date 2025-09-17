"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchTeamsCategories,
  searchTeamCategory,
  deleteTeamCategory,
  toggleTeamCategory,
  getTeamCategory,
} from "@/redux-store/slices/teamCategorySlice";
import { message } from "antd";

export const useTeamCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta, teamCategory } = useSelector(
    (state: RootState) => state.teamsCategory
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch categories
  useEffect(() => {
    dispatch(fetchTeamsCategories({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  // Delete category
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteTeamCategory(id));
    },
    [dispatch]
  );

  // Toggle category status
  const handleToggle = useCallback(
    (id: number) => {
      dispatch(toggleTeamCategory(id));
    },
    [dispatch]
  );

  // Search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchTeamCategory({ params: { page, limit, search: value } }));
    }, 300);
  };

  const getTeamCategoryById = async (id: number) => {
    await dispatch(getTeamCategory(id))
  }
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
    teamCategory,
    getTeamCategoryById
  };
};
