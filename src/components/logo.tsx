"use client";
import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import siteSetting from "@/lib/api/siteSettingApi";
import { SiteSettingItem } from "@/types/site-setting";
import { message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Logo() {
  const [setting, setSetting] = useState<SiteSettingItem | null>(null);
  useEffect(() => {
    async function getSetting() {
      try {
        const res = await siteSetting.getSiteSetting();
        setSetting(res);
        console.log(res, "setting");
      } catch (error: any) {
        message.error(error.message);
      }
    }
    getSetting();
  }, []);
  return (
    <div className="relative mx-auto h-20 w-30">
      <Image
        src={`${setting?.logo?.url || "/images/broken/broken.png"}`}
        fill
        className="h-full w-full object-contain"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
