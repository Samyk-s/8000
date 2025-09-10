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
import PackageTabs from "../../tabs/package-tabs";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  deleteAddon,
  fetchAddons,
  searchAddons,
  toggleAddonStatus,
} from "@/redux-store/slices/addonSlice";
import { AddOnItem } from "@/types/addOns";
const DepartureForm = dynamic(
  () => import("../forms/departure-form/departure-form"),
  { ssr: false },
);

const AddOnsTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.addons,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(
      fetchAddons({
        id: Number(id),
        params: { limit: limit, page: page },
      }),
    );
  }, [dispatch, id, limit, page]);

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // search addons
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
        searchAddons({
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
              <PackageTabs />
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
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Price
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items?.length > 0 ? (
                  items?.map((item: AddOnItem, index) => (
                    <tr key={item?.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item?.title}</td>
                      <td className="px-6 py-4">{item?.price}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Popconfirm
                            title="Delete the Addon"
                            description="Are you sure to delete this addon?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() =>
                              dispatch(
                                deleteAddon({
                                  packageId: Number(id),
                                  addonId: Number(item?.id),
                                }),
                              )
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                              title="Delete AddOn"
                            >
                              <TrashIcon />
                            </button>
                          </Popconfirm>

                          <ToggleButton
                            onChange={() =>
                              dispatch(
                                toggleAddonStatus({
                                  packageId: Number(id),
                                  addonId: Number(item?.id),
                                }),
                              )
                            }
                            checked={item?.status === 1}
                            title={
                              item?.status === 1 ? "Deactivate" : "Activate"
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
                      No Addons found.
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
        title={"Add Departure"}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: "0" }}
      >
        <Suspense fallback={null}>
          <DepartureForm setIsModalOpen={setIsModalOpen} />
        </Suspense>
      </Modal>
    </>
  );
};

export default AddOnsTable;
