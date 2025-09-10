"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummiterForm from "@/components/adminComponents/pages-components/forms/summitter-form/summitter-form";
import { Card } from "antd";
import { useParams } from "next/navigation";

import React from "react";

const SummitterStoryCreatePage = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Summitter", href: "/admin/summitters" },
          { label: "Create Summitter", href: "/admin/summitters/create" },
        ]}
        separator="/"
      />

      <Card>
        <SummiterForm />
      </Card>
    </div>
  );
};

export default SummitterStoryCreatePage;
