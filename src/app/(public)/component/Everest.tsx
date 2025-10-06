"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface EverestProps {
  onLoaded?: () => void;
  debugAxes?: boolean;
}

// ✅ Load from public/models/
const modelUrl = "/models/mountainrange_model.glb";

// ✅ Detect if SketchUp (Z-up)
const SKETCHUP_ZUP =
  String(process.env.NEXT_PUBLIC_SKETCHUP_ZUP || "").toLowerCase() === "true";

export default function Everest({ onLoaded, debugAxes = false }: EverestProps) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    try {
      group.clear();
      group.add(scene);

      // 🔁 Rotate if needed
      if (SKETCHUP_ZUP) group.rotation.set(-Math.PI / 2, 0, 0);
      else group.rotation.set(0, 0, 0);

      // 🧮 Compute bounding box
      const box = new THREE.Box3().setFromObject(group);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      console.log("📦 Everest bbox:", { size, center });

      if (size.y === 0) {
        console.warn("⚠️ Model may not have loaded yet.");
        return;
      }

      // ⚖️ Scale model so height ≈ 10
      const desiredHeight = 10;
      const scale = desiredHeight / size.y;
      group.scale.setScalar(scale);

      // 🧍‍♂️ Recenter model to world origin
      // Ensure bottom of mountain sits exactly at y = 0
      group.position.x -= center.x * scale;
      group.position.z -= center.z * scale;
      group.position.y -= (center.y - size.y / 2) * scale;

      // 🧩 Optional debug axes
      if (debugAxes) {
        const axes = new THREE.AxesHelper(10);
        group.add(axes);
      }

      console.log(
        `✅ Everest aligned. Height=${desiredHeight}, bottom grounded at Y=0`
      );

      onLoaded?.();
    } catch (err) {
      console.error("❌ Everest setup error:", err);
    }
  }, [scene, onLoaded, debugAxes]);

  return <group ref={groupRef} />;
}

useGLTF.preload(modelUrl);
