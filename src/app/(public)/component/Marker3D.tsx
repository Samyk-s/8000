"use client";

import React, { useEffect, useState, useRef } from "react";
import { Text, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { TbMountain } from "react-icons/tb";
import * as THREE from "three";

export default function Marker3D({
  position,
  index: _index,
  label,
  color,
  onHoverChange,
}: {
  position: [number, number, number];
  index?: number;
  label: string;
  color?: string;
  onHoverChange?: (
    isHovered: boolean,
    bounds?: { x: number; y: number; w: number; h: number }
  ) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [iconScale, setIconScale] = useState(1);
  const [groundedPos, setGroundedPos] =
    useState<[number, number, number]>(position);

  const textRef = useRef<THREE.Mesh>(null!);
  const hitboxRef = useRef<THREE.Mesh>(null!);
  const { camera, size, scene } = useThree();

  // 🧭 Raycast downwards to find ground
  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    raycaster.set(new THREE.Vector3(...position), new THREE.Vector3(0, -1, 0));
    const hits = raycaster.intersectObjects(scene.children, true);
    if (hits.length > 0) {
      const p = hits[0].point;
      setGroundedPos([p.x, p.y + 0.2, p.z]);
    } else {
      setGroundedPos(position);
    }
  }, [position, scene]);

  useFrame(() => {
    const target = hovered ? 1.4 : 1;
    setIconScale((s) => s + (target - s) * 0.1);
    if (textRef.current) textRef.current.quaternion.copy(camera.quaternion);

    if (hovered && hitboxRef.current) {
      const v = new THREE.Vector3();
      v.setFromMatrixPosition(hitboxRef.current.matrixWorld);
      v.project(camera);
      const screenX = (v.x * 0.5 + 0.5) * size.width;
      const screenY = (-v.y * 0.5 + 0.5) * size.height;
      onHoverChange?.(true, { x: screenX, y: screenY, w: 160, h: 160 });
    }
  });

  const handleHover = (enter: boolean) => {
    setHovered(enter);
    onHoverChange?.(enter);
  };

  return (
<group position={[groundedPos[0], groundedPos[1] - 0.8, groundedPos[2]]}>
      {/* 🏷️ Text ABOVE the icon */}
      <Text
        ref={textRef}
        position={[0, 0.6, 0]} // 👈 lifted above the mountain
        fontSize={0.22}
        color={hovered ? (color || "red") : color || "black"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="white"
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
      >
        {label}
      </Text>

      {/* 🏔️ Icon */}
      <group scale={iconScale}>
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <TbMountain
            size={30}
            color={hovered ? (color || "red") : color || "#000"}
            style={{
              filter: "drop-shadow(0 0 5px rgba(255,255,255,0.6))",
            }}
          />
        </Html>
      </group>

      {/* 🔲 Hover hitbox */}
      <mesh
        ref={hitboxRef}
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
        visible={false}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1.6, 1.6, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
