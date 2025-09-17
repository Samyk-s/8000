"use client";

import React, { Suspense } from "react";
import { TrashIcon } from "@/assets/icons";
import { ViewIcon } from "@/components/icons/icnos";
import { Modal, Popconfirm, message } from "antd";
import Pagination from "../../pagination/pagination";
import Entry from "../../entry/entry";
import Loader from "../loader/loader";
const InquiryView = dynamic(() => import("../../view/inquiry-view"));
import InquiryTabs from "../../tabs/inquiry-tabs";
import Search from "../../search/search";
import { useInquiry } from "@/hooks/inquiry/useInquiry";
import dynamic from "next/dynamic";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InquiryItem } from "@/types/inquiry";

const InquiryTable: React.FC = () => {
  const {
    items,
    loading,
    error,
    meta,
    page,
    setPage,
    limit,
    setLimit,
    search,
    handleSearch,
    handleDelete,
    isModalOpen,
    selectedId,
    openModal,
    closeModal,
  } = useInquiry();

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
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                value={limit}
                onChange={(val) => setLimit(Number(val))}
                total={meta?.totalItems}
              />
              <Search
                placeholder="Search inquiries..."
                search={search}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-blue-900 text-white">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    S.N.
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Name
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Email
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Phone
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Received on
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 bg-white">
                {items && items.length > 0 ? (
                  items.map((item: InquiryItem, index: number) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-6 py-4">{index + 1}</TableCell>
                      <TableCell className="px-6 py-4">{item.name}</TableCell>
                      <TableCell className="px-6 py-4">{item.email}</TableCell>
                      <TableCell className="px-6 py-4">
                        {item.phoneNumber}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => openModal(item.id)}>
                            <ViewIcon />
                          </button>
                          <Popconfirm
                            title="Delete Inquiry"
                            description="Are you sure you want to delete this inquiry?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                              title="Delete inquiry"
                            >
                              <TrashIcon />
                            </button>
                          </Popconfirm>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No inquiries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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

      {/* View Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: 0 }}
        title="Inquiry Details"
      >
        {selectedId && (
          <Suspense fallback={<Loader />}>
            <InquiryView id={selectedId} />
          </Suspense>
        )}
      </Modal>
    </>
  );
};

export default InquiryTable;
