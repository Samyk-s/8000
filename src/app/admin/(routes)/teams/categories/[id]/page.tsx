"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamCategoryForm from "@/components/adminComponents/pages-components/forms/team-category-form/team-category-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { useTeamCategory } from "@/hooks/teams/useTeamCategory";
import { TeamCatgoryItem } from "@/types/teams";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const EditTeamCategory = () => {
  const { id } = useParams();
  const { teamCategory, loading, getTeamCategoryById } = useTeamCategory();
  useEffect(() => {
    if (id) {
      getTeamCategoryById(Number(id));
    }
  }, [id, getTeamCategoryById]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Teams", href: "/admin/teams" },
          { label: "Edit Team", href: `/admin/teams/${id}` },
        ]}
        separator="/"
      />
      <Card>
        <TeamCategoryForm teamCategory={teamCategory as TeamCatgoryItem} />
      </Card>
    </div>
  );
};

export default EditTeamCategory;
