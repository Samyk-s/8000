"use client";

import React from "react";
import { Form, Input, Button, Space, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CreatePackageForm from "@/components/adminComponents/pages-components/forms/package-form/create-package-form";

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
