import { LoaderIcon } from "@/components/icons/icnos";
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="light h-full rounded-lg bg-white p-8 shadow-sm">
        <div className="flex h-full items-center justify-center">
          <LoaderIcon />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
