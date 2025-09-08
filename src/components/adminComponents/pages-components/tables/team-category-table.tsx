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
import { PlusIcon } from "@/assets/icons";
import { v4 as uuidv4 } from "uuid";
import { togglePageStatus } from "@/redux-store/slices/pageSlice";
import Loader from "../loader/loader";
import { message } from "antd";
import { TeamCatgoryItem } from "@/types/teams";
import {
  fetchTeamsCategories,
  searchTeamCategory,
} from "@/redux-store/slices/teamCategorySlice";
import TeamTabs from "../../tabs/team-tab";

const TeamCategoryTable: React.FC = () => {
  const { items, loading, error, meta } = useSelector(
    (state: RootState) => state?.teamsCategory,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  // call api for getting packages
  useEffect(() => {
    dispatch(
      fetchTeamsCategories({
        params: {
          limit,
          page,
        },
      }),
    );
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
        searchTeamCategory({
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
            <div className="flex justify-center md:justify-between">
              <TeamTabs />
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Slug
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:bg-[#020D1A]">
                {items && items?.length > 0 ? (
                  items?.map((item: TeamCatgoryItem, index) => (
                    <tr key={uuidv4()}>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                        {item?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                        {item?.slug}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-base font-medium dark:text-white">
                        <div className="flex space-x-2">
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
                      No Pages found matching your search criteria.
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

export default TeamCategoryTable;
