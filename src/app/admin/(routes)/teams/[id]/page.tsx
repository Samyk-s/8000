"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TeamForm from "@/components/adminComponents/pages-components/forms/team-form/team-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { getTeam } from "@/redux-store/slices/teamSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { TeamItem } from "@/types/teams";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditTeam = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { team, loading } = useSelector((state: RootState) => state.teams);
  useEffect(() => {
    if (id) {
      dispatch(getTeam(Number(id)));
    }
  }, [dispatch, id]);
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
