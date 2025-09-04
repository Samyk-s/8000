"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const PackageTabs = () => {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();

  // Define all tabs with label and path suffix
  const tabs = [
    { label: "Package", path: "" },
    { label: "Itinerary", path: "itinerary" },
    { label: "Review", path: "review" },
    { label: "SEO", path: "seo" },
    { label: "Gallery", path: "gallery" },
    { label: "Departure", path: "departure" },
  ];

  return (
    <div className="flex">
      {tabs.map((tab) => {
        const tabPath = `/admin/packages/${id}${tab.path ? `/${tab.path}` : ""}`;
        const isActive = pathname === tabPath;
        return (
          <Link
            key={tab.label}
            href={tabPath}
            className={`px-4 py-1 font-semibold ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-400 text-gray-600 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default PackageTabs;
