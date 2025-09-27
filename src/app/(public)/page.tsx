"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import { FaHiking } from "react-icons/fa"; // 🥾 Hiking/Mountaineer icon

// Everest model
function Everest() {
  const { scene } = useGLTF("/models/everest_model.glb");

  useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.side = THREE.DoubleSide;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={0.02} position={[0, -2, 0]} />;
}

// 2D Mountaineer Icon Marker
function MountaineerMarker({
  position,
  onClick,
}: {
  position: [number, number, number];
  onClick: () => void;
}) {
  return (
    <group position={position}>
      <Html center>
        <button
          onClick={onClick}
          className="text-red-600 hover:text-red-800 text-5xl drop-shadow-xl"
        >
          <FaHiking />
        </button>
      </Html>
    </group>
  );
}

// Popup Card with Nepali paper style
function PopupCard({
  title,
  description,
  onClose,
}: {
  title: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-xl shadow-2xl p-6 w-96 border border-yellow-900 animate-fadeInUp"
      style={{
        backgroundImage: "url('/textures/lokta-paper.jpg')", // 👈 Add lokta-paper.jpg inside /public/textures
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "#2d1b0d",
        fontFamily: "'Merriweather', serif",
      }}
    >
      <h2 className="text-xl font-bold mb-2 text-red-800 drop-shadow">
        {title}
      </h2>
      <p className="text-sm mb-4 leading-relaxed">{description}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-red-800 transition"
      >
        Close
      </button>
    </div>
  );
}

export default function Page() {
  const [activeMarker, setActiveMarker] = useState<null | {
    title: string;
    description: string;
  }>(null);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#001a5f] to-black relative">
      <Canvas
  shadows
  camera={{ position: [15, 30, 20], fov: 45 }}
  gl={{
    toneMapping: THREE.ACESFilmicToneMapping,
    outputColorSpace: THREE.SRGBColorSpace, // ✅ new
  }}
>

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 40, 10]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />

        {/* HDRI */}
        <Environment preset="sunset" />

        {/* Model + Markers */}
        <Suspense fallback={null}>
          <Everest />

          {/* Summit marker */}
          <MountaineerMarker
            position={[0, 8, 12]}
            onClick={() =>
              setActiveMarker({
                title: "Everest Summit",
                description:
                  "The highest point on Earth, reaching 8,849m above sea level.",
              })
            }
          />

          {/* Base Camp marker */}
          <MountaineerMarker
            position={[-6, 2, 10]}
            onClick={() =>
              setActiveMarker({
                title: "Everest Base Camp",
                description:
                  "The legendary Everest Base Camp, starting point for climbers worldwide.",
              })
            }
          />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={15}
          maxDistance={80}
          maxPolarAngle={Math.PI / 2.5}
          enableDamping
        />
      </Canvas>

      {/* Popup Overlay */}
      {activeMarker && (
        <PopupCard
          title={activeMarker.title}
          description={activeMarker.description}
          onClose={() => setActiveMarker(null)}
        />
      )}

      {/* Tailwind keyframes for fadeInUp */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
