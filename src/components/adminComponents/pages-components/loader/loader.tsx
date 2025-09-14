import { LoaderIcon } from "@/components/icons/icnos";
import { Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="light h-full rounded-lg bg-white p-8 shadow-sm">
        <div className="flex h-full items-center justify-center">
          <Spin />
        </div>
      </div>
    </div>
  );
};

export default Loader;
