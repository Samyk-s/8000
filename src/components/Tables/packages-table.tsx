"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingItem } from "@/types/booking";
import { useBookings } from "@/hooks/useBookings";
import { formatDate } from "@/utils/bookingUtils";
import { StatusBadge, ViewedBadge } from "@/components/ui/StatusBadge";
import {
  EyeIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  ItinerayIcon,
  GalleryIcon,
  DepartureIcon,
  ReviewIcon,
  SeoIcon,
} from "@/components/icons/icnos";
import usePackages from "@/hooks/usePackages";
import { Package } from "@/types/package";
import Image from "next/image";
import Link from "next/link";

const PackageTable: React.FC = () => {
  const router = useRouter();
  const {
    data,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    fetchBookings,
    deleteBooking,
  } = useBookings();
  const { packages } = usePackages();

  const handleEdit = (id: number): void => {
    router.push(`/admin/packagebooking/editbooking?id=${id}`);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      await deleteBooking(id);
      fetchBookings(currentPage, itemsPerPage, searchTerm);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error deleting booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-center justify-center">
            <LoaderIcon />
            <span className="ml-2 text-gray-600">Loading bookings...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="text-center text-red-600">
            <p className="mb-2 text-lg font-semibold">Error Loading Bookings</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() =>
                fetchBookings(currentPage, itemsPerPage, searchTerm)
              }
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-1">
        {/* Breadcrumb */}
        <div className="mb-4 px-6">
          <nav className="text-sm text-gray-500">
            <ol className="list-reset flex">
              <li>
                <a
                  href="/admin/dashboard"
                  className="text-blue-600 hover:underline"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <span className="mx-2">{">"}</span>
              </li>
              <li className="text-gray-700">Packages</li>
            </ol>
          </nav>
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Package Management
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="rounded border border-gray-300 px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={0}>All</option>
                </select>
                <span className="text-sm text-gray-700">entries</span>
              </div>
              <div
                className="flex w-full max-w-md items-center gap-1 rounded-lg border border-gray-300 px-3 focus:border focus:border-blue-300 focus:ring-2 focus:ring-blue-500"
                role="search"
                tabIndex={0}
                aria-activedescendant="search-input"
              >
                <div className="text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, phone, package, or status..."
                  className="w-full border-none px-4 py-2 outline-none focus:border-none focus:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                style={{ backgroundColor: "oklch(37.9% 0.146 265.522)" }}
                className="text-white"
              >
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    S.N.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Altitue
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {packages && packages.length > 0 ? (
                  packages?.map((item: Package, index) => (
                    <tr key={item?.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link href={item?.image?.url} target="_blank">
                          <div className="h-20 w-30 text-base font-medium text-gray-900">
                            <Image
                              src={item?.image?.url}
                              alt={item?.title}
                              width={1080}
                              height={720}
                              className="aspect-video"
                            />
                          </div>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item?.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base font-medium text-gray-900">
                          {item?.altitude}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base text-gray-500">
                          {item?.grade}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-base font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/packages/${item?.id}`}
                            title="Itinerary"
                          >
                            <ItinerayIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.id}`}
                            title="Gallery"
                          >
                            <GalleryIcon />
                          </Link>
                          <Link
                            href={`/admin/packages/${item?.id}`}
                            title="Departure"
                          >
                            <DepartureIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.id}`}
                            title="Review"
                          >
                            <ReviewIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.id}`}
                            title="SEO"
                          >
                            <SeoIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.id}`}
                            title="Edit Package"
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
                      No packages found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            <div className="text-sm text-gray-700">
              Showing{" "}
              {((data.meta?.currentPage || 1) - 1) *
                (data.meta?.itemsPerPage || itemsPerPage) +
                1}{" "}
              to{" "}
              {Math.min(
                (data.meta?.currentPage || 1) *
                  (data.meta?.itemsPerPage || itemsPerPage),
                data.meta?.totalItems || 0,
              )}{" "}
              of {data.meta?.totalItems || 0} entries
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeftIcon />
                <span className="ml-1">Previous</span>
              </button>
              {Array.from(
                { length: data.meta?.totalPages || 1 },
                (_, i) => i + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded border px-3 py-1 text-sm ${
                    currentPage === page
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === (data.meta?.totalPages || 1)}
                className="flex items-center rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="mr-1">Next</span>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageTable;
