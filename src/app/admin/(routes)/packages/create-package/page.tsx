"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import { Card } from "antd";
import dynamic from "next/dynamic";
import React from "react";
const PackageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/package-form/package-form"
    ),
);

const CreatePackage: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Package", href: "/admin/packages" },
          { label: "Create Package", href: `/admin/packages/create-page` },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <PackageForm />
        </div>
      </Card>
    </div>
  );
};

export default CreatePackage;
