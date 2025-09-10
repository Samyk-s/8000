"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummiterStoryForm from "@/components/adminComponents/pages-components/forms/summiter-story-form/summitter-story-form";
import { Card } from "antd";
import { useParams } from "next/navigation";

import React from "react";
const { id } = useParams();

const EditSummitterStroyPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Summitter", href: "/admin/summitters" },
          { label: "Stories", href: "/admin/summitters/stories" },
          { label: "Edit Story", href: `/admin/summitters/stories/${id}` },
        ]}
        separator="/"
      />

      <Card>{/* <SummiterStoryForm /> */}</Card>
    </div>
  );
};

export default EditSummitterStroyPage;
