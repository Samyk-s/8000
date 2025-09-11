import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PageTable from "@/components/adminComponents/pages-components/tables/page-table";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Page",
            href: "/admin/pages",
          },
        ]}
        separator="/"
      />
      <PageTable />
    </div>
  );
};

export default Page;
