"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PackageTabs from "@/components/adminComponents/tabs/package-tabs";
const SeoForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/seo-form/seo-form"
    ),
);
import { PageTemplate } from "@/types/page-template";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";

const TeamSEOPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Teams", href: "/admin/teams" },
          { label: "Edit Team", href: `/admin/teams/${id}/seo` },
        ]}
        separator="/"
      />
      <Card>
        <SeoForm id={id} type={PageTemplate.TEAM} />
      </Card>
    </div>
  );
};

export default TeamSEOPage;
