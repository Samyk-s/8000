"use client";
import React, { useEffect, useRef, useState } from "react";
import Entry from "../../entry/entry";
import Pagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import Loader from "../loader/loader";
import { message, Popconfirm } from "antd";
import { EditIcon } from "@/components/icons/icnos";
import Link from "next/link";
import {
  deleteTestimonial,
  getTestimonials,
  toggleTestimonialStatus,
} from "@/redux-store/slices/testimonialSlice";
import { TestimonialItem } from "@/types/testimonials";
import Image from "next/image";

const TestimonialsTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.testimonials,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [reviewId, setReviewId] = useState<number>(0);
  useEffect(() => {
    dispatch(
      getTestimonials({
        limit,
        page,
      }),
    );
  }, [dispatch, limit, page]);

  if (loading) return <Loader />;
  if (error) message.error(error);

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex flex-wrap-reverse items-center justify-end">
              <Link
                href={`/admin/testimonials/create`}
                className="flex w-fit items-center gap-1 rounded-md bg-black px-2 py-1 text-white hover:!bg-black hover:!text-white dark:bg-white dark:text-black"
              >
                <PlusIcon />
                <span>Create</span>
              </Link>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                onChange={(value) => setLimit(Number(value))}
                value={limit}
                total={meta?.totalItems}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    S.N.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items?.length > 0 ? (
                  items?.map((item: TestimonialItem, index) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          href={`${item?.image?.url || "/images/broken/broken.png"}`}
                          target="_blank"
                        >
                          <div className="h-20 w-30 text-base font-medium text-gray-900">
                            <Image
                              src={`${item?.image?.url || "/images/broken/broken.png"}`}
                              alt={item?.name}
                              width={1080}
                              height={720}
                              loading="lazy"
                              className="aspect-video"
                            />
                          </div>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item?.country}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/testimonials/${item?.id}`}
                            title="Edit Team"
                          >
                            <EditIcon />
                          </Link>
                          <Popconfirm
                            title="Delete the Testimonial"
                            description="Are you sure to delete this testimonial?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() =>
                              dispatch(deleteTestimonial(item?.id))
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                              title="Delete Review"
                            >
                              <TrashIcon />
                            </button>
                          </Popconfirm>

                          <ToggleButton
                            onChange={() =>
                              dispatch(toggleTestimonialStatus(item?.id))
                            }
                            checked={item.status === 1}
                            title={
                              item.status === 1 ? "Deactivate" : "Activate"
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
                      No review found.
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
    </>
  );
};

export default TestimonialsTable;
