"use client";

import React, { useState } from "react";
import { Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { TbMountain } from "react-icons/tb";

export default function Marker3D({
  position,
  index,
  label,
  color,
  onHoverChange,
}: {
  position: [number, number, number];
  index: number;
  label: string;
  color?: string;
  onHoverChange?: (isHovered: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);

  // Smooth hover animation
  useFrame(() => {
    const target = hovered ? 1.4 : 1;
    setScale((prev) => prev + (target - prev) * 0.1);
  });

  return (
    <group position={position} scale={scale}>
      {/* 🏔️ Icon */}
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          transform: "translateY(-10px)",
        }}
      >
        <TbMountain
          size={30}
          color={hovered ? (color || "red") : (color || "#000")}
          style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.6))" }}
        />
      </Html>

      {/* Invisible hover hitbox */}
      <mesh
  onPointerOver={() => {
    setHovered(true);
    onHoverChange?.(true); // only open
  }}
  onPointerOut={() => {
    setHovered(false);
    // ❌ don’t call onHoverChange(false) here → prevents flicker
  }}
  visible={false}
>
  <sphereGeometry args={[0.6, 16, 16]} /> {/* a bit larger hitbox */}
  <meshBasicMaterial transparent opacity={0} />
</mesh>


      {/* Label just above icon */}
      <Text
        position={[0, 0.45, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
