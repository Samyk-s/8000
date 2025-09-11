"use client";

import { BlogCategory } from "@/types/enum/enum";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const BlogTabs = () => {
  const searchParams = useSearchParams();

  // Define all tabs with label and query param
  const tabs = [
    {
      label: BlogCategory.NEWS_AND_EVENTS,
      query: BlogCategory.NEWS_AND_EVENTS,
    },
    {
      label: BlogCategory.CSR,
      query: BlogCategory.CSR,
    },
  ];

  // Get current active query
  const currentQuery = searchParams.get("type") || "";

  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {tabs.map((tab) => {
        // Encode query for URL
        const tabPath = `/admin/blogs${tab.query ? `?type=${encodeURIComponent(tab.query)}` : ""}`;

        // Determine if the tab is active
        const isActive = currentQuery === tab.query;

        // Determine text transform
        const textTransform =
          tab.query.toLowerCase() === "csr" ? "uppercase" : "capitalize";

        return (
          <Link
            key={tab.label}
            href={tabPath}
            className={`px-4 py-1 !text-[14px] !font-semibold md:!text-[16px] ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600 hover:bg-gray-400"
            } ${textTransform}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default BlogTabs;
