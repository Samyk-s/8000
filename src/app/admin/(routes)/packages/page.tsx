"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PackageTable from "@/components/adminComponents/pages-components/tables/packages-table";
import React from "react";

const Package = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Package", href: "/admin/packages" },
        ]}
        separator="/"
      />
      <PackageTable />
    </div>
  );
};

export default Package;
