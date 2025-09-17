"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamForm from "@/components/adminComponents/pages-components/forms/team-form/team-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { useTeams } from "@/hooks/teams/useTeam";
import { TeamItem } from "@/types/teams";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const EditTeam = () => {
  const { id } = useParams();
  const { team, loading, getTeamByid } = useTeams();
  useEffect(() => {
    if (id) {
      getTeamByid(Number(id));
    }
  }, [id, getTeamByid]);
  if (loading) return <Loader />;
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
            label: "Edit Team",
            href: `/admin/teams/${id}`,
          },
        ]}
        separator="/"
      />
      <Card>
        <TeamForm team={team as TeamItem} />
      </Card>
    </div>
  );
};

export default EditTeam;
