"use client";
import { fetchSetting } from "@/redux-store/slices/siteSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Logo() {
  const { item } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    fetchSetting();
  }, [dispatch]);
  return (
    <div className="relative mx-auto h-20 w-30">
      <Image
        src={`${item?.logo?.url || "/images/broken/broken.png"}`}
        fill
        className="h-full w-full object-contain"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
