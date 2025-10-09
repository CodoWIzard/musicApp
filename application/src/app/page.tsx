"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: mousePosition.x * -0.01,
          y: mousePosition.y * -0.01,
        }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: mousePosition.x * 0.015,
          y: mousePosition.y * 0.015,
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-8xl md:text-9xl font-thin mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent"
          >
            Finetune
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl text-gray-600 font-light mb-12"
          >
            Classical music, reimagined
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: "🎼", title: "10K+ Tracks", desc: "Curated collection" },
                { icon: "🎧", title: "Spatial Audio", desc: "Immersive experience" },
                { icon: "✨", title: "AI Curation", desc: "Personalized for you" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/player')}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enter the Experience
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}