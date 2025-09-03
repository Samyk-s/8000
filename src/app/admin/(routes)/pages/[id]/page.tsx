"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
const PageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/page-form/page-form"
    ),
);
import pageApi from "@/lib/api/pageApi";
import { PageItem } from "@/types/page";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<PageItem | null>(null);

  useEffect(() => {
    async function fetchPageById() {
      try {
        if (!id) return;
        const res = await pageApi.getPageById(Number(id));
        console.log(res);
        setPage(res);
      } catch (error: any) {
        console.error("error:: ", error?.message);
      }
    }
    fetchPageById();
  }, [id]);

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Page", href: "/admin/pages" },
          { label: "Edit Page", href: `/admin/pages/${id}/edit` },
        ]}
        separator="/"
      />
      <PageForm page={page as PageItem} />
    </div>
  );
};

export default EditPage;
