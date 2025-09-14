"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import BlogTable from "@/components/adminComponents/pages-components/tables/blogs-table";
import React, { Suspense } from "react";

const BlogsPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Blogs ",
            href: "/admin/blogs",
          },
        ]}
        separator="/"
      />
      <Suspense fallback={null}>
        <BlogTable />
      </Suspense>
    </div>
  );
};

export default BlogsPage;
