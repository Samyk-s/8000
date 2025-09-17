"use client";
import React from "react";
import { Popconfirm } from "antd";
import { PlusIcon, TrashIcon } from "@/assets/icons";
import Link from "next/link";
import Image from "next/image";
import Entry from "../../entry/entry";
import Pagination from "../../pagination/pagination";
import Search from "../../search/search";
import ToggleButton from "../../toggle-button/toggle-button";
import TeamTabs from "../../tabs/team-tab";
import Loader from "../loader/loader";
import { useTeams } from "@/hooks/teams/useTeam";
import { EditIcon, SeoIcon } from "@/components/icons/icnos";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamItem } from "@/types/teams";

const TeamsTable: React.FC = () => {
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
  } = useTeams();

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-1">
      <div className="rounded-lg bg-white text-gray-700 shadow-sm dark:bg-[#020D1A] dark:text-white">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-gray-200 p-6">
          <div className="flex justify-center md:justify-between">
            <TeamTabs />
            <Link
              href={"/admin/teams/create"}
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
              placeholder="Search teams..."
              search={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader
              style={{ backgroundColor: "oklch(37.9% 0.146 265.522)" }}
              className="text-white"
            >
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                  S.N.
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                  Image
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                  Name
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                  Post
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-white">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 bg-white dark:bg-[#020D1A]">
              {items && items.length > 0 ? (
                items.map((item: TeamItem, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-6 py-4">
                      <Link
                        href={item?.image?.url || "/images/broken/broken.png"}
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
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                      {item.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-6 py-4 text-base text-gray-900 dark:text-white">
                      {item.post}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-6 py-4 text-base font-medium dark:text-white">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/teams/${item.id}/seo`} title="SEO">
                          <SeoIcon />
                        </Link>
                        <Link
                          href={`/admin/teams/${item.id}`}
                          title="Edit Team"
                        >
                          <EditIcon />
                        </Link>
                        <Popconfirm
                          title="Delete the Team Member"
                          description="Are you sure to delete this member?"
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
                        <ToggleButton
                          onChange={() => handleToggle(item.id)}
                          checked={item.status === 1}
                          title={
                            item.status === 1
                              ? "Deactivate Team"
                              : "Activate Team"
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="px-6 py-8 text-center text-base text-gray-500"
                  >
                    No teams found matching your search criteria.
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

export default TeamsTable;
