"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import BlogForm from "@/components/adminComponents/pages-components/forms/blog-form/blog-form";
import { useBlog } from "@/hooks/blogs/useBlog";
import { BlogItem } from "@/types/blog";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const EditBlogsPage = () => {
  const { blog, getBlog } = useBlog();
  const { id } = useParams();
  useEffect(() => {
    getBlog(Number(id));
  }, [id, getBlog]);
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Blogs",
            href: "/admin/blogs",
          },
          {
            label: "Edit Blog",
            href: `/admin/blogs/${id}`,
          },
        ]}
        separator="/"
      />
      <Card>
        <BlogForm blog={blog as BlogItem} />
      </Card>
    </div>
  );
};

export default EditBlogsPage;
