import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import BlogTable from "@/components/adminComponents/pages-components/tables/blogs-category-table";
import React from "react";

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
            label: "Blogs Category",
            href: "/admin/pages",
          },
        ]}
        separator="/"
      />
      <BlogTable />
    </div>
  );
};

export default BlogsPage;
