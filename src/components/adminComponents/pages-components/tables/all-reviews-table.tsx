"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import Loader from "../loader/loader";
import { Button, message, Modal, Popconfirm } from "antd";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  deleteReview,
  getAllReviews,
  searchReviews,
  toggleReviewStatus,
} from "@/redux-store/slices/reviewSlice";
import { ReviewItem } from "@/types/packge-review";
import { EditIcon, ViewIcon } from "@/components/icons/icnos";
const ReviewForm = dynamic(() => import("../forms/review-form/review-form"), {
  ssr: false,
});

const AllReviewTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.packgeReviews,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useState<ReviewItem | null>(null); // 👈 NEW
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    dispatch(
      getAllReviews({
        params: {
          limit: limit,
          page: page,
        },
      }),
    );
  }, [dispatch, id, limit, page]);

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // search itinerary
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
        searchReviews({
          params: { limit, page, search: value },
        }),
      );
    }, 300); // 300ms debounce
  };

  if (loading) return <Loader />;
  if (error) message.error(error);

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex flex-wrap-reverse items-center justify-end gap-3">
              <Button
                className="flex w-fit items-center gap-1 rounded-md bg-black px-2 py-1 text-white hover:!bg-black hover:!text-white dark:bg-white dark:text-black"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <PlusIcon />
                <span>Create</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                onChange={(value) => setLimit(Number(value))}
                value={limit}
                total={meta?.totalItems}
              />
              <Search
                placeholder="Search package..."
                search={search}
                onChange={handleSearch}
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
                  {/* <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Image
                  </th> */}
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    package
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items?.length > 0 ? (
                  items?.map((item: ReviewItem, index) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      {/* <td className="whitespace-nowrap px-6 py-4">
                        <Link href={item?.file?.url} target="_blank">
                          <div className="h-20 w-30 text-base font-medium text-gray-900">
                            <Image
                              src={item?.file?.url}
                              alt={item?.alt}
                              width={1080}
                              height={720}
                              className="aspect-video"
                            />
                          </div>
                        </Link>
                      </td> */}
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item?.fullName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item?.country}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item?.package?.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/pages/${item?.id}`}
                            title="Edit Page"
                          >
                            <EditIcon />
                          </Link>
                          <Popconfirm
                            title="Delete the Review"
                            description="Are you sure to delete this review?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() =>
                              dispatch(
                                deleteReview({
                                  id: item?.id,
                                }),
                              )
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <button className="rounded p-1" title="View Review">
                              <ViewIcon />
                            </button>
                            <button
                              className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                              title="Delete Review"
                            >
                              <TrashIcon />
                            </button>
                          </Popconfirm>

                          <ToggleButton
                            onChange={() =>
                              dispatch(
                                toggleReviewStatus({
                                  id: item?.id,
                                }),
                              )
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

      {/* Create / Edit Modal */}
      <Modal
        title="Add Review"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: "0" }}
      >
        <Suspense fallback={null}>
          <ReviewForm setIsModalOpen={setIsModalOpen} />
        </Suspense>
      </Modal>
    </>
  );
};

export default AllReviewTable;
