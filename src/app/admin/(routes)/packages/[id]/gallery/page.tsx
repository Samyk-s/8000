"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import dynamic from "next/dynamic";
const GalleryTable = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/tables/gallery-table"
    ),
);
import { useParams } from "next/navigation";
import React from "react";

const GalleryPage = () => {
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
      <GalleryTable />
    </>
  );
};

export default GalleryPage;
