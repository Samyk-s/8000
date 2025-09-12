"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import PackageTabs from "@/components/adminComponents/tabs/package-tabs";
import { getPacakgeById } from "@/redux-store/slices/packageSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { PackageItem } from "@/types/package";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const PackageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/package-form/package-form"
    ),
);

const EditPackage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, currentPackage } = useSelector(
    (state: RootState) => state.packges,
  );

  useEffect(() => {
    dispatch(getPacakgeById(Number(id)));
  }, [id, dispatch]);

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
