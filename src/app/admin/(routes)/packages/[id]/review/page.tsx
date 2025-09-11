"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import ReviewTable from "@/components/adminComponents/pages-components/tables/reviews-table";
import { useParams } from "next/navigation";
import React from "react";

const ReviewPage = () => {
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
      <ReviewTable />
    </div>
  );
};

export default ReviewPage;
