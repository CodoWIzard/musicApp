"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingCircle = ({
  delay,
  size,
  position,
  image,
  color,
}: {
  delay: number;
  size: string;
  position: string;
  image: string;
  color: string;
}) => (
  <motion.div
    className={`absolute ${position} ${size} rounded-full overflow-hidden shadow-2xl cursor-pointer`}
    initial={{ scale: 0, rotate: -180, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
    whileHover={{ scale: 1.15, y: -8, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    <div
      className={`w-full h-full ${color} flex items-center justify-center p-2 sm:p-3`}
    >
      <img src={image} alt="Music" className="w-3/4 h-3/4 object-contain" />
    </div>
  </motion.div>
);

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Mouse follower */}
      <motion.div
        className="fixed w-6 h-6 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Floating circles */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FloatingCircle
          delay={0.2}
          size="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36"
          position="-top-16 -left-20 sm:-top-24 sm:-left-28"
          image="/next.svg"
          color="bg-white"
        />
        <FloatingCircle
          delay={0.4}
          size="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
          position="-top-8 left-16 sm:-top-12 sm:left-24"
          image="/vercel.svg"
          color="bg-black"
        />
        <FloatingCircle
          delay={0.6}
          size="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
          position="top-10 -left-12 sm:top-16 sm:-left-16"
          image="/globe.svg"
          color="bg-gradient-to-br from-blue-400 to-purple-500"
        />
        <FloatingCircle
          delay={0.8}
          size="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
          position="top-6 left-12 sm:top-10 sm:left-20"
          image="/file.svg"
          color="bg-gradient-to-br from-pink-400 to-red-500"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-40 sm:pt-48">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.h1
            className="text-7xl sm:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: "serif" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          >
            FineTune
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-white/80 text-xl sm:text-2xl mb-2 font-light">
              Listen Your Favourite Tunes
            </p>
            <p className="text-white/60 text-lg sm:text-xl font-light">
              Anywhere, Anytime.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.a
            href="/player"
            className="flex-1 bg-white text-black py-4 px-8 rounded-full text-center font-semibold text-lg backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get Started
          </motion.a>

          <motion.a
            href="/player"
            className="flex-1 border border-white/30 text-white py-4 px-8 rounded-full text-center font-semibold text-lg backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Explore
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
