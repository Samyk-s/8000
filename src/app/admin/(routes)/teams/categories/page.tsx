import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamCategoryTable from "@/components/adminComponents/pages-components/tables/team-category-table";
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
            label: "Categoris",
            href: "/admin/teams/categories",
          },
        ]}
        separator="/"
      />
      <TeamCategoryTable />
    </div>
  );
};

export default TeamCategoryPage;
