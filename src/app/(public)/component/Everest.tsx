"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface EverestProps {
  onLoaded?: () => void;
}

// ✅ Declare it here (top level)
const modelUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/models/mountainrange_model.glb`;

export default function Everest({ onLoaded }: EverestProps) {
  const { scene } = useGLTF(modelUrl);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!ref.current) return;

    try {
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      console.log("📏 Everest bounding box:", size);

      if (size.y === 0) {
        console.warn("⚠️ Model bounding box invalid — likely failed to load");
        ref.current.scale.setScalar(1);
        return;
      }

      const desiredHeight = 10;
      const scale = desiredHeight / size.y;

      ref.current.scale.setScalar(scale);
      ref.current.position.sub(center.multiplyScalar(scale));

      console.log("✅ Everest scaled to height:", desiredHeight);

      onLoaded?.();
    } catch (err) {
      console.error("❌ Error processing Everest model:", err);
    }
  }, [scene, onLoaded]);

  return <primitive ref={ref} object={scene} />;
}

// ✅ preload using the same constant
useGLTF.preload(modelUrl);
