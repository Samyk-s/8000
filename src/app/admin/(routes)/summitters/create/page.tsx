"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummiterForm from "@/components/adminComponents/pages-components/forms/summitter-form/summitter-form";
import { Card } from "antd";

import React from "react";

const SummitterCreatePage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
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

export default SummitterCreatePage;
