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
    screenPos: { x: number; y: number };
  } | null>(null);

  return (
    <div className="w-full h-screen relative bg-black">
      {/* 🎨 Scene always rendered in background */}
      <div className="absolute inset-0 z-0">
        <SceneCanvas
          markers={markers}
          onMarkerHover={(desc, screenPos, isHovered) => {
            if (isHovered) {
              setActiveMarker({ description: desc, screenPos });
            } else {
              setActiveMarker(null);
            }
          }}
        />
      </div>

      {/* 🚀 Splash Overlay (on top of scene) */}
      {showSplash && (
        <div className="absolute inset-0 z-50">
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </div>
      )}

      {/* 📌 Marker Popup */}
      {activeMarker && !showSplash && (
        <MarkerPopup
          description={activeMarker.description}
          screenPos={activeMarker.screenPos}
          onClose={() => setActiveMarker(null)}
        />
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
