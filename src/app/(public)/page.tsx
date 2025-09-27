"use client";

import React, { useState } from "react";
import SceneCanvas from "./component/SceneCanvas";
import { markers } from "./component/markers";
import SplashScreen from "./component/SplashScreen";
import MarkerPopup from "./component/MarkerPopup";
import Image from "next/image";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeMarker, setActiveMarker] = useState<{
    description: string;
    position: [number, number, number];
  } | null>(null);

  return (
    <div className="w-full h-screen relative">
      {/* 🎨 Scene */}
      <SceneCanvas
        markers={markers}
        onMarkerHover={(desc, pos, isHovered) => {
          if (isHovered) {
            setActiveMarker({ description: desc, position: pos });
          } else {
            setActiveMarker(null);
          }
        }}
      />

      {/* 🚀 Splash Overlay */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* 📌 Marker Popup */}
      {activeMarker && !showSplash && (
  <MarkerPopup onClose={() => setActiveMarker(null)} />
)}


      {/* 🖼️ Logo */}
      {!showSplash && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[9999]">
          <Image
            src="/images/weblogo.png"
            alt="Website Logo"
            width={140}
            height={40}
            className="object-contain"
            priority
          />
        </div>
      )}
    </div>
  );
}
