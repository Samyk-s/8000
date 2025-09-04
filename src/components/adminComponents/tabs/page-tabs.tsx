"use client";

import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const PageForm = dynamic(
  () => import("../pages-components/forms/page-form/page-form"),
);
import { PageItem } from "@/types/page";
import dynamic from "next/dynamic";

const PageTabs = ({
  disabled = true,
  page,
}: {
  disabled?: boolean;
  page?: PageItem;
}) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="rounded-t-lg bg-gray-200 px-4 py-2 text-gray-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white">
          Page
        </span>
      ),
      children: <PageForm page={page} />,
    },
    {
      key: "2",
      label: (
        <span className="rounded-t-lg bg-gray-200 px-4 py-2 text-gray-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white">
          SEO
        </span>
      ),
      children: <PageForm />,
      disabled: disabled,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      className="custom-tabs [&_.ant-tabs-tab-active>.ant-tabs-tab-btn] [&_.ant-tabs-ink-bar]:!hidden [&_.ant-tabs-nav::before]:!hidden [&_.ant-tabs-tab-active]:!bg-transparent [&_.ant-tabs-tab-active]:!text-white [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:bg-blue-600 [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-white [&_.ant-tabs-tab-btn]:block [&_.ant-tabs-tab-btn]:px-4 [&_.ant-tabs-tab-btn]:py-2 [&_.ant-tabs-tab:not(.ant-tabs-tab-active)_.ant-tabs-tab-btn]:bg-slate-400 [&_.ant-tabs-tab:not(.ant-tabs-tab-active)_.ant-tabs-tab-btn]:text-gray-900 [&_.ant-tabs-tab]:!m-0 [&_.ant-tabs-tab]:overflow-hidden [&_.ant-tabs-tab]:!bg-transparent [&_.ant-tabs-tab]:!p-0"
    />
  );
};

export default PageTabs;
