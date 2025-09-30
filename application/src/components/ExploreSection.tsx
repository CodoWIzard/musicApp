"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function ExploreSection() {
  const ref = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const features = [
    {
      title: "10,000+ Tracks",
      desc: "Curated classical masterpieces",
      icon: "🎵",
    },
    { title: "HD Audio", desc: "Crystal clear sound quality", icon: "🎧" },
    {
      title: "Smart Playlists",
      desc: "AI-powered recommendations",
      icon: "🧠",
    },
    { title: "Offline Mode", desc: "Download & listen anywhere", icon: "📱" },
  ];

  return (
    <div
      ref={ref}
      id="explore-section"
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-40 h-40 border border-purple-500/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-60 h-60 border border-white/10 rounded-full"
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 bg-purple-400 rounded-full"
          style={{
            left: `${10 + i * 10}%`,
            top: "90%",
          }}
        />
      ))}

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8 max-w-xs mx-auto"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/90 text-2xl max-w-4xl mx-auto leading-relaxed"
          >
            The ultimate destination for classical music enthusiasts.
            <br />
            <span className="text-purple-300 font-semibold">
              Discover timeless compositions that have shaped centuries.
            </span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-black backdrop-blur-sm border border-white/20 rounded-2xl p-6 cursor-pointer group"
            >
              <motion.div
                animate={{
                  scale: hoveredCard === i ? 1.2 : 1,
                  rotate: hoveredCard === i ? 10 : 0,
                }}
                className="text-4xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-white font-bold text-xl mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.desc}</p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: hoveredCard === i ? "100%" : "0%" }}
                className="h-0.5 bg-purple-500 mt-4 rounded-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-purple-900/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-12 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold text-white mb-8"
          >
            Experience Classical Music Like Never Before
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
          >
            {[
              { number: "500+", label: "Composers" },
              { number: "50+", label: "Countries" },
              { number: "1M+", label: "Happy Listeners" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + i * 0.1,
                    type: "spring",
                  }}
                  className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/80 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xl font-semibold rounded-full hover:from-purple-500 hover:to-purple-700 transition-all duration-300 shadow-2xl"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>

      {/* Ambient Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
      />
    </div>
  );
}
