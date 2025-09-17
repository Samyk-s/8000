"use client";
import dynamic from "next/dynamic";
import { PageItem } from "@/types/page";
import React, { Suspense, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "antd";
import PageTabs from "@/components/adminComponents/tabs/page-tabs";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { getPageById } from "@/redux-store/slices/pageSlice";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import { usePage } from "@/hooks/page/usePage";
const PageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/page-form/page-form"
    ),
  { ssr: false },
);

const EditPage = () => {
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
          { label: "Page", href: "/admin/pages" },
          { label: "Edit Page", href: `/admin/pages/${id}` },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <PageTabs id={id as string} />
          <Suspense fallback={"loading..."}>
            <PageForm page={currentPage as PageItem} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
};

export default EditPage;
