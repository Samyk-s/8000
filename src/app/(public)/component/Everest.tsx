"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface EverestProps {
  onLoaded?: () => void;
  /** Show axes for quick debug (red=X, green=Y, blue=Z) */
  debugAxes?: boolean;
}

// ✅ Always load directly from /models/... (public folder)
const modelUrl = "/models/mountainrange_model.glb";

/**
 * If your model was exported from SketchUp (Z-up coordinate system),
 * set NEXT_PUBLIC_SKETCHUP_ZUP=true in your .env
 * to rotate it to match the normal Y-up space.
 */
const SKETCHUP_ZUP =
  String(process.env.NEXT_PUBLIC_SKETCHUP_ZUP || "").toLowerCase() === "true";

export default function Everest({ onLoaded, debugAxes = false }: EverestProps) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    try {
      // Insert the GLTF scene into our wrapper group
      group.clear();
      group.add(scene);

      // Rotate only if the model was exported as Z-up (SketchUp default)
      if (SKETCHUP_ZUP) {
        group.rotation.set(-Math.PI / 2, 0, 0); // rotate 90° around X
      } else {
        group.rotation.set(0, 0, 0);
      }

      // Compute the bounding box for scaling + centering
      const box = new THREE.Box3().setFromObject(group);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      console.log("📦 Everest bbox size:", size);

      if (size.y === 0) {
        console.warn("⚠️ Invalid bbox (model may not have loaded yet)");
        return;
      }

      // Normalize the height for consistency
      const desiredHeight = 10;
      const scale = desiredHeight / size.y;
      group.scale.setScalar(scale);

      // Recenter around origin
group.position.sub(center.multiplyScalar(scale));
group.position.y -= size.y * 0.02 * scale;
      if (debugAxes) {
        const axes = new THREE.AxesHelper(10);
        group.add(axes);
      }

      console.log(
        `✅ Everest ready (rotated=${SKETCHUP_ZUP ? "Z-up→Y-up" : "none"}, height=${desiredHeight})`
      );

      onLoaded?.();
    } catch (e) {
      console.error("❌ Everest setup error:", e);
    }
  }, [scene, onLoaded, debugAxes]);

  return <group ref={groupRef} />;
}

// ✅ Preload using the same exact path
useGLTF.preload(modelUrl);
