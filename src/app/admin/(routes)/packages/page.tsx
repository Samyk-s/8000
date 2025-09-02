"use client";
import PackageTable from "@/components/Tables/packages-table";
import usePackages from "@/hooks/usePackages";
import React from "react";

const Package = () => {
  const { packages, error, loading } = usePackages();
  console.log(packages, "sdfdsf");
  return <PackageTable />;
};

export default Package;
