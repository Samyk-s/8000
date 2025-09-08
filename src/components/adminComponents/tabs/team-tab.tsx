"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TeamTabs = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Teams", path: "" },
    { label: "Categories", path: "categories" },
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {tabs.map((tab) => {
        // Prevent double slashes
        const tabPath = tab.path ? `/admin/teams/${tab.path}` : `/admin/teams`;

        // Active only on exact match
        const isActive = pathname === tabPath;

        return (
          <Link
            key={tab.label}
            href={tabPath}
            className={`px-4 py-1 text-sm font-semibold transition-colors md:text-base ${
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

export default TeamTabs;
