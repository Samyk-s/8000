"use client";
import React from "react";
import CreatePackageForm from "@/components/adminComponents/pages-components/forms/package-form/package-form";

const CreatePackage: React.FC = () => {
  const onFinish = (values: { title: string }) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen">
      <CreatePackageForm />
    </div>
  );
};

export default CreatePackage;
