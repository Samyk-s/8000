"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  EditIcon,
  ItinerayIcon,
  GalleryIcon,
  DepartureIcon,
  ReviewIcon,
  SeoIcon,
} from "@/components/icons/icnos";
import { Package } from "@/types/package";
import Image from "next/image";
import Link from "next/link";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchPackages,
  togglePackageStatus,
} from "@/redux-store/slices/packageSlice";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon } from "@/assets/icons";
import Loader from "../loader/loader";
import { message } from "antd";

const PackageTable: React.FC = () => {
  const router = useRouter();
  const [value, setValue] = useState(10);
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.packges,
  );
  const [currentPage, setCurrentPage] = useState(meta?.currentPage);
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = Math.ceil(meta?.totalPages / meta?.itemsPerPage);
  // call api for getting packages
  useEffect(() => {
    dispatch(fetchPackages({ page: 1, limit: 10 }));
  }, [dispatch]);

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
    return <Loader />;
  }

  if (error) {
    message.error(error);
  }

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex justify-end">
              <Link
                href={"/admin/packages/create-package"}
                className="flex w-fit items-center gap-1 rounded-md bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
              >
                <PlusIcon />
                <span>Create</span>
              </Link>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                onChange={(value) => handleSearchPackage(value)}
                value={value}
              />
              {/* <Search placeholder="Search package..." /> */}
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
                    Altitude
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
                {items && items?.length > 0 ? (
                  items?.map((item: Package, index) => (
                    <tr key={item?.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          href={`${item?.image?.url || "/images/broken/broken.png"}`}
                          target="_blank"
                        >
                          <div className="h-20 w-30 text-base font-medium text-gray-900">
                            <Image
                              src={
                                item?.image?.url || "/images/broken/broken.png"
                              }
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
                            href={`/admin/packages/${item?.id}/itinerary`}
                            title="Itinerary"
                          >
                            <ItinerayIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.id}/gallery`}
                            title="Gallery"
                          >
                            <GalleryIcon />
                          </Link>
                          <Link
                            href={`/admin/packages/${item?.id}/departure`}
                            title="Departure"
                          >
                            <DepartureIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.id}/review`}
                            title="Review"
                          >
                            <ReviewIcon />
                          </Link>

                          <Link
                            href={`/admin/packages/${item?.id}/seo`}
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
                          <ToggleButton
                            onChange={() => {
                              dispatch(togglePackageStatus(item?.id));
                            }}
                            checked={item?.status === 1 ? true : false}
                            title={
                              item?.status === 1
                                ? "Deactive Package"
                                : "Active Package"
                            }
                          />
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
            itemsPerPage={meta?.itemsPerPage}
            totalItems={meta?.totalItems}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default PackageTable;
