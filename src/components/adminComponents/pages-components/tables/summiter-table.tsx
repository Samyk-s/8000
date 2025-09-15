"use client";
import React, { useEffect, useRef, useState } from "react";
import { EditIcon } from "@/components/icons/icnos";
import Image from "next/image";
import Link from "next/link";
import Entry from "../../entry/entry";
import Pagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import ToggleButton from "../../toggle-button/toggle-button";
import { EmailIcon, PlusIcon, TrashIcon } from "@/assets/icons";
import Loader from "../loader/loader";
import { message, Popconfirm } from "antd";
import {
  deleteSummiter,
  fetchSummitters,
  searchSummitters,
  toggleSummiter,
} from "@/redux-store/slices/summiterSlice";
import { SummitterItem } from "@/types/summitter";
import summittterApi from "@/lib/api/summitterApi";
import Search from "../../search/search";

const SummitterTable = () => {
  const [limit, setLimit] = useState(10);
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.summiter,
  );
  const [page, setPage] = useState(meta?.currentPage);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // call api for getting summiters
  useEffect(() => {
    dispatch(fetchSummitters({ page, limit }));
  }, [dispatch, limit, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(async () => {
      await dispatch(searchSummitters({ limit, page, search: value }));
    }, 300); // 300ms debounce
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    message.error(error);
  }

  return (
    <div className="min-h-screen p-1">
      <div className="rounded-lg bg-white shadow-sm">
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
                {items && items?.length > 0 ? (
                  items?.map((item: SummitterItem, index) => (
                    <tr key={item?.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          href={`${item?.image?.url || "/images/broken/broken.png"}`}
                          target="_blank"
                        >
                          <div className="h-20 w-30 text-base font-medium text-gray-900">
                            <Image
                              src={
                                item?.image?.url || "/images/broken/broken.png"
                              }
                              alt={item?.name}
                              width={1080}
                              height={720}
                              className="aspect-video"
                            />
                          </div>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900">
                        {item?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base text-gray-600">
                          {item?.nationality}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base text-gray-500">
                          {item?.ledBy?.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-base text-gray-500">
                          {item?.peak}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-base font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            className="rounded p-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            title="Send Certificate"
                            onClick={async () => {
                              try {
                                const res =
                                  await summittterApi.summitterCertificate(
                                    item?.id,
                                  );
                                message.success(res.message);
                              } catch (error: any) {
                                message.error(error.message);
                              }
                            }}
                          >
                            <EmailIcon />
                          </button>
                          <Link
                            href={`/admin/summitters/${item?.id}`}
                            title="Edit Summitter"
                          >
                            <EditIcon />
                          </Link>
                          <Popconfirm
                            title="Delete the Summitter"
                            description="Are you sure to delete this summitter?"
                            onCancel={() => message.error("Cancelled")}
                            onConfirm={() => dispatch(deleteSummiter(item?.id))}
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
                          <ToggleButton
                            onChange={() => {
                              dispatch(toggleSummiter(item?.id));
                            }}
                            checked={item?.status === 1 ? true : false}
                            title={item?.status === 1 ? "Deactive" : "Active "}
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
                      No summiter found matching your search criteria.
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
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default SummitterTable;
