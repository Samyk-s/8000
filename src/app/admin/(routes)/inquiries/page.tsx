"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import IquiryTable from "@/components/adminComponents/pages-components/tables/inquiry-table";
import React from "react";

const InquiryPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Inquiry", href: "/admin/inquiries" },
        ]}
        separator="/"
      />
      <IquiryTable />
    </div>
  );
};

export default InquiryPage;
