"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchNewsLetter,
  searchNewsLetter,
  deleteNewsLetter,
} from "@/redux-store/slices/newsLetterSlice";
import { NewsLetterItem } from "@/types/news-letter";
import { message } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const useSubscription = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.newsLetter
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch newsletter on page or limit change
  useEffect(() => {
    dispatch(fetchNewsLetter({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  // Delete subscriber
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteNewsLetter({ id }));
    },
    [dispatch]
  );

  // Search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      dispatch(
        searchNewsLetter({
          params: { limit, page, search: value },
        })
      );
    }, 300);
  };

  // Export subscribers to Excel
  const handleExport = () => {
    if (!items || items.length === 0) {
      message.warning("No subscriber data to export");
      return;
    }

    const exportData = items.map((item: NewsLetterItem, index: number) => ({
      "S.N.": index + 1,
      ID: item.id,
      Email: item.email,
      "Received On": new Date(item.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `subscribers_${Date.now()}.xlsx`);
  };

  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleExport,
  };
};
