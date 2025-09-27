"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const controls = useAnimation();
  const leftPanel = useAnimation();
  const rightPanel = useAnimation();

  useEffect(() => {
    async function sequence() {
      // Rope pulls up
      controls.start({
        y: "-120vh",
        opacity: 0,
        transition: { duration: 2.5, ease: "easeInOut" },
      });

      // Start panels slightly before rope finishes
      setTimeout(() => {
        leftPanel.start({
          x: "-100%",
          transition: { duration: 1.2, ease: "easeInOut" },
        });
        rightPanel.start({
          x: "100%",
          transition: { duration: 1.2, ease: "easeInOut" },
        });
      }, 1800); // overlap starts here

      // Remove splash after panels are gone
      setTimeout(() => onFinish(), 3000);
    }
    sequence();
  }, [controls, leftPanel, rightPanel, onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      {/* Panels */}
      <motion.div
        initial={{ x: 0 }}
        animate={leftPanel}
        className="absolute top-0 left-0 w-1/2 h-full bg-black"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={rightPanel}
        className="absolute top-0 right-0 w-1/2 h-full bg-black"
      />

      {/* Rope + Logo */}
      <motion.div
        animate={controls}
        className="flex flex-col items-center relative z-10"
      >
        {/* Rope */}
        <div className="w-[6px] h-screen bg-white rounded-full" />

        {/* Knot (dot) */}
        <div className="w-5 h-5 bg-white rounded-full -mt-2 shadow-md" />

        {/* Logo */}
        <Image
          src="/images/weblogo.png"
          alt="Logo"
          width={160}
          height={90}
          className="mt-5 drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
}
