"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
const SeoForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/seo-form/seo-form"
    ),
);
import { SeoEntity } from "@/types/enum/enum";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";

const BlogSEOPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Blogs", href: "/admin/blogs" },
          { label: "Edit Package", href: `/admin/packages/${id}` },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <SeoForm id={id} type={SeoEntity.BLOG} />
        </div>
      </Card>
    </div>
  );
};

export default BlogSEOPage;
