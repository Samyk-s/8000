import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamForm from "@/components/adminComponents/pages-components/forms/team-form/team-form";
import { Card } from "antd";
import React from "react";

const CreateTeam = () => {
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
            label: "Create Team",
            href: "/admin/teams/create",
          },
        ]}
        separator="/"
      />
      <Card>
        <TeamForm />
      </Card>
    </div>
  );
};

export default CreateTeam;
