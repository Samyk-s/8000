"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import AllReviewTable from "@/components/adminComponents/pages-components/tables/all-reviews-table";
import React from "react";

const AllReviewPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Review", href: "/admin/reviews" },
        ]}
        separator="/"
      />
      <AllReviewTable />
    </div>
  );
};

export default AllReviewPage;
