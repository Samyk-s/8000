"use client";
import React from "react";
import { message, Modal, Popconfirm } from "antd";
import { EyeIcon, EditIcon, TrashIcon } from "@/components/icons/icnos";
import { AffiliationIcon } from "@/components/Layouts/sidebar/icons";
import { useBookingTable } from "@/hooks/booking/useBookingTable";
import Loader from "../loader/loader";
import Search from "../../search/search";
import Entry from "../../entry/entry";
import Pagination from "../../pagination/pagination";
import BookingView from "../../view/booking-view";
import Link from "next/link";
import { formatDate } from "@/utils/bookingUtils";
import { ViewedBadge } from "@/components/ui/StatusBadge";

const BookingTable: React.FC = () => {
  const {
    items,
    loading,
    error,
    meta,
    page,
    setPage,
    limit,
    setLimit,
    search,
    isModalOpen,
    selectedId,
    handleSearch,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
  } = useBookingTable();

  if (loading) return <Loader />;
  if (error) message.error(error);

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                onChange={(value) => setLimit(Number(value))}
                value={limit}
                total={meta?.totalItems}
              />
              <Search
                placeholder="Search booking..."
                search={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                style={{ backgroundColor: "oklch(37.9% 0.146 265.522)" }}
                className="text-white"
              >
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    S. N.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Viewed
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.customerName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.customerPhone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          href={`/admin/packages/${item?.package?.id}`}
                          className="text-blue-400"
                        >
                          {item.package?.title || "N/A"}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <ViewedBadge isViewed={item.isViewd as 0 | 1} />
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
                            href={`/admin/bookings/${item?.id}/assign`}
                            className="rounded p-1 text-green-600 hover:bg-green-50 hover:text-green-900"
                            title="Assign Booking"
                          >
                            <AffiliationIcon />
                          </Link>
                          <Link
                            href={`/admin/bookings/${item?.id}`}
                            className="rounded p-1 text-green-600 hover:bg-green-50 hover:text-green-900"
                            title="Edit Booking"
                          >
                            <EditIcon />
                          </Link>
                          <Popconfirm
                            title="Delete the Booking"
                            description="Are you sure to delete this booking?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() => handleDelete(item?.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                              title="Delete the booking"
                            >
                              <TrashIcon />
                            </button>
                          </Popconfirm>
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

          {/* Pagination */}
          <Pagination
            currentPage={meta?.currentPage}
            totalPages={meta?.totalPages}
            itemsPerPage={limit}
            totalItems={meta?.totalItems}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>

      {/* Modal */}
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

export default BookingTable;
