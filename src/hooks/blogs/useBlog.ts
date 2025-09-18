"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { fetchBlogs, deleteBlog, toggleBlogStatus, getBlogById } from "@/redux-store/slices/blogSlice";
import { BlogCategory } from "@/types/enum/enum";

export const useBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta, blog } = useSelector((state: RootState) => state.blogs);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [category, setCategory] = useState<string | null>(BlogCategory.NEWS_AND_EVENTS);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Sync category with query params
  // useBlog.ts
  useEffect(() => {
    // Only sync query params if we are on the blogs list page
    if (pathname === "/admin/blogs") {
      const type = searchParams.get("type") || BlogCategory.NEWS_AND_EVENTS;
      setCategory(type);

      if (!searchParams.get("type")) {
        router.replace(`/admin/blogs?type=${type}`);
      }
    }
  }, [router, searchParams]);


  // Fetch blogs when page, limit, or category changes
  useEffect(() => {
    if (category) {
      dispatch(
        fetchBlogs({
          params: { page, limit },
          type: category,
        })
      );
    }
  }, [dispatch, page, limit, category]);

  // Actions
  const handleDelete = (id: number) => dispatch(deleteBlog(id));
  const handleToggleStatus = (id: number) => dispatch(toggleBlogStatus(id));
  const getBlog = useCallback((id: number) => {
    dispatch(getBlogById(id))
  }, [dispatch])

  return {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    category,
    setPage,
    setLimit,
    setCategory,
    handleDelete,
    handleToggleStatus,
    getBlog,
    blog
  };
};
