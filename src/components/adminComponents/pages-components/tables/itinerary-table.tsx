"use client";
import React, { useEffect, useState } from "react";
import { EditIcon } from "@/components/icons/icnos";
import Link from "next/link";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { togglePackageStatus } from "@/redux-store/slices/packageSlice";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import Loader from "../loader/loader";
import {
  Alert,
  Button,
  message,
  Modal,
  Popconfirm,
  PopconfirmProps,
} from "antd";
import { fetchItineraries } from "@/redux-store/slices/itinerarySlice";
import { ItineraryItem } from "@/types/itinerary";
import PackageTabs from "../../tabs/package-tabs";
import ItineraryForm from "../forms/itinerary-form/itinerary-form";

const { confirm } = Modal;

const ItineraryTable: React.FC = () => {
  const [value, setValue] = useState(10);
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.itineraries,
  );

  const [currentPage, setCurrentPage] = useState(meta?.currentPage);
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = Math.ceil(meta?.totalPages / meta?.itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Call API for getting itineraries
  useEffect(() => {
    dispatch(fetchItineraries({ id: 1, params: { limit: 10, page: 1 } }));
  }, [dispatch]);

  // Handle delete with confirmation modal
  const handleDelete = (id: number) => {};

  function handleSearchPackage(value: string | number) {
    setValue(Number(value));
  }

  // Close create/edit modal
  const handleClose = () => setIsModalOpen(false);
  // delete itenerary
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  if (loading) return <Loader />;
  if (error) message.error(error);

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex items-center justify-center gap-3 md:justify-between">
              <PackageTabs />
              <Button
                className="flex w-fit items-center gap-1 rounded-md bg-black px-2 py-1 text-white hover:!bg-black hover:!text-white dark:bg-white dark:text-black"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon />
                <span>Create</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                onChange={(value) => handleSearchPackage(value)}
                value={value}
              />
              <Search placeholder="Search package..." />
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
                {items && items.length > 0 ? (
                  items.map((item: ItineraryItem, index) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item.day}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base font-medium text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/packages/${item.id}`}
                            title="Edit Package"
                          >
                            <EditIcon />
                          </Link>
                          <Popconfirm
                            title="Delete the Itineary"
                            description="Are you sure to delete this itineary?"
                            onConfirm={confirm}
                            onCancel={cancel}
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

                          <ToggleButton
                            onChange={() =>
                              dispatch(togglePackageStatus(item.id))
                            }
                            checked={item.status === 1}
                            title={
                              item.status === 1
                                ? "Deactivate Package"
                                : "Activate Package"
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

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={meta?.itemsPerPage}
            totalItems={meta?.totalItems}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        title="Add Itinerary"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={window.innerWidth >= 768 ? 800 : 400}
        style={{ maxWidth: "90%", padding: "20px" }}
      >
        <ItineraryForm />
      </Modal>
    </>
  );
};

export default ItineraryTable;
