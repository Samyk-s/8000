import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import DestinationTable from "@/components/adminComponents/pages-components/tables/destination-table";
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
            label: "Destination",
            href: "/admin/destinations",
          },
        ]}
        separator="/"
      />
      <DestinationTable />
    </div>
  );
};

export default DestinationPage;
