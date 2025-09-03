"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PackageTable from "@/components/adminComponents/pages-components/tables/packages-table";
import React from "react";

const Package = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Package", href: "/admin/packages" },
        ]}
        separator="/"
      />
      <PackageTable />;
    </>
  );
};

export default Package;
