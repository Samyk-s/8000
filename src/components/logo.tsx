"use client";
import useSetting from "@/hooks/useSetting";
import Image from "next/image";
export function Logo() {
  const { item } = useSetting();
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
