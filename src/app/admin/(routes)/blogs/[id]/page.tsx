"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import BlogForm from "@/components/adminComponents/pages-components/forms/blog-form/blog-form";
import { getBlogById } from "@/redux-store/slices/blogSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { BlogItem } from "@/types/blog";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditBlogsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blog } = useSelector((state: RootState) => state.blogs);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getBlogById(Number(id)));
  }, [id, dispatch]);
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
