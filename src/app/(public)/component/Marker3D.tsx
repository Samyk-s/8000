"use client";

import React, { useState } from "react";
import { Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FaMapMarkerAlt } from "react-icons/fa"; // 📍 location icon

export default function Marker3D({
  position,
  index,
  color,
  onClick,
}: {
  position: [number, number, number];
  index: number;
  color?: string;
  onClick?: () => void;
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
      {/* 📍 Location Icon */}
      <Html
        center
        distanceFactor={8} // controls size relative to camera distance
        style={{
          pointerEvents: "none", // let clicks pass through
          transform: "translateY(-10px)",
        }}
      >
        <FaMapMarkerAlt
          size={28}
          color={hovered ? (color || "#ff4444") : (color || "red")}
          style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.7))" }}
        />
      </Html>

      {/* Transparent clickable sphere (so you can still interact in 3D) */}
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={false} // invisible but still interactive
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 🏷️ Number Label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {index + 1}
      </Text>
    </group>
  );
}
