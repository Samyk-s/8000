"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  getTestimonials,
  searchTestimonials,
  deleteTestimonial,
  toggleTestimonialStatus,
} from "@/redux-store/slices/testimonialSlice";
import { message } from "antd";

export const useTestimonials = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.testimonials
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch testimonials
  useEffect(() => {
    dispatch(getTestimonials({ page, limit }));
  }, [dispatch, page, limit]);

  // Delete testimonial
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteTestimonial(id));
    },
    [dispatch]
  );

  // Toggle testimonial status
  const handleToggle = useCallback(
    (id: number) => {
      dispatch(toggleTestimonialStatus(id));
    },
    [dispatch]
  );

  // Search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchTestimonials({ params: { page, limit, search: value } }));
    }, 300);
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
  };
};
