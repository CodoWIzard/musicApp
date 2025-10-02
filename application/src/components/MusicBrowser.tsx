"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Track {
  id: number;
  title: string;
  composer: string;
  duration: string;
  album: string;
}

const tracks: Track[] = [
  { id: 1, title: "Symphony No. 9", composer: "Beethoven", duration: "4:32", album: "Classical Essentials" },
  { id: 2, title: "Canon in D", composer: "Pachelbel", duration: "3:45", album: "Baroque Collection" },
  { id: 3, title: "Clair de Lune", composer: "Debussy", duration: "5:12", album: "Impressionist Piano" },
  { id: 4, title: "Ave Maria", composer: "Schubert", duration: "4:18", album: "Sacred Music" },
  { id: 5, title: "The Four Seasons", composer: "Vivaldi", duration: "6:23", album: "Baroque Masterworks" },
  { id: 6, title: "Moonlight Sonata", composer: "Beethoven", duration: "5:45", album: "Piano Sonatas" },
];

export default function MusicBrowser() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            <span className="text-white">Fine</span>
            <span className="text-purple-400">tune</span>
          </h1>
          <p className="text-gray-400 text-lg">Classical Music Collection</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Track List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">Browse Music</h2>
            <div className="space-y-3">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setCurrentTrack(track)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    currentTrack?.id === track.id
                      ? "bg-purple-600/30 border border-purple-400/50"
                      : "bg-white/5 hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{track.title}</h3>
                      <p className="text-gray-400">{track.composer}</p>
                      <p className="text-sm text-gray-500">{track.album}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400">{track.duration}</p>
                      {currentTrack?.id === track.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-purple-400 rounded-full mt-2 ml-auto"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Music Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-purple-900/40 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 h-fit sticky top-6"
          >
            <h2 className="text-xl font-bold mb-6">Now Playing</h2>
            
            {currentTrack ? (
              <div className="space-y-6">
                {/* Album Art */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center"
                >
                  <div className="text-6xl">🎵</div>
                </motion.div>

                {/* Track Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">{currentTrack.title}</h3>
                  <p className="text-purple-300">{currentTrack.composer}</p>
                  <p className="text-sm text-gray-400">{currentTrack.album}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isPlaying ? "60%" : "0%" }}
                      transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>1:23</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl text-gray-400 hover:text-white"
                  >
                    ⏮️
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl hover:from-purple-500 hover:to-pink-500 transition-all"
                  >
                    {isPlaying ? "⏸️" : "▶️"}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl text-gray-400 hover:text-white"
                  >
                    ⏭️
                  </motion.button>
                </div>

                {/* Volume */}
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">🔊</span>
                  <div className="flex-1 bg-white/10 rounded-full h-1">
                    <div className="bg-purple-400 h-1 rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <div className="text-6xl mb-4">🎵</div>
                <p>Select a track to start playing</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Player (Fixed Bottom) */}
      {currentTrack && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              🎵
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{currentTrack.title}</h4>
              <p className="text-sm text-gray-400 truncate">{currentTrack.composer}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}