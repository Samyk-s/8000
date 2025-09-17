"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  deleteReview,
  fetchReviews,
  searchReviewsBypackage,
  toggleReviewStatus,
} from "@/redux-store/slices/reviewSlice";
import { ReviewItem } from "@/types/packge-review";

export const useReviews = (packageId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.packgeReviews
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number>(0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch reviews
  useEffect(() => {
    dispatch(
      fetchReviews({
        id: packageId,
        params: { limit, page },
      })
    );
  }, [dispatch, packageId, limit, page]);

  // Search reviews
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        dispatch(
          searchReviewsBypackage({
            id: packageId,
            params: { limit, page, search: value },
          })
        );
      }, 300);
    },
    [dispatch, packageId, limit, page]
  );

  // Open modal
  const openModal = useCallback((id?: number) => {
    if (id) setReviewId(id);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setReviewId(0);
  }, []);

  // Delete review
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteReview({ id }));
    },
    [dispatch]
  );

  // Toggle status
  const handleToggleStatus = useCallback(
    (id: number) => {
      dispatch(toggleReviewStatus({ id }));
    },
    [dispatch]
  );

  // Change page
  const changePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  // Change limit
  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
  }, []);

  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    reviewId,
    isModalOpen,
    handleSearch,
    openModal,
    closeModal,
    handleDelete,
    handleToggleStatus,
    changePage,
    changeLimit,
  };
};
