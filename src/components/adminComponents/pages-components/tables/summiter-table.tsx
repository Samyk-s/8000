"use client";
import React from "react";
import { Popconfirm } from "antd";
import { TrashIcon, EmailIcon, PlusIcon } from "@/assets/icons";
import Link from "next/link";
import Image from "next/image";
import Entry from "../../entry/entry";
import Pagination from "../../pagination/pagination";
import Search from "../../search/search";
import ToggleButton from "../../toggle-button/toggle-button";
import Loader from "../loader/loader";
import { useSummitter } from "@/hooks/summitter/useSummiter";
import { EditIcon } from "@/components/icons/icnos";

const SummitterTable = () => {
  const {
    items,
    loading,
    meta,
    page,
    limit,
    search,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleToggle,
    handleSendCertificate,
  } = useSummitter();

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-1">
      <div className="rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
          <div className="flex justify-end">
            <Link
              href={"/admin/summitters/create"}
              className="flex w-fit items-center gap-1 rounded-md bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
            >
              <PlusIcon />
              <span>Create</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Entry
              value={limit}
              onChange={(val) => setLimit(Number(val))}
              total={meta?.totalItems}
            />
            <Search
              placeholder="Search summiters..."
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
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Nationality
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Lead By
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Peak
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">
                        <Image
                          src={item.image?.url || "/images/broken/broken.png"}
                          alt={item.name}
                          width={1080}
                          height={720}
                          className="aspect-video"
                        />
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.nationality}</td>
                      <td className="px-6 py-4">{item.ledBy?.name}</td>
                      <td className="px-6 py-4">{item.peak}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="rounded p-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            title="Send Certificate"
                            onClick={() => handleSendCertificate(item.id)}
                          >
                            <EmailIcon />
                          </button>
                          <Link
                            href={`/admin/summitters/${item.id}`}
                            title="Edit Summitter"
                          >
                            <EditIcon />
                          </Link>
                          <Popconfirm
                            title="Delete the Summitter"
                            description="Are you sure to delete this summitter?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900">
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
                      colSpan={7}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No summitter found matching your search criteria.
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
    </div>
  );
};

export default SummitterTable;
