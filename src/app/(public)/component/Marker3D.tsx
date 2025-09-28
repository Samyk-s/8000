"use client";

import React, { useState, useRef } from "react";
import { Text, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { TbMountain } from "react-icons/tb";
import * as THREE from "three";

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
  onHoverChange?: (
    isHovered: boolean,
    bounds?: { x: number; y: number; w: number; h: number }
  ) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [iconScale, setIconScale] = useState(1);

  const textRef = useRef<THREE.Mesh>(null!);
  const hitboxRef = useRef<THREE.Mesh>(null!);
  const { camera, size } = useThree();

  // Animate icon and update bounds
  useFrame(() => {
    const target = hovered ? 1.4 : 1;
    setIconScale((prev) => prev + (target - prev) * 0.1);

    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }

    if (hovered && hitboxRef.current) {
      const vector = new THREE.Vector3();
      vector.setFromMatrixPosition(hitboxRef.current.matrixWorld);
      vector.project(camera);

      const screenX = (vector.x * 0.5 + 0.5) * size.width;
      const screenY = (-vector.y * 0.5 + 0.5) * size.height;

      onHoverChange?.(true, { x: screenX, y: screenY, w: 160, h: 160 });
    }
  });

  const handleHover = (enter: boolean) => {
    setHovered(enter);
    if (!enter) onHoverChange?.(false);
  };

  return (
    <group position={position}>
      {/* 🏔️ Icon */}
      <group scale={iconScale}>
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <TbMountain
            size={30}
            color={hovered ? (color || "red") : color || "#000"}
            style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.6))" }}
          />
        </Html>
      </group>

      {/* ✨ Text */}
     <Text
  ref={textRef}
  position={[0, 0.6, 0]}
  fontSize={0.2}
  // 👇 change text color on hover too
  color={hovered ? (color || "red") : color || "black"}
  anchorX="center"
  anchorY="middle"
  onPointerOver={() => handleHover(true)}
  onPointerOut={() => handleHover(false)}
>
  {label}
</Text>

      {/* 🔲 Invisible hitbox */}
      <mesh
        ref={hitboxRef}
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
        visible={false}
        position={[0, 0.3, 0]}
      >
        <boxGeometry args={[1.6, 1.6, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
