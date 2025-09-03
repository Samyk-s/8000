import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PageForm from "@/components/adminComponents/pages-components/forms/page-form/page-form";
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
      <PageForm />
    </div>
  );
};

export default CreatePage;
