"use client";
import dynamic from "next/dynamic";
import React from "react";
const PackageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/package-form/package-form"
    ),
);

const CreatePackage: React.FC = () => {
  const onFinish = (values: { title: string }) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen">
      <PackageForm />
    </div>
  );
};

export default CreatePackage;
