import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PageTabs from "@/components/adminComponents/tabs/page-tabs";
import { Card } from "antd";
import React from "react";

const CreatePage = () => {
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
            label: "Page",
            href: "/admin/pages",
          },
          {
            label: "Create Page",
            href: "/admin/pages/create-page",
          },
        ]}
        separator="/"
      />
      <Card>
        <PageTabs />
      </Card>
    </div>
  );
};

export default CreatePage;
