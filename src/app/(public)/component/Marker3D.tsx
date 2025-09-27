"use client";

import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

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

  // Smooth scale animation
  useFrame(() => {
    const target = hovered ? 1.8 : 1; // enlarge when hovered
    setScale((prev) => prev + (target - prev) * 0.1); // lerp
  });

  return (
    <group position={position} scale={scale}>
      {/* tiny sphere */}
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color || "red"}
          emissive={color || "red"}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* number */}
      <Text
        position={[0, 0, 0.12]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {index + 1}
      </Text>
    </group>
  );
}
