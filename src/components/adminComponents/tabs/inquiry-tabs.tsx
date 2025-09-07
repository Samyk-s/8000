"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const InquiryTabs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Define all tabs with label and query param
  const tabs = [
    { label: "General", query: "general" },
    { label: "Quote", query: "quote" },
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {tabs.map((tab) => {
        const tabPath = `/admin/inquiries${tab.query ? `?type=${tab.query}` : ""}`;
        const isActive =
          pathname +
            (searchParams.toString() ? `?${searchParams.toString()}` : "") ===
          tabPath;

        return (
          <Link
            key={tab.label}
            href={tabPath}
            className={`px-4 py-1 !text-[14px] !font-semibold md:!text-[16px] ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600 hover:bg-gray-400"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default InquiryTabs;
