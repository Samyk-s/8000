"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummitterStoryTable from "@/components/adminComponents/pages-components/tables/summiter-story-table";
import React from "react";

const SummitterPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Summitter", href: "/admin/summitters" },
          { label: "Stories", href: "/admin/summitters/stories" },
        ]}
        separator="/"
      />
      <SummitterStoryTable />
    </div>
  );
};

export default SummitterPage;
