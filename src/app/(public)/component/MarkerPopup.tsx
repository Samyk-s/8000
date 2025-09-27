"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function MarkerPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-[9999] w-[clamp(320px,90vw,560px)] overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl group isolate"
        >
          {/* ✨ Shine effect */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
              <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
            </div>
          </div>

          {/* ❌ Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 rounded-full bg-black/40 p-1 hover:bg-black/60 pointer-events-auto"
            aria-label="Close"
          >
            <X size={18} className="text-white" />
          </button>

          {/* 📋 Content */}
          <div className="p-6 text-white/90 relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Left: Info */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-3">
                  Mt. Everest | 8,848m | Nepal
                </h2>
                <p className="text-sm text-white/80 mb-4">Sagarmāthā</p>
                <ul className="space-y-2 text-sm">
                  <li>✔️ First Ascent: 1953</li>
                  <li>✔️ Best Season: April – May</li>
                  <li>✔️ Weather: Extreme</li>
                  <li>✔️ Oxygen: 1/3 of sea level</li>
                  <li>✔️ Successful ascents: 6,000+</li>
                  <li>✔️ Location: 27.9881° N, 86.9250° E</li>
                </ul>
              </div>

              {/* Right: Image */}
              <div className="relative w-full md:w-52 h-72 md:mt-2 rounded-xl overflow-hidden shadow-lg flex-shrink-0 z-10">
                <Image
                  src="/images/mountain7.jpg"
                  alt="Everest"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 22px rgba(0, 209, 255, 0.45)",
                }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="relative px-5 py-2 text-sm font-semibold text-white rounded-full
                           bg-transparent border border-cyan-400/60 hover:border-cyan-300
                           shadow-[0_0_10px_rgba(0,209,255,0.25)] backdrop-blur-md transition duration-300"
              >
                <span className="relative z-10">🚀 View More</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d1ff]/10 via-[#ebab00]/10 to-[#f1c55b]/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
