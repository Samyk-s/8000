"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchItineraries,
  searchItineraries,
  deleteItinerary,
  toggleItineraryStatus,
} from "@/redux-store/slices/itinerarySlice";
import { ItineraryItem } from "@/types/itinerary";

interface UseItinerary {
  packageId: number;
}

export const useItinerary = ({ packageId }: UseItinerary) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.itineraries
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryItem | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch itineraries
  useEffect(() => {
    dispatch(fetchItineraries({ id: packageId, params: { limit, page } }));
  }, [dispatch, packageId, limit, page]);

  // Search itineraries
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        dispatch(searchItineraries({ id: packageId, params: { limit, page, search: value } }));
      }, 300);
    },
    [dispatch, packageId, limit, page]
  );

  // Modal handlers
  const openModal = useCallback((itinerary?: ItineraryItem) => {
    setSelectedItinerary(itinerary || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedItinerary(null);
    setIsModalOpen(false);
  }, []);

  // Delete itinerary
  const handleDelete = useCallback(
    (itineraryId: number) =>
      dispatch(deleteItinerary({ packageId, itineraryId })),
    [dispatch, packageId]
  );

  // Toggle itinerary status
  const handleToggleStatus = useCallback(
    (itineraryId: number) => dispatch(toggleItineraryStatus({ packageId, itineraryId })),
    [dispatch, packageId]
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
    selectedItinerary,
    openModal,
    closeModal,
    handleSearch,
    handleDelete,
    handleToggleStatus,
    changePage,
    changeLimit,
    setIsModalOpen, // for passing to form component
  };
};
