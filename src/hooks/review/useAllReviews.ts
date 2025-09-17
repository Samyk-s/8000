"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  getAllReviews,
  searchReviews,
  deleteReview,
  toggleReviewStatus,
} from "@/redux-store/slices/reviewSlice";
import { message } from "antd";

export const useAllReviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.packgeReviews
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [reviewId, setReviewId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch reviews
  useEffect(() => {
    dispatch(getAllReviews({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  // Search with debounce
  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchReviews({ params: { page, limit, search: value } }));
    }, 300);
  };

  // Delete review
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteReview({ id }));
    },
    [dispatch]
  );

  // Toggle review status
  const handleToggle = useCallback(
    (id: number) => {
      dispatch(toggleReviewStatus({ id }));
    },
    [dispatch]
  );

  // Open/close modal
  const handleOpenModal = (id: number) => {
    setReviewId(id);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setReviewId(0);
    setIsModalOpen(false);
  };

  if (error) message.error(error);

  return {
    items,
    loading,
    meta,
    page,
    limit,
    search,
    reviewId,
    isModalOpen,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleToggle,
    handleOpenModal,
    handleCloseModal,
  };
};
