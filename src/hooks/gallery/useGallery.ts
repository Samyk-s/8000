"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  deleteFile,
  fetchFiles,
  searchFile,
  toggleFileStatus,
} from "@/redux-store/slices/fileSlice";
import { FileType, PageTemplate } from "@/types/enum/enum";

interface UseGalleryFilesProps {
  packageId: number;
}

export const useGallery = ({ packageId }: UseGalleryFilesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.files
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch files
  useEffect(() => {
    dispatch(
      fetchFiles({
        id: packageId,
        params: {
          file_of: PageTemplate.PACKAGE,
          type: FileType.GALLERY,
          related_id: packageId,
          limit,
          page,
        },
      })
    );
  }, [dispatch, packageId, limit, page]);

  // Search files
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        dispatch(
          searchFile({
            params: {
              page,
              limit,
              related_id: packageId,
              type: FileType.GALLERY,
              file_of: PageTemplate.PACKAGE,
              search: value,
            },
          })
        );
      }, 300);
    },
    [dispatch, packageId, page, limit]
  );

  // Modal handlers
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Delete file
  const handleDelete = useCallback(
    (id: number) => dispatch(deleteFile({ id })),
    [dispatch]
  );

  // Toggle file status
  const handleToggleStatus = useCallback(
    (id: number) => dispatch(toggleFileStatus({ id })),
    [dispatch]
  );

  // Pagination handlers
  const changePage = useCallback((newPage: number) => setPage(newPage), []);
  const changeLimit = useCallback((newLimit: number) => setLimit(newLimit), []);

  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    isModalOpen,
    openModal,
    closeModal,
    handleSearch,
    handleDelete,
    handleToggleStatus,
    changePage,
    changeLimit,
    setIsModalOpen, // for passing to FileForm
  };
};
