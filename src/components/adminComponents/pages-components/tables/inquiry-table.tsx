"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  fetchInquiries,
  deleteInquiry,
} from "@/redux-store/slices/inquirySlice";
import { InquiryItem } from "@/types/inquiry";
import InquiryView from "../../view/inquiry-view";
import InquiryTabs from "../../tabs/inquiry-tabs";
import { TrashIcon } from "@/assets/icons";
import Pagination from "../../pagination/pagination";
import Entry from "../../entry/entry";
import Loader from "../loader/loader";
import { Button, message, Modal, Popconfirm } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { ViewIcon } from "@/components/icons/icnos";

const InquiryTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.inquiries,
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Set default query param once
  useEffect(() => {
    const type = searchParams.get("type") || "general";
    if (!searchParams.get("type")) {
      router.replace(`/admin/inquiries?type=${type}`);
    }
  }, [router, searchParams]);

  // Fetch inquiries when page, limit or search changes
  useEffect(() => {
    const type = searchParams.get("type") || "general";
    dispatch(fetchInquiries({ params: { page, limit, search: type } }));
  }, [dispatch, page, limit, searchParams]);

  // Search handler with debounce
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        dispatch(fetchInquiries({ params: { page, limit, search: value } }));
      }, 300);
    },
    [dispatch, page, limit],
  );

  // Delete handler
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteInquiry({ id }));
    },
    [dispatch],
  );

  // Open modal handler
  const handleOpenModal = useCallback((id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }, []);

  // Close modal handler
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedId(0);
  }, []);

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
              {/* <Search
                placeholder="Search inquiries..."
                search={search}
                onChange={handleSearch}
              /> */}
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Received on
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items.length > 0 ? (
                  items.map((item: InquiryItem, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.phoneNumber}</td>
                      <td className="px-6 py-4">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleOpenModal(item.id)}>
                            <ViewIcon />
                          </button>

                          <Popconfirm
                            title="Delete Inquiry"
                            description="Are you sure you want to delete this inquiry?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger>
                              <TrashIcon />
                            </Button>
                          </Popconfirm>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No inquiries found.
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

      {/* View Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={800}
        style={{ maxWidth: "90%", padding: 0 }}
        title="Inquiry Details"
      >
        {selectedId > 0 && <InquiryView id={selectedId} />}
      </Modal>
    </>
  );
};

export default InquiryTable;
