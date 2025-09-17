"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchSummitters,
  searchSummitters,
  deleteSummiter,
  toggleSummiter,
} from "@/redux-store/slices/summiterSlice";
import summittterApi from "@/lib/api/summitterApi";
import { message } from "antd";

export const useSummitter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.summiter
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch summiters
  useEffect(() => {
    dispatch(fetchSummitters({ page, limit }));
  }, [dispatch, page, limit]);

  // Delete summitter
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteSummiter(id));
    },
    [dispatch]
  );

  // Toggle summitter status
  const handleToggle = useCallback(
    (id: number) => {
      dispatch(toggleSummiter(id));
    },
    [dispatch]
  );

  // Search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchSummitters({ page, limit, search: value }));
    }, 300);
  };

  // Send certificate
  const handleSendCertificate = async (id: number) => {
    try {
      const res = await summittterApi.summitterCertificate(id);
      message.success(res.message);
    } catch (error: any) {
      message.error(error.message);
    }
  };

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
    handleSendCertificate,
  };
};
