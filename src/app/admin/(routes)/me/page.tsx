"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import AccountForm from "@/components/adminComponents/pages-components/forms/account-form/account-from";
import { fetchSetting } from "@/redux-store/slices/siteSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AccountPage = () => {
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
            label: "Edit Account Setting",
            href: "/admin/me",
          },
        ]}
        separator="/"
      />
      <Card>
        <AccountForm />
      </Card>
    </div>
  );
};

export default AccountPage;
