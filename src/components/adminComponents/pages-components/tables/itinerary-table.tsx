"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useItinerary } from "@/hooks/itinererary/useItinerary";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import { Button, message, Modal, Popconfirm } from "antd";
import PackageTabs from "../../tabs/package-tabs";
import ItineraryForm from "../forms/itinerary-form/itinerary-form";
import { EditIcon } from "@/components/icons/icnos";
import Loader from "../loader/loader";

const ItineraryTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const packageId = Number(id);

  const {
    items,
    loading,
    error,
    meta,
    limit,
    search,
    isModalOpen,
    selectedItinerary,
    openModal,
    closeModal,
    handleSearch,
    handleDelete,
    handleToggleStatus,
    changePage,
    changeLimit,
    setIsModalOpen,
  } = useItinerary({ packageId });

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
                onChange={(val) => changeLimit(Number(val))}
                total={meta?.totalItems}
              />
              <Search
                placeholder="Search itinerary..."
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
                  items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.day}</td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal(item)}
                            title="Edit Itinerary"
                          >
                            <EditIcon />
                          </button>

                          <Popconfirm
                            title="Delete the Itinerary"
                            description="Are you sure to delete this itinerary?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() => handleDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900">
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
            onPageChange={changePage}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={selectedItinerary ? "Edit Itinerary" : "Add Itinerary"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: 0 }}
      >
        <ItineraryForm
          setIsModalOpen={setIsModalOpen}
          itinerary={selectedItinerary}
        />
      </Modal>
    </>
  );
};

export default ItineraryTable;
