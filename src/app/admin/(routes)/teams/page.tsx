import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamsTable from "@/components/adminComponents/pages-components/tables/teams-table";
import React from "react";

const TeamCategoryPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Teams",
            href: "/admin/teams",
          },
        ]}
        separator="/"
      />
      <TeamsTable />
    </div>
  );
};

export default TeamCategoryPage;
