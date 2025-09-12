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

const CreateDestination = () => {
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
            label: "Destination",
            href: "/admin/destinations",
          },
          {
            label: "Create Destination",
            href: "/admin/destinations/create-page",
          },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <PageTabs title="Destination" path="destinations" />
          <PageForm />
        </div>
      </Card>
    </div>
  );
};

export default CreateDestination;
