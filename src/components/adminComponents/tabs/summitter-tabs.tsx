"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const SummitterTabs = () => {
  const pathname = usePathname();
  const { id } = useParams();

  const isSummitterActive =
    pathname === "/admin/summitters" ||
    pathname === "/admin/summitters/create" ||
    (pathname.startsWith("/admin/summitters/") && id);

  const isStoriesActive = pathname.startsWith("/admin/summitters/stories");

  return (
    <div className="flex items-center border-b pb-2">
      {/* Summitter tab */}
      <Link
        href="/admin/summitters"
        className={`px-4 py-1 text-sm font-semibold transition-colors md:text-base ${
          isSummitterActive
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-600"
        }`}
      >
        Summitter
      </Link>

      {/* Stories tab */}
      <Link
        href="/admin/summitters/stories"
        className={`px-4 py-1 text-sm font-semibold transition-colors md:text-base ${
          isStoriesActive
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-600"
        }`}
      >
        Stories
      </Link>

      {/* Show Create Story button only when /summitters/[id] */}
      {pathname.startsWith("/admin/summitters/") &&
        id &&
        !pathname.endsWith("stories") && (
          <Link
            href={`/admin/summitters/${id}/create`}
            className="ml-auto bg-black px-4 py-1 text-white hover:text-white"
          >
            Create Story
          </Link>
        )}
    </div>
  );
};

export default SummitterTabs;
