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
const PageForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/page-form/page-form"
    ),
  { ssr: false },
);

const EditActivity = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, page } = useSelector((state: RootState) => state.pages);

  useEffect(() => {
    dispatch(getPageById(Number(id)));
  }, [id, dispatch]);

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
            <PageForm page={page as PageItem} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
};

export default EditActivity;
