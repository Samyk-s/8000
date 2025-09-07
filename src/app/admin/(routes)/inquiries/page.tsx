"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import IquiryTable from "@/components/adminComponents/pages-components/tables/inquiry-tabe";
import React from "react";

const InquiryPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Inquiry", href: "/admin/inquiries" },
        ]}
        separator="/"
      />
      <IquiryTable />
    </>
  );
};

export default InquiryPage;
