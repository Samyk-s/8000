import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import BlogForm from "@/components/adminComponents/pages-components/forms/blog-form/blog-form";
import { Card } from "antd";
import React from "react";

const CreateBlogsPage = () => {
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
            label: "Create Blog",
            href: "/admin/blogs/create",
          },
        ]}
        separator="/"
      />
      <Card>
        <BlogForm />
      </Card>
    </div>
  );
};

export default CreateBlogsPage;
