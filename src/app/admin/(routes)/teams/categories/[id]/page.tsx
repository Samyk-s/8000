"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamCategoryForm from "@/components/adminComponents/pages-components/forms/team-category-form/team-category-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { getTeamCategory } from "@/redux-store/slices/teamCategorySlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { TeamCatgoryItem } from "@/types/teams";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditTeamCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { teamCategory, loading } = useSelector(
    (state: RootState) => state.teamsCategory,
  );

  useEffect(() => {
    if (id) {
      dispatch(getTeamCategory(Number(id)));
    }
  }, [dispatch, id]);

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
