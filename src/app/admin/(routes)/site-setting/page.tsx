"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SettingForm from "@/components/adminComponents/pages-components/forms/setting-form/setting-form";
import { fetchSetting } from "@/redux-store/slices/siteSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { SiteSettingItem } from "@/types/site-setting";
import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SiteSettingPage = () => {
  const { item } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchSetting()); // fetch single site setting
  }, [dispatch]);

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
