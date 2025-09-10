"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummitterTable from "@/components/adminComponents/pages-components/tables/summiter-table";
import React from "react";

const SummitterPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Summitter", href: "/admin/summitters" },
        ]}
        separator="/"
      />
      <SummitterTable />
    </div>
  );
};

export default SummitterPage;
