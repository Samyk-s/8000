"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import ReviewForm from "@/components/adminComponents/pages-components/forms/review-form/review-form";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React from "react";

const CreateReviewPage = () => {
  const { id } = useParams();
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
        <ReviewForm />
      </Card>
    </div>
  );
};

export default CreateReviewPage;
