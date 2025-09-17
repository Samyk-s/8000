"use client";
import React from "react";
import { Popconfirm, Modal } from "antd";
import { TrashIcon } from "@/assets/icons";
import Entry from "../../entry/entry";
import Pagination from "../../pagination/pagination";
import Search from "../../search/search";
import ToggleButton from "../../toggle-button/toggle-button";
import Loader from "../loader/loader";
import ReviewView from "../../view/review-view";
import { useAllReviews } from "@/hooks/review/useAllReviews";
import { ViewIcon } from "@/components/icons/icnos";

const AllReviewTable: React.FC = () => {
  const {
    items,
    loading,
    meta,
    page,
    limit,
    search,
    reviewId,
    isModalOpen,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleToggle,
    handleOpenModal,
    handleCloseModal,
  } = useAllReviews();

  if (loading) return <Loader />;

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-2 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
            <Entry
              value={limit}
              onChange={(val) => setLimit(Number(val))}
              total={meta?.totalItems}
            />
            <Search
              placeholder="Search package..."
              search={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Package
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
                      <td className="px-6 py-4">{item.fullName}</td>
                      <td className="px-6 py-4">{item.country}</td>
                      <td className="px-6 py-4">{item.package?.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleOpenModal(item.id)}>
                            <ViewIcon />
                          </button>
                          <Popconfirm
                            title="Delete the Review"
                            description="Are you sure to delete this review?"
                            onConfirm={() => handleDelete(item.id)}
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
                            onChange={() => handleToggle(item.id)}
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
                      colSpan={5}
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
            currentPage={meta?.currentPage || 1}
            totalPages={meta?.totalPages || 1}
            itemsPerPage={limit}
            totalItems={meta?.totalItems || 0}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: 0 }}
        title="Review Details"
      >
        <ReviewView reviewId={reviewId} />
      </Modal>
    </>
  );
};

export default AllReviewTable;
