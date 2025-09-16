"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SettingTabs from "@/components/adminComponents/tabs/setting-tabs";
const SeoForm = dynamic(
  () =>
    import(
      "@/components/adminComponents/pages-components/forms/seo-form/seo-form"
    ),
);
import { SeoEntity } from "@/types/enum/enum";
import { Card } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const AppSeo = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Site Setting", href: "/admin/site-setting" },
          { label: "SEO", href: `/admin/site-setting/seo` },
        ]}
        separator="/"
      />
      <Card>
        <div className="flex flex-col gap-3">
          <SettingTabs />
          <SeoForm id={"1"} type={SeoEntity.PAGE} />
        </div>
      </Card>
    </div>
  );
};

export default AppSeo;
