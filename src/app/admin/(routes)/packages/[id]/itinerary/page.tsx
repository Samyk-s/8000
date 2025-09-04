"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import ItineraryTable from "@/components/adminComponents/pages-components/tables/itinerary-table";
import { useParams } from "next/navigation";
import React from "react";

const ItineraryPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Package", href: "/admin/packages" },
          { label: "Edit Package", href: `/admin/packages/${id}` },
        ]}
        separator="/"
      />
      <ItineraryTable />
    </>
  );
};

export default ItineraryPage;
