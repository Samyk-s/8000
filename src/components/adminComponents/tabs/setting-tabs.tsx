"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SettingTabs = () => {
  const pathname = usePathname();

  // Define all tabs with label and path suffix
  const tabs = [
    { label: "Setting", path: "" },
    { label: "SEO", path: "seo" },
  ];

  return (
    <div className="flex flex-wrap">
      {tabs.map((tab) => {
        const tabPath = `/admin/site-setting${tab.path ? `/${tab.path}` : ""}`;

        // Normalize by removing trailing slash
        const normalize = (p: string) => p.replace(/\/$/, "");
        const isActive = normalize(pathname) === normalize(tabPath);

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

export default SettingTabs;
