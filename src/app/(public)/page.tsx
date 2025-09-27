"use client";

import React, { useState } from "react";
import SceneCanvas from "./component/SceneCanvas";
import { markers } from "./component/markers";
import SplashScreen from "./component/SplashScreen";
import MarkerPopup from "./component/MarkerPopup";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  return (
    <div className="w-full h-screen relative">
      {/* 🎨 Scene is ALWAYS mounted */}
      <SceneCanvas markers={markers} onMarkerClick={setActiveMarker} />

      {/* 🚀 Splash Overlay (on top of scene) */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* 📌 Marker Popup */}
      {activeMarker && !showSplash && (
        <MarkerPopup
          description={activeMarker}
          title="Mt. Everest — 14 Peaks"
          subtitle="Sagarmāthā • Chomolungma"
          elevation="8,848 m"
          location="27.9881° N, 86.9250° E"
          temp="-25°C"
          wind="34 km/h"
          onClose={() => setActiveMarker(null)}
        />
      )}
    </div>
  );
}
