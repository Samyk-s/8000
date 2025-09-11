"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BookingItem } from "@/types/booking";
import { formatDate } from "@/utils/bookingUtils";
import { StatusBadge, ViewedBadge } from "@/components/ui/StatusBadge";
import { EyeIcon, EditIcon, TrashIcon } from "@/components/icons/icnos";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/loader";
import Search from "../../search/search";
import Entry from "../../entry/entry";
import { message, Modal, Popconfirm } from "antd";
import {
  deleteBooking,
  fetchBooking,
  searchBooking,
} from "@/redux-store/slices/bookinSlice";
import Pagination from "../../pagination/pagination";
import Link from "next/link";
import BookingView from "../../view/booking-view";
import { AffiliationIcon } from "@/components/Layouts/sidebar/icons";

const RecentBookingTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.bookings,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // search booking
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      dispatch(
        searchBooking({
          params: { limit, page, search: value },
        }),
      );
    }, 300); // 300ms debounce
  };
  useEffect(() => {
    dispatch(
      fetchBooking({
        params: { limit, page },
      }),
    );
  }, [dispatch, limit, page]);

  // Open modal handler
  const handleOpenModal = useCallback((id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }, []);

  // Close modal handler
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedId(0);
  }, []);

  if (loading) return <Loader />;
  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between bg-red-800 p-2 text-white">
            <span className="font-semibold">Recent Bokking</span>
            <Link
              href={"/admin/bookings"}
              className="ho font-semibold text-white"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Customer Name
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Package
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items.length > 0 ? (
                  items.map((item: BookingItem, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base font-medium text-gray-900">
                          {item.customerName}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base text-gray-900">
                          <Link
                            href={`/admin/packages/${item?.package?.id}`}
                            className="text-blue-400"
                          >
                            {item.package?.title || "N/A"}
                          </Link>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-base font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="rounded p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-900"
                            title="View Details"
                            onClick={() => handleOpenModal(item.id)}
                          >
                            <EyeIcon />
                          </button>

                          <Link
                            href={`/admin/bookings/${item?.id}`}
                            className="rounded p-1 text-green-600 hover:bg-green-50 hover:text-green-900"
                            title="Edit Booking"
                          >
                            <EditIcon />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-base text-gray-500"
                    >
                      No bookings found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* View Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: 0 }}
        title="Inquiry Details"
      >
        {selectedId > 0 && <BookingView id={selectedId} />}
      </Modal>
    </>
  );
};

export default RecentBookingTable;
