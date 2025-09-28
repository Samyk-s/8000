"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaMountain,
  FaRoute,
  FaCalendarAlt,
  FaCloudSun,
  FaLungs,
  FaHiking,
} from "react-icons/fa";

export default function MarkerPopup({
  description,
  screenPos,
  onClose,
}: {
  description: string;
  screenPos: { x: number; y: number };
  onClose: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const t = setTimeout(() => onClose(), 150);
      return () => clearTimeout(t);
    }
  }, [isHovered, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          top: screenPos.y,
          left: screenPos.x,
          transform: "translate(-50%, -120%)",
          pointerEvents: "auto",
          zIndex: 9999,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-[clamp(300px,46vw,520px)] rounded-2xl
                   border border-cyan-400/60 bg-white/10 backdrop-blur-xl p-5
                   text-[#001a5f] shadow-[0_0_20px_rgba(0,209,255,0.6)]"
      >
        {/* ✨ Shine sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl z-0">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-3">
            Mt. Everest | 8848.86m | Nepal
          </h2>

          <div className="flex gap-6">
            <ul className="text-sm space-y-2 flex-1">
              <li className="flex items-center gap-2">
                <FaMountain className="text-[#ebab00]" />
                <span>Local Name: Sagarmāthā</span>
              </li>
              <li className="flex items-center gap-2">
                <FaRoute className="text-[#ebab00]" />
                <span>First Ascent: 1953</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#ebab00]" />
                <span>Climbing Season: Apr–May</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCloudSun className="text-[#ebab00]" />
                <span>Weather: Extreme</span>
              </li>
              <li className="flex items-center gap-2">
                <FaLungs className="text-[#ebab00]" />
                <span>Oxygen: 1/3 of sea level</span>
              </li>
              <li className="flex items-center gap-2">
                <FaHiking className="text-[#ebab00]" />
                <span>Successful Ascents: 6000+</span>
              </li>
            </ul>

            {/* Right image */}
            <div className="relative w-44 h-52 rounded-xl overflow-hidden flex-shrink-0 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,209,255,0.5)]">
              <Image
                src="/images/mountain7.jpg"
                alt="Everest"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 🚀 View More with green glow (static) */}
          <div className="mt-5 flex justify-end">
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 22px rgba(34, 197, 94, 0.55)", // ✅ green glow
              }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="relative px-5 py-2 text-sm font-semibold text-[#001a5f] rounded-full
                         bg-transparent border border-green-400/70 hover:border-green-500
                         shadow-[0_0_10px_rgba(34,197,94,0.35)] backdrop-blur-md transition duration-300"
            >
              <span className="relative z-10">🚀 View More</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 via-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
