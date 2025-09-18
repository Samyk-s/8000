"use client";
import dynamic from "next/dynamic";
import { PageItem } from "@/types/page";
import React, { Suspense, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "antd";
import PageTabs from "@/components/adminComponents/tabs/page-tabs";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import { usePage } from "@/hooks/page/usePage";
const PageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/page-form/page-form"
    ),
  { ssr: false },
);

const EditActivity = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, currentPage, getPageByid } = usePage();

  useEffect(() => {
    getPageByid(Number(id));
  }, [id, getPageByid]);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Activity", href: "/admin/activities" },
          { label: "Edit Activity", href: `/admin/activities/${id}` },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <PageTabs id={id as string} path="activities" title="Acitvity" />
          <Suspense fallback={"loading..."}>
            <PageForm page={currentPage as PageItem} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
};

export default EditActivity;
