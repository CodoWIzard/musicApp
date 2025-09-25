"use client";

import { motion } from "framer-motion";

export default function ExploreSection() {
  return (
    <div id="explore-section" className="min-h-screen bg-slate-900 relative">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-8">Discover Music</h2>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Explore our curated collection of classical masterpieces
          </p>
        </motion.div>
      </div>
    </div>
  );
}