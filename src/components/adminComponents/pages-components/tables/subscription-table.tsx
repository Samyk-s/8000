"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { TrashIcon } from "@/assets/icons";
import Pagination from "../../pagination/pagination";
import Entry from "../../entry/entry";
import Loader from "../loader/loader";
import { Button, message, Popconfirm } from "antd";
import {
  deleteNewsLetter,
  fetchNewsLetter,
  searchNewsLetter,
} from "@/redux-store/slices/newsLetterSlice";
import { NewsLetterItem } from "@/types/news-letter";
import Search from "../../search/search";
import { FileIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SubscriptionTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state.newsLetter,
  );

  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch news letter when page, limit
  useEffect(() => {
    dispatch(fetchNewsLetter({ params: { page, limit } }));
  }, [dispatch, page, limit]);
  // Delete handler
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteNewsLetter({ id }));
    },
    [dispatch],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(async () => {
      await dispatch(
        searchNewsLetter({
          params: { limit, page, search: value },
        }),
      );
    }, 300); // 300ms debounce
  };

  const handleExport = () => {
    if (!items || items.length === 0) {
      message.warning("No subscriber data to export");
      return;
    }

    // Map data to export
    const exportData = items.map((item, index) => ({
      "S.N.": index + 1,
      ID: item?.id,
      Email: item.email,
      "Received On": new Date(item?.createdAt).toLocaleString(),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

    // Write workbook and save as file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "subscribers.xlsx");
  };

  if (loading) return <Loader />;
  if (error) message.error(error);

  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex justify-end">
              <Button
                type="primary"
                className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
                onClick={handleExport}
              >
                <FileIcon size={15} />
                <span> Export</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Entry
                value={limit}
                onChange={(val) => setLimit(Number(val))}
                total={meta?.totalItems}
              />
              <Search
                placeholder="Search pages..."
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
                    Email
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
                  items.map((item: NewsLetterItem, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item?.email}</td>
                      <td className="px-6 py-4">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Popconfirm
                            title="Delete Suscriber"
                            description="Are you sure you want to delete this subscriber?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                              title="Delete Team"
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
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No subscriber found.
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
    </>
  );
};

export default SubscriptionTable;
