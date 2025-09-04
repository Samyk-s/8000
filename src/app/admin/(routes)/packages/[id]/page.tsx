"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PackageTabs from "@/components/adminComponents/tabs/package-tabs";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";
const PackageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/package-form/package-form"
    ),
);

const EditPackage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const onFinish = (values: { title: string }) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Page", href: "/admin/pages" },
          { label: "Edit Page", href: `/admin/pages/${id}/edit` },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <PackageTabs id={id as string} />
          <PackageForm />
        </div>
      </Card>
    </div>
  );
};

export default EditPackage;
