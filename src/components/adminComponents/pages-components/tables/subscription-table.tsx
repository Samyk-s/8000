"use client";
import React from "react";
import { Popconfirm } from "antd";
import { TrashIcon } from "@/assets/icons";

import Pagination from "../../pagination/pagination";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Loader from "../loader/loader";
import { useSubscription } from "@/hooks/subscription/useSubscription";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewsLetterItem } from "@/types/news-letter";

const SubscriptionTable: React.FC = () => {
  const {
    items,
    loading,
    error,
    meta,
    page,
    limit,
    search,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleExport,
  } = useSubscription();

  if (loading) return <Loader />;
  if (error) console.error(error);

  return (
    <div className="min-h-screen p-1">
      <div className="rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
          <div className="flex justify-end">
            <button
              onClick={handleExport}
              className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-white"
            >
              Export
            </button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Entry
              value={limit}
              onChange={(val) => setLimit(Number(val))}
              total={meta?.totalItems}
            />
            <Search
              placeholder="Search subscribers..."
              search={search}
              onChange={(e) => handleSearch(e.target.value)}
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
                  Email
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                  text-white
                >
                  Received on
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 bg-white">
              {items && items.length > 0 ? (
                items.map((item: NewsLetterItem, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-6 py-4">{index + 1}</TableCell>
                    <TableCell className="px-6 py-4">{item.email}</TableCell>
                    <TableCell className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Popconfirm
                        title="Delete Subscriber"
                        description="Are you sure you want to delete this subscriber?"
                        onConfirm={() => handleDelete(item.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900">
                          <TrashIcon />
                        </button>
                      </Popconfirm>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No subscriber found.
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
  );
};

export default SubscriptionTable;
