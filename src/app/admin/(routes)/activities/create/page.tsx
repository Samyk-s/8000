import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PageTabs from "@/components/adminComponents/tabs/page-tabs";
import { Card } from "antd";
import dynamic from "next/dynamic";
const PageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/page-form/page-form"
    ),
);
import React from "react";

const CreateActivity = () => {
  return (
    <div className="flex flex-col gap-3">
      {" "}
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Activity",
            href: "/admin/activities",
          },
          {
            label: "Create Activity",
            href: "/admin/activities/create-page",
          },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <PageTabs title="Acitvity" path="activities" />
          <PageForm />
        </div>
      </Card>
    </div>
  );
};

export default CreateActivity;
