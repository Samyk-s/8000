"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import PackageTabs from "@/components/adminComponents/tabs/package-tabs";
import { usePackage } from "@/hooks/package/usePackage";
import { PackageItem } from "@/types/package";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
const PackageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/package-form/package-form"
    ),
);

const EditPackage: React.FC = () => {
  const { loading, currentPackage, getPackage } = usePackage();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    getPackage(Number(id));
  }, [id]);
  if (loading) return <Loader />;

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
          <PackageForm currentPackage={currentPackage as PackageItem} />
        </div>
      </Card>
    </div>
  );
};

export default EditPackage;
