"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import AllReviewTable from "@/components/adminComponents/pages-components/tables/all-reviews-table";
import { useParams } from "next/navigation";
import React from "react";

const AllReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Review", href: "/admin/reviews" },
        ]}
        separator="/"
      />
      <AllReviewTable />
    </>
  );
};

export default AllReviewPage;
