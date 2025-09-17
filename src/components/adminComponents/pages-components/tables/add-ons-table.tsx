"use client";
import React, { Suspense } from "react";
import { useAddons } from "@/hooks/addon/useAddon";
import Loader from "../loader/loader";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import { Button, message, Modal, Popconfirm } from "antd";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import PackageTabs from "../../tabs/package-tabs";
import { EditIcon } from "@/components/icons/icnos";

const AddOnForm = dynamic(() => import("../forms/add-on-form/add-on-form"));

const AddOnsTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const packageId = Number(id);

  const {
    items,
    loading,
    error,
    meta,
    limit,
    search,
    selectedAddon,
    isModalOpen,
    handleSearch,
    openModal,
    closeModal,
    handleDelete,
    handleToggleStatus,
    changePage,
    changeLimit,
  } = useAddons(packageId);

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
                onClick={() => openModal()}
              >
                <PlusIcon />
                <span>Create</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                value={limit}
                onChange={(value: string | number) =>
                  changeLimit(Number(value))
                }
                total={meta?.totalItems}
              />
              <Search
                placeholder="Search package..."
                search={search}
                onChange={(e) => handleSearch(e.target.value)}
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
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="rounded p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-900"
                            title="Edit AddOn"
                            onClick={() => openModal(item)}
                          >
                            <EditIcon />
                          </button>
                          <Popconfirm
                            title="Delete the Addon"
                            description="Are you sure to delete this addon?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() => handleDelete(item.id)}
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
                            onChange={() => handleToggleStatus(item.id)}
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
            onPageChange={changePage}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        title={selectedAddon ? "Edit Addon" : "Add Addon"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: 0 }}
      >
        <Suspense fallback={null}>
          <AddOnForm onClose={closeModal} addon={selectedAddon} />
        </Suspense>
      </Modal>
    </>
  );
};

export default AddOnsTable;
