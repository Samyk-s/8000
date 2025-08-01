'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ApiResponse } from '@/types/booking';
import { BookingApi } from '@/lib/api/bookingApi';

export const useBookings = (
  initialPage: number = 1,
  initialLimit: number = 5
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const getInitialPage = () => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : initialPage;
  };

  const getInitialLimit = () => {
    const limitParam = searchParams.get('limit');
    return limitParam ? parseInt(limitParam, 10) : initialLimit;
  };

  const getInitialSearch = () => {
    return searchParams.get('search') || '';
  };

  const [data, setData] = useState<ApiResponse>({ items: [], meta: {} as any });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(getInitialSearch());
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(getInitialSearch());
  const [currentPage, setCurrentPage] = useState<number>(getInitialPage());
  const [itemsPerPage, setItemsPerPage] = useState<number>(getInitialLimit());

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 when search term changes (but not on initial load)
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) return;
    
    // Only reset page if this is not the initial search term
    const initialSearch = getInitialSearch();
    if (debouncedSearchTerm !== initialSearch) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm]);

  const updateURLParams = (page: number, limit: number, search?: string) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    
    // Include search in URL if it exists
    const searchValue = search !== undefined ? search : debouncedSearchTerm;
    if (searchValue) {
      params.set('search', searchValue);
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const fetchBookings = useCallback(
    async (
      page: number = 1,
      limit: number = 10,
      search: string = ''
    ): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const result = await BookingApi.fetchBookings(page, limit, search);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchBookings(currentPage, itemsPerPage, debouncedSearchTerm);
    // Update URL whenever state changes
    updateURLParams(currentPage, itemsPerPage, debouncedSearchTerm);
  }, [currentPage, itemsPerPage, debouncedSearchTerm, fetchBookings]);

  const deleteBooking = async (id: number): Promise<void> => {
    try {
      await BookingApi.deleteBooking(id);
      await fetchBookings(currentPage, itemsPerPage, debouncedSearchTerm);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error';
      throw new Error('Error deleting booking: ' + errorMessage);
    }
  };

  const viewBooking = async (id: number): Promise<void> => {
    try {
      await BookingApi.markAsViewed(id);
      setData((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, isViewd: 1 } : item
        ),
      }));
    } catch (err) {
      alert('Error marking booking as viewed');
      console.error(err);
    }
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit: number): void => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearchTerm: string): void => {
    setSearchTerm(newSearchTerm);
  };

  return {
    data,
    loading,
    error,
    searchTerm,
    setSearchTerm: handleSearchChange,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    fetchBookings,
    deleteBooking,
    viewBooking,
  };
};