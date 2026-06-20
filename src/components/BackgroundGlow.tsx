"use client";

import { motion } from "framer-motion";

export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#02040a]">
      {/* Dynamic Liquid Mesh Blob 1 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary to-purple opacity-[0.15] filter blur-[100px] mix-blend-screen"
        animate={{
          x: [100, 300, 100],
          y: [-50, 150, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "50%" }}
      />

      {/* Dynamic Liquid Mesh Blob 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent to-primary opacity-[0.12] filter blur-[120px] mix-blend-screen"
        animate={{
          x: [-200, 100, -200],
          y: [200, 500, 200],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "30%", left: "5%" }}
      />

      {/* Dynamic Liquid Mesh Blob 3 */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple to-pink-500 opacity-[0.12] filter blur-[90px] mix-blend-screen"
        animate={{
          x: [200, -50, 200],
          y: [400, 200, 400],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* Micro Floating Particle Dust */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
    </div>
  );
}
