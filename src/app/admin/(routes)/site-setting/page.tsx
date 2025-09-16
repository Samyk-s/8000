import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SettingForm from "@/components/adminComponents/pages-components/forms/setting-form/setting-form";
import { Card } from "antd";
import React from "react";

const SiteSettingPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Edit Site Setting",
            href: "/admin/site-setting",
          },
        ]}
        separator="/"
      />
      <Card>
        <SettingForm />
      </Card>
    </div>
  );
};

export default SiteSettingPage;
