"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchInquiries,
  deleteInquiry,
  searchInquiries,
  getInquiry,
} from "@/redux-store/slices/inquirySlice";

export const useInquiry = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { items, loading, error, meta, inquiry } = useSelector(
    (state: RootState) => state.inquiries
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Set default type query param
  useEffect(() => {
    const type = searchParams.get("type") || "general";
    if (!searchParams.get("type")) {
      router.replace(`/admin/inquiries?type=${type}`);
    }
  }, [router, searchParams]);

  const type = searchParams.get("type") || "general";

  // Fetch inquiries when page, limit, or type changes
  const fetchData = useCallback(() => {
    dispatch(fetchInquiries({ params: { page, limit, search: type } }));
  }, [dispatch, page, limit, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced search
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        dispatch(
          searchInquiries({ params: { page, limit, search: value, inquiry_type: type } })
        );
      }, 300);
    },
    [dispatch, page, limit, type]
  );

  // Delete inquiry
  const handleDelete = useCallback(
    (id: number) => dispatch(deleteInquiry({ id })),
    [dispatch]
  );

  // Modal handlers
  const openModal = useCallback((id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedId(null);
    setIsModalOpen(false);
  }, []);

  const getInquiryById = useCallback((id: number) => {
    dispatch(getInquiry(id))
  }, [dispatch]);

  return {
    items,
    loading,
    error,
    meta,
    page,
    setPage,
    limit,
    setLimit,
    search,
    handleSearch,
    handleDelete,
    isModalOpen,
    selectedId,
    openModal,
    closeModal,
    inquiry,
    getInquiryById
  };
};
