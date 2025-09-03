import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PageTable from "@/components/adminComponents/pages-components/tables/page-table";
import React from "react";

const Page = () => {
  return (
    <div>
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
