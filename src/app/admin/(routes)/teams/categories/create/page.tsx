import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamCategoryForm from "@/components/adminComponents/pages-components/forms/team-category-form/team-category-form";
import { Card } from "antd";
import React from "react";

const CreateTeamCategory = () => {
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
          {
            label: "Category",
            href: "/admin/teams/categories",
          },
          {
            label: "Create Category",
            href: "/admin/teams/categories/create",
          },
        ]}
        separator="/"
      />
      <Card>
        <TeamCategoryForm />
      </Card>
    </div>
  );
};

export default CreateTeamCategory;
