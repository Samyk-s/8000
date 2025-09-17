"use client";
import React from "react";
import { BookingItem } from "@/types/booking";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EyeIcon, EditIcon } from "@/components/icons/icnos";
import Loader from "../loader/loader";
import { Modal, Typography } from "antd";
import Link from "next/link";
import BookingView from "../../view/booking-view";
import { BookingStatus } from "@/types/enum/enum";
import { useBooking } from "@/hooks/booking/useBooking";
const RecentBookingTable: React.FC = () => {
  const {
    items,
    loading,

    selectedId,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  } = useBooking();

  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const created = new Date(date);
    const diffMs = now.getTime() - created.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 5) return `${weeks}w ago`;
    if (months < 12) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    // years + months detail
    const remainingMonths = months % 12;
    if (remainingMonths > 0) {
      return `${years}y ${remainingMonths}m ago`;
    }
    return `${years}y ago`;
  };

  if (loading) return <Loader />;
  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between bg-red-800 p-2 text-white">
            <Typography.Title level={4} className="!text-md !text-white">
              Activities
            </Typography.Title>
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
                        <StatusBadge status={item.status as BookingStatus} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {formatTimeAgo(item?.createdAt)}
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
