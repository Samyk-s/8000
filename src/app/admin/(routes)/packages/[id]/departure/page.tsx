"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import DepartureTable from "@/components/adminComponents/pages-components/tables/departure-table";
import { useParams } from "next/navigation";
import React from "react";

const DeparturePage = () => {
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
      <DepartureTable />
    </>
  );
};

export default DeparturePage;
