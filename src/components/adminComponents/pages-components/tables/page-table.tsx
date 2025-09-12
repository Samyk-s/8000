"use client";
import React, { useEffect, useRef, useState } from "react";
import { EditIcon, GalleryIcon, SeoIcon } from "@/components/icons/icnos";
import Image from "next/image";
import Link from "next/link";
import Entry from "../../entry/entry";
import Search from "../../search/search";
import Pagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import ToggleButton from "../../toggle-button/toggle-button";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import { v4 as uuidv4 } from "uuid";

import {
  deletePage,
  fetchPages,
  searchPages,
  togglePageStatus,
} from "@/redux-store/slices/pageSlice";
import { PageItem } from "@/types/page";
import Loader from "../loader/loader";
import { message, Popconfirm } from "antd";

const PageTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.pages,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  // call api for getting packages
  useEffect(() => {
    dispatch(fetchPages({ page: page, limit: limit }));
  }, [dispatch, page, limit]);

  // search page
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
        searchPages({
          params: { limit, page, search: value },
        }),
      );
    }, 300); // 300ms debounce
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    message.error(error);
  }
  return (
    <>
      <div className="min-h-screen p-1">
        <div className="rounded-lg bg-white text-gray-700 shadow-sm dark:bg-[#020D1A] dark:text-white">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
            <div className="flex justify-end">
              <Link
                href={"/admin/pages/create-page"}
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
                onChange={handleSearch}
              />
            </div>
          </div>

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
                {items && items?.length > 0 ? (
                  items?.map((item: PageItem, index) => (
                    <tr key={uuidv4()}>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          href={`${item?.image?.url || "/images/broken/broken.png"}`}
                          target="_blank"
                        >
                          <div className="h-20 w-30 text-base font-medium text-gray-900">
                            <Image
                              src={`${item?.image?.url || "/images/broken/broken.png"}`}
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
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base text-gray-900 dark:text-white">
                          {item?.page_template}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-base font-medium dark:text-white">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/pages/${item?.id}/seo`}
                            title="SEO"
                          >
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
                            onConfirm={() => dispatch(deletePage(item?.id))}
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
                          <ToggleButton
                            onChange={() => {
                              dispatch(togglePageStatus(item?.id));
                            }}
                            checked={item?.status === 1 ? true : false}
                            title={
                              item?.status === 1
                                ? "Deactive Package"
                                : "Active Package"
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
                      No Pages found .
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
    </>
  );
};

export default PageTable;
