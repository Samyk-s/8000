"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchTeams,
  searchTeam,
  deleteTeam,
  toggleTeam,
  getTeam,
} from "@/redux-store/slices/teamSlice";
import { message } from "antd";

export const useTeams = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta, team } = useSelector(
    (state: RootState) => state.teams
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch teams
  useEffect(() => {
    dispatch(fetchTeams({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  // Delete team
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteTeam(id));
    },
    [dispatch]
  );

  // Toggle team status
  const handleToggle = useCallback(
    (id: number) => {
      dispatch(toggleTeam(id));
    },
    [dispatch]
  );

  // Search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchTeam({ params: { page, limit, search: value } }));
    }, 300);
  };

  const getTeamByid = useCallback(
    (id: number) => {
      dispatch(getTeam(id));
    },
    [dispatch]
  );


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
    team,
    getTeamByid
  };
};
