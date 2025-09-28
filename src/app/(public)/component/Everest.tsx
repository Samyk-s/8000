"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface EverestProps {
  onLoaded?: () => void;
}

export default function Everest({ onLoaded }: EverestProps) {
  // 🔥 Make sure file is in public/models/everest_model.glb
  const { scene } = useGLTF("/models/mountainrange_model.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!ref.current) return;

    try {
      // Compute bounding box for scaling + centering
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 10 / maxDim;

      ref.current.scale.setScalar(scale);
      ref.current.position.sub(center.multiplyScalar(scale));

      console.log("✅ Everest model loaded and scaled");

      if (onLoaded) onLoaded();
    } catch (err) {
      console.error("❌ Error processing Everest model:", err);
    }
  }, [scene, onLoaded]);

  return <primitive ref={ref} object={scene} />;
}

// ✅ Preload model (so Suspense knows about it early)
useGLTF.preload("/models/everest_model.glb");
