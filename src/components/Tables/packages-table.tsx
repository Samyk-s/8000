"use client";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookings } from "@/hooks/useBookings";
import {
  EditIcon,
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
import Entry from "../adminComponents/entry/entry";
import Search from "../adminComponents/search/search";
import Breadcrumb from "../adminComponents/beadcrumb/bedcrumb";
import Pagination from "../adminComponents/pagination/pagination";

const PackageTable: React.FC = () => {
  const router = useRouter();
  const [value, setValue] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 95;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { packages, loading, error } = usePackages();

  const handleEdit = (id: number): void => {
    router.push(`/admin/packagebooking/editbooking?id=${id}`);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error deleting booking");
    }
  };

  function handleSearchPackage(value: string | number) {
    setValue(Number(value));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="light rounded-lg bg-white p-8 shadow-sm">
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
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/admin/dashboard" },
              { label: "Packages", href: "/admin/packages" },
            ]}
            separator="/"
          />
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Package Management
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                onChange={(value) => handleSearchPackage(value)}
                value={value}
              />
              <Search placeholder="Search package..." />
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
                            href={`/admin/packages/${item?.slug}`}
                            title="Itinerary"
                          >
                            <ItinerayIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.slug}`}
                            title="Gallery"
                          >
                            <GalleryIcon />
                          </Link>
                          <Link
                            href={`/admin/packages/${item?.slug}`}
                            title="Departure"
                          >
                            <DepartureIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.slug}`}
                            title="Review"
                          >
                            <ReviewIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.slug}`}
                            title="SEO"
                          >
                            <SeoIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.slug}`}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default PackageTable;
