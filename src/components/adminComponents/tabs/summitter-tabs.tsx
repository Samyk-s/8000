"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SummitterTabs = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Summiter", path: "" }, // base path
    { label: "Story", path: "story" },
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {tabs.map((tab) => {
        const tabPath = tab.path ? `/story` : "";
        const isActive =
          (tab.path === "" && !pathname?.includes("/story")) ||
          (tab.path !== "" && pathname?.endsWith(tab.path));

        return (
          <Link
            key={tab.label}
            href={tabPath}
            className={`px-4 py-1 !text-[14px] !font-semibold md:!text-[16px] ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SummitterTabs;
