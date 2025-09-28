"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface EverestProps {
  onLoaded?: () => void;
}

export default function Everest({ onLoaded }: EverestProps) {
  const { scene } = useGLTF("/models/mountainrange_model.glb");
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

      // ✅ Scale by height only (so it's always consistent)
      const desiredHeight = 10; // tweak until it looks good in your scene
      const scale = desiredHeight / size.y;

      ref.current.scale.setScalar(scale);

      // ✅ Recenter around origin
      ref.current.position.sub(center.multiplyScalar(scale));

      console.log("✅ Everest scaled to height:", desiredHeight);

      if (onLoaded) onLoaded();
    } catch (err) {
      console.error("❌ Error processing Everest model:", err);
    }
  }, [scene, onLoaded]);

  return <primitive ref={ref} object={scene} />;
}

useGLTF.preload("/models/mountainrange_model.glb");
