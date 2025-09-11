"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import ItineraryTable from "@/components/adminComponents/pages-components/tables/itinerary-table";
import { useParams } from "next/navigation";
import React from "react";

const ItineraryPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Package", href: "/admin/packages" },
          { label: "Edit Package", href: `/admin/packages/${id}` },
        ]}
        separator="/"
      />
      <ItineraryTable />
    </div>
  );
};

export default ItineraryPage;
