"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, Compass, Mountain, MapPin, Wind, Thermometer } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function MiniPeak() {
  return (
    <mesh rotation={[0.3, 0.4, 0]}>
      <coneGeometry args={[1, 2, 6]} />
      <meshStandardMaterial
        color="#e0f7fa"
        emissive="#00d1ff"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}

export default function MarkerPopup({
  title = "Mt. Everest",
  subtitle = "Sagarmāthā • Chomolungma",
  description,
  elevation = "8,848 m",
  location = "27.9881° N, 86.9250° E",
  temp = "-25°C",
  wind = "34 km/h",
  onClose,
}: {
  title?: string;
  subtitle?: string;
  description: string;
  elevation?: string;
  location?: string;
  temp?: string;
  wind?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // 🎮 Interactive tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Popup with airplane entrance */}
        <motion.div
          key="popup"
          style={{ rotateX, rotateY }}
          initial={{
            opacity: 0,
            scale: 0.3,
            rotate: -45,
            x: -200,
            y: -200,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: "0%",
            y: "0%",
            transition: {
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1], // easeOutBack-ish
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.6,
            y: 50,
            transition: { duration: 0.3 },
          }}
          onMouseMove={(e) => {
            const bounds = e.currentTarget.getBoundingClientRect();
            const offsetX = e.clientX - bounds.left - bounds.width / 2;
            const offsetY = e.clientY - bounds.top - bounds.height / 2;
            x.set(offsetX / 10);
            y.set(offsetY / 10);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          className="fixed top-1/2 left-1/2 z-[9999] w-[clamp(340px,90vw,720px)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1b2a]/95 to-[#1b263b]/95 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)]">
            {/* Shimmer border */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-[#ebab00] via-[#f1c55b] to-[#00d1ff] opacity-30 blur-xl"
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="relative h-44">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-[#00d1ff]/30 via-[#ebab00]/20 to-transparent blur-2xl"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-extrabold text-white drop-shadow-md">
                    {title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-white/70">
                    {subtitle}
                  </p>
                </div>

                {/* Mini peak */}
                <div className="absolute right-4 -bottom-10 h-36 w-36 overflow-hidden rounded-xl border border-white/20 bg-black/60 shadow-xl">
                  <Canvas camera={{ position: [2, 2, 3], fov: 35 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[3, 4, 2]} intensity={1.2} />
                    <MiniPeak />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
                  </Canvas>
                </div>
              </div>

              {/* Body */}
              <div className="grid gap-3 p-6 sm:pr-40">
                <p className="text-sm leading-relaxed text-white/85">
                  {description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <Badge icon={<Mountain size={14} />} label={elevation} />
                  <Badge icon={<MapPin size={14} />} label={location} />
                  <Badge icon={<Wind size={14} />} label={wind} />
                  <Badge icon={<Thermometer size={14} />} label={temp} />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between border-t border-white/10 p-4">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <X size={16} /> Close
                </button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px #ebab00" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ebab00] via-[#f1c55b] to-[#00d1ff] px-3 py-2 text-sm font-semibold text-black shadow-lg"
                >
                  <Compass size={16} /> Explore
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
      className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-white/80 backdrop-blur-md transition"
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  );
}
