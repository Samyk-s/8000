"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SettingForm from "@/components/adminComponents/pages-components/forms/setting-form/setting-form";
import useSetting from "@/hooks/useSetting";
import { SiteSettingItem } from "@/types/site-setting";
import { Card } from "antd";

const SiteSettingPage = () => {
  const { item } = useSetting();

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
        <SettingForm setting={item as SiteSettingItem} />
      </Card>
    </div>
  );
};

export default SiteSettingPage;
