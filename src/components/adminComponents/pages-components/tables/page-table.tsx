"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { message, Popconfirm } from "antd";

import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import Loader from "../loader/loader";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import { usePage } from "@/hooks/page/usePage";
import { EditIcon, SeoIcon } from "@/components/icons/icnos";

const PageTable: React.FC = () => {
  const {
    items,
    loading,
    error,
    meta,
    search,
    page,
    limit,
    setPage,
    setLimit,
    handleSearch,
    handleDelete,
    handleToggleStatus,
  } = usePage();

  if (loading) return <Loader />;
  if (error) message.error(error);

  return (
    <div className="min-h-screen p-1">
      <div className="rounded-lg bg-white text-gray-700 shadow-sm dark:bg-[#020D1A] dark:text-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
          <div className="flex justify-end">
            <Link
              href="/admin/pages/create-page"
              className="flex w-fit items-center gap-1 rounded-md bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
            >
              <PlusIcon />
              <span>Create</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Entry
              onChange={(value) => setLimit(Number(value))}
              value={limit}
              total={meta?.totalItems}
            />
            <Search
              placeholder="Search pages..."
              search={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className="text-white"
              style={{ backgroundColor: "oklch(37.9% 0.146 265.522)" }}
            >
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  S.N.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-[#020D1A]">
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={uuidv4()}>
                    <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        href={item?.image?.url || "/images/broken/broken.png"}
                        target="_blank"
                      >
                        <div className="h-20 w-30">
                          <Image
                            src={
                              item?.image?.url || "/images/broken/broken.png"
                            }
                            alt={item?.title}
                            width={1080}
                            height={720}
                            loading="lazy"
                            className="aspect-video"
                          />
                        </div>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                      {item?.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                      {item?.page_template}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-base font-medium dark:text-white">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/pages/${item?.id}/seo`} title="SEO">
                          <SeoIcon />
                        </Link>
                        <Link
                          href={`/admin/pages/${item?.id}`}
                          title="Edit Page"
                        >
                          <EditIcon />
                        </Link>
                        <Popconfirm
                          title="Delete Page"
                          description="Are you sure you want to delete this page?"
                          onConfirm={() => handleDelete(item?.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button
                            className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                            title="Delete Page"
                          >
                            <TrashIcon />
                          </button>
                        </Popconfirm>
                        <ToggleButton
                          onChange={() => handleToggleStatus(item?.id)}
                          checked={item?.status === 1}
                          title={
                            item?.status === 1 ? "Deactive Page" : "Active Page"
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
                    No Pages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={meta?.currentPage}
          totalPages={meta?.totalPages}
          itemsPerPage={limit}
          totalItems={meta?.totalItems}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default PageTable;
