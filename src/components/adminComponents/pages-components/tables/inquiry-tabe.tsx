"use client";
import React, { useEffect, useRef, useState } from "react";
import { EditIcon } from "@/components/icons/icnos";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import Loader from "../loader/loader";
import { Button, message, Modal, Popconfirm } from "antd";
import {
  deleteItinerary,
  fetchItineraries,
  searchItineraries,
  toggleItineraryStatus,
} from "@/redux-store/slices/itinerarySlice";
import { ItineraryItem } from "@/types/itinerary";
import ItineraryForm from "../forms/itinerary-form/itinerary-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import InquiryTabs from "../../tabs/inquiry-tabs";
import { fetchInquiries } from "@/redux-store/slices/inquirySlice";
import { InquiryItem } from "@/types/inquiry";

const IquiryTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.inquiries,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get("type")) {
      // Add default query param
      router.replace("/admin/inquiries?type=general");
    }
    dispatch(
      fetchInquiries({
        params: { limit: limit, page: page, search: "general" },
      }),
    );
  }, [dispatch, id, limit, page, router, searchParams]);

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
        searchItineraries({
          id: Number(id),
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
            <div className="flex flex-wrap-reverse items-center justify-center gap-3 md:justify-between">
              <InquiryTabs />
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
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items?.length > 0 ? (
                  items?.map((item: InquiryItem, index) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item?.name}</td>
                      <td className="px-6 py-4">{item?.email}</td>
                      <td className="px-6 py-4">{item?.phoneNumber}</td>
                      <td className="px-6 py-4">{item?.createdAt}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                            }}
                            title="Edit Itinerary"
                          >
                            <EditIcon />
                          </button>

                          <Popconfirm
                            title="Delete the Itinerary"
                            description="Are you sure to delete this itinerary?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() =>
                              dispatch(
                                deleteItinerary({
                                  packageId: Number(id),
                                  itineraryId: Number(item?.id),
                                }),
                              )
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                              title="Delete Itinerary"
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
                      No itineraries found.
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
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: "0" }}
      >
        <ItineraryForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default IquiryTable;
