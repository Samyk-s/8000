"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Stars } from "@react-three/drei";
import * as THREE from "three";
import Everest from "./Everest";
import Marker3D from "./Marker3D";
import type { Marker } from "./markers";

// 🌠 Shooting Stars
function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);
  const stars = new Array(5).fill(0).map(() => ({
    pos: [
      Math.random() * 400 - 200,
      Math.random() * 200 + 50,
      Math.random() * 400 - 200,
    ] as [number, number, number],
    speed: Math.random() * 0.5 + 0.2,
  }));

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.x -= stars[i].speed;
      child.position.y -= stars[i].speed;
      if (child.position.y < -20) {
        child.position.set(
          Math.random() * 400 - 200,
          Math.random() * 200 + 50,
          Math.random() * 400 - 200
        );
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
}

// 🌍 SceneContent
function SceneContent({
  markers,
  onMarkerHover,
  isAutoRotate,
  controlsRef,
  defaultTarget,
  isNight,
}: {
  markers: Marker[];
  onMarkerHover: (
    desc: string,
    screenPos: { x: number; y: number },
    isHovered: boolean
  ) => void;
  isAutoRotate: boolean;
  controlsRef: React.MutableRefObject<any>;
  defaultTarget: THREE.Vector3;
  isNight: boolean;
}) {
  const { camera } = useThree();

  function projectToScreen(pos: [number, number, number]) {
    const vector = new THREE.Vector3(...pos).project(camera);
    return {
      x: (vector.x * 0.5 + 0.5) * window.innerWidth,
      y: (-vector.y * 0.5 + 0.5) * window.innerHeight,
    };
  }

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(defaultTarget);
      controlsRef.current.update();
    }
  }, [controlsRef, defaultTarget]);

  return (
    <>
      {/* 🌌 Sky */}
      <Sky
        distance={450000}
        sunPosition={isNight ? [-100, -20, -100] : [100, 20, 100]}
        inclination={isNight ? 0.6 : 0.49}
        azimuth={0.25}
      />

      {isNight && (
        <>
          <Stars
            radius={300}
            depth={60}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          {/* 🌙 Moon */}
          <mesh position={[50, 80, -100]}>
            <sphereGeometry args={[8, 32, 32]} />
            <meshStandardMaterial
              emissive={"#fdfbd3"}
              emissiveIntensity={1.5}
            />
          </mesh>
          <ShootingStars />
        </>
      )}

      {/* 💨 Fog */}
      <fog attach="fog" args={[isNight ? "#000000" : "#dbe9f4", 15, 80]} />

      {/* 💡 Lights */}
      <ambientLight intensity={isNight ? 0.2 : 0.5} />
      <directionalLight
        position={[10, 40, 10]}
        intensity={isNight ? 0.5 : 2.2}
        castShadow
      />
      <pointLight position={[-15, -10, -10]} intensity={isNight ? 0.2 : 0.5} />

      {/* 🏔️ Model + Markers */}
      <Suspense fallback={null}>
        <Everest />
        {markers.map((m, i) => (
          <Marker3D
            key={m.label}
            index={i}
            label={m.label}
            position={m.position}
            onHoverChange={(isHovered) => {
              const screenPos = projectToScreen(m.position);
              onMarkerHover(m.description, screenPos, isHovered);
            }}
          />
        ))}
      </Suspense>

      {/* 🎮 Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        minDistance={10}
        maxDistance={21}
        maxPolarAngle={Math.PI / 2.5}
        enableDamping
        autoRotate={isAutoRotate}
        autoRotateSpeed={0.6}
      />
    </>
  );
}

// 🎯 Google Earth style zoom
function EarthLikeZoom({
  controlsRef,
  defaultTarget,
}: {
  controlsRef: any;
  defaultTarget: THREE.Vector3;
}) {
  const { camera, gl, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const lastTargetRef = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    function onWheel(event: WheelEvent) {
      if (!controlsRef.current) return;

      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0 && !lastTargetRef.current) {
        lastTargetRef.current = intersects[0].point.clone();
      }

      const point = lastTargetRef.current || defaultTarget;
      const controls = controlsRef.current;
      const dir = new THREE.Vector3()
        .subVectors(point, camera.position)
        .normalize();

      if (event.deltaY < 0) {
        camera.position.addScaledVector(dir, 2);
        controls.target.lerp(point, 0.25);
      } else {
        camera.position.addScaledVector(dir, -2);

        if (camera.position.length() > 21) {
          camera.position.setLength(21);
          controls.target.copy(defaultTarget);
          lastTargetRef.current = null;
        }
      }

      controls.update();
    }

    gl.domElement.addEventListener("wheel", onWheel, { passive: false });
    return () => gl.domElement.removeEventListener("wheel", onWheel);
  }, [camera, gl, scene, controlsRef, defaultTarget]);

  return null;
}

// 🔭 Rotation watcher → toggles day/night
function RotationWatcher({
  controlsRef,
  onToggleDayNight,
}: {
  controlsRef: any;
  onToggleDayNight: () => void;
}) {
  const lastAngle = useRef(0);
  const accumulated = useRef(0);

  useFrame(() => {
    if (!controlsRef.current) return;
    const azimuth = controlsRef.current.getAzimuthalAngle();
    const deg = THREE.MathUtils.radToDeg(azimuth);

    let delta = deg - lastAngle.current;
    if (delta < -180) delta += 360;
    if (delta > 180) delta -= 360;

    accumulated.current += Math.abs(delta);

    if (accumulated.current >= 360) {
      onToggleDayNight(); // flip 🌞 ↔ 🌙
      accumulated.current = 0;
    }

    lastAngle.current = deg;
  });

  return null;
}

// 🚀 Main SceneCanvas
export default function SceneCanvas({
  markers,
  onMarkerHover,
}: {
  markers: Marker[];
  onMarkerHover: (
    desc: string,
    screenPos: { x: number; y: number },
    isHovered: boolean
  ) => void;
}) {
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const controlsRef = useRef<any>(null);
  const defaultTarget = new THREE.Vector3(0, 0, 0);

  return (
   <Canvas
  shadows
  camera={{ position: [0, 10, 24], fov: 50 }}
  gl={{
    toneMapping: THREE.ACESFilmicToneMapping,
    outputColorSpace: THREE.SRGBColorSpace,
    alpha: true, // transparent canvas
  }}
  style={{ background: "transparent" }}
  onClick={() => setIsAutoRotate(false)}
>

      <SceneContent
        markers={markers}
        onMarkerHover={onMarkerHover}
        isAutoRotate={isAutoRotate}
        controlsRef={controlsRef}
        defaultTarget={defaultTarget}
        isNight={isNight}
      />
      <EarthLikeZoom controlsRef={controlsRef} defaultTarget={defaultTarget} />
      <RotationWatcher
        controlsRef={controlsRef}
        onToggleDayNight={() => setIsNight((prev) => !prev)}
      />
    </Canvas>
  );
}
