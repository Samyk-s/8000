"use client";
import React, { Suspense } from "react";
import { useBooking } from "@/hooks/booking/useBooking";
import Loader from "../loader/loader";
import Search from "../../search/search";
import Entry from "../../entry/entry";
import Pagination from "../../pagination/pagination";
const BookingView = dynamic(() => import("../../view/booking-view"));
import { EyeIcon, EditIcon, TrashIcon } from "@/components/icons/icnos";
import { AffiliationIcon } from "@/components/Layouts/sidebar/icons";
import { Modal, Popconfirm, message } from "antd";
import Link from "next/link";
import { formatDate } from "@/utils/bookingUtils";
import { ViewedBadge } from "@/components/ui/StatusBadge";
import dynamic from "next/dynamic";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingItem } from "@/types/booking";

const BookingTable: React.FC = () => {
  const {
    items,
    loading,
    meta,
    limit,
    search,
    selectedId,
    isModalOpen,
    setPage,
    setLimit,
    handleSearch,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
  } = useBooking();

  if (loading) return <Loader />;

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                onChange={(value) => setLimit(Number(value))}
                value={limit}
                total={meta?.totalItems}
              />
              <Search
                placeholder="Search package..."
                search={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader
                style={{
                  backgroundColor: "oklch(37.9% 0.146 265.522)",
                  color: "white",
                }}
                className="text-white hover:!bg-none"
              >
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    S. N.
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Customer Name
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Phone
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Package
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Created Date
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Viewed
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-200 bg-white">
                {items && items.length > 0 ? (
                  items.map((item: BookingItem, index: number) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {index + 1}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-6 py-4 text-base font-medium text-gray-900">
                        {item.customerName}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item.customerPhone}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        <Link
                          href={`/admin/packages/${item?.package?.id}`}
                          className="text-blue-400"
                        >
                          {item.package?.title || "N/A"}
                        </Link>
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-6 py-4">
                        <ViewedBadge isViewed={item.isViewd as 0 | 1} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-6 py-4 text-base font-medium">
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
                            onConfirm={() => handleDelete(item.id)}
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
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="px-6 py-8 text-center text-base text-gray-500"
                    >
                      No bookings found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination
            currentPage={meta?.currentPage}
            totalPages={meta?.totalPages}
            itemsPerPage={limit}
            totalItems={meta?.totalItems}
            onPageChange={setPage}
          />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: 0 }}
        title="Booking Details"
      >
        {selectedId > 0 && (
          <Suspense fallback={<Loader />}>
            <BookingView id={selectedId} />
          </Suspense>
        )}
      </Modal>
    </>
  );
};

export default BookingTable;
