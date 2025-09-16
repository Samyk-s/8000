import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PlanMyTripTable from "@/components/adminComponents/pages-components/tables/plan-my-trip-table";
import TeamsTable from "@/components/adminComponents/pages-components/tables/teams-table";
import React from "react";

const PlanMyTripPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Plan My Trip",
            href: "/admin/tri-plans",
          },
        ]}
        separator="/"
      />
      <PlanMyTripTable />
    </div>
  );
};

export default PlanMyTripPage;
