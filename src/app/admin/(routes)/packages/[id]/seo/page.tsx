"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PackageTabs from "@/components/adminComponents/tabs/package-tabs";
const SeoForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/seo-form/seo-form"
    ),
);
import { PageTemplate } from "@/types/page-template";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";

const PackageSEOPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Package", href: "/admin/packages" },
          { label: "Edit Package", href: `/admin/packages/${id}` },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <PackageTabs />
          <SeoForm id={id} type={PageTemplate.PAGE} />
        </div>
      </Card>
    </div>
  );
};

export default PackageSEOPage;
