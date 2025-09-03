"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PageForm from "@/components/adminComponents/pages-components/forms/page-form/page-form";
import pageApi from "@/lib/api/pageApi";
import { PageItem } from "@/types/page";
import React, { useEffect, useState } from "react";

const EditPage = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState<PageItem | null>(null);

  useEffect(() => {
    async function fetchPageById() {
      try {
        const res = await pageApi.getPageById(Number(params.id));
        setPage(res.data);
      } catch (error: any) {
        console.error(error?.message);
      }
    }
    fetchPageById();
  }, [params.id]);

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Page", href: "/admin/pages" },
          { label: "Edit Page", href: `/admin/pages/${params.id}/edit` },
        ]}
        separator="/"
      />
      <PageForm page={page as PageItem} />
    </div>
  );
};

export default EditPage;
