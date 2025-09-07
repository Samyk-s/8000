"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SubscriptionTable from "@/components/adminComponents/pages-components/tables/subscription-table";
import React from "react";

const SubscriptionPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "News Letter", href: "/admin/new-letter" },
        ]}
        separator="/"
      />
      <SubscriptionTable />
    </>
  );
};

export default SubscriptionPage;
