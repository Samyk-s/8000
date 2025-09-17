import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchPages,
  getPageByType,
  searchPages,
  deletePage,
  togglePageStatus,
} from "@/redux-store/slices/pageSlice";
import { PageItem } from "@/types/page";
import { PageType } from "@/types/enum/enum";
import { message } from "antd";

interface UseActivityPagesProps {
  initialLimit?: number;
}

export const useActivityPages = ({ initialLimit = 10 }: UseActivityPagesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.pages
  );

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(initialLimit);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /** Fetch pages */
  const fetchActivityPages = useCallback(() => {
    dispatch(
      getPageByType({
        search: PageType.ACTIVITIES,
        page,
        limit,
      })
    );
  }, [dispatch, page, limit]);

  useEffect(() => {
    fetchActivityPages();
  }, [fetchActivityPages]);

  /** Search pages with debounce */
  const handleSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(
        searchPages({
          params: { search: value, page, limit, type: PageType.ACTIVITIES },
        })
      );
    }, 300);
  };

  /** Delete page */
  const handleDeletePage = (id: number) => {
    dispatch(deletePage(id));
  };

  /** Toggle page status */
  const handleToggleStatus = (id: number) => {
    dispatch(togglePageStatus(id));
  };

  /** Show error message */
  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  return {
    items,
    loading,
    meta,
    search,
    page,
    setPage,
    limit,
    setLimit,
    handleSearch,
    handleDeletePage,
    handleToggleStatus,
  };
};
