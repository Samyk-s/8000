import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import ActivityTable from "@/components/adminComponents/pages-components/tables/activities-table";
import React from "react";

const DestinationPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Activity",
            href: "/admin/activities",
          },
        ]}
        separator="/"
      />
      <ActivityTable />
    </div>
  );
};

export default DestinationPage;
