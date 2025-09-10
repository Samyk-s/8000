"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummiterStoryForm from "@/components/adminComponents/pages-components/forms/summiter-story-form/summitter-story-form";

import { Card } from "antd";
import { useParams } from "next/navigation";

import React from "react";

const SummitterCreatePage = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Summitter", href: "/admin/summitters/summitters" },
          { label: "Stories", href: "/admin/summitters/stories" },
          { label: "Create Story", href: `/admin/summitters/${id}/create` },
        ]}
        separator="/"
      />

      <Card>
        <SummiterStoryForm />
      </Card>
    </div>
  );
};

export default SummitterCreatePage;
