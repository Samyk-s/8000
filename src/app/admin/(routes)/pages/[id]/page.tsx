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
import { Card } from "antd";
import PageTabs from "@/components/adminComponents/tabs/page-tabs";
import Loader from "@/components/adminComponents/pages-components/loader/loader";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<PageItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPageById() {
      setLoading(true);
      try {
        if (!id) return;
        const res = await pageApi.getPageById(Number(id));
        console.log(res);
        setPage(res);
      } catch (error: any) {
        setLoading(false);
        console.error("error:: ", error?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPageById();
  }, [id]);

  if (loading) return <Loader />;
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
      <Card>
        <div className="flex flex-col gap-3">
          <PageTabs id={id as string} />
          <PageForm page={page as PageItem} />
        </div>
      </Card>
    </div>
  );
};

export default EditPage;
