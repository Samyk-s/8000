"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import PageForm from "@/components/adminComponents/pages-components/forms/page-form/page-form";
import SeoForm from "@/components/adminComponents/pages-components/forms/seo-form/seo-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import PageTabs from "@/components/adminComponents/tabs/page-tabs";
import pageApi from "@/lib/api/pageApi";
import { PageItem } from "@/types/page";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SEOPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  console.log(id);
  const [page, setPage] = useState<PageItem | null>(null);
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
          <SeoForm id={id} />
        </div>
      </Card>
    </div>
  );
};

export default SEOPage;
