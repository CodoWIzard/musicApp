"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAudio } from "@/hooks/useAudio";

interface Track {
  id: number;
  title: string;
  composer: string;
  duration: string;
  color: string;
  genre: string;
  year: number;
  popularity: number;
  audioUrl: string;
  album: string;
  description: string;
}

const genres = [
  "All",
  "Symphony",
  "Baroque",
  "Impressionist",
  "Sacred",
  "Concerto",
  "Sonata",
  "Bagatelle",
  "Ballet",
];

export default function MusicBrowser() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    currentTime,
    duration,
    audioRef,
    play,
    pause,
    togglePlay,
    seek,
    setVolumeLevel,
    formatTime,
  } = useAudio();

  // Fetch tracks from API
  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedGenre !== "All") params.append("genre", selectedGenre);
        if (searchQuery) params.append("search", searchQuery);

        const response = await fetch(`/api/tracks?${params}`);
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [selectedGenre, searchQuery]);

  const handleTrackSelect = (track: Track) => {
    play(track);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    seek(percentage);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setVolumeLevel(Math.max(0, Math.min(100, percentage)));
  };

  const nextTrack = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = isShuffled
      ? Math.floor(Math.random() * tracks.length)
      : (currentIndex + 1) % tracks.length;
    play(tracks[nextIndex]);
  };

  const previousTrack = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = isShuffled
      ? Math.floor(Math.random() * tracks.length)
      : currentIndex === 0
      ? tracks.length - 1
      : currentIndex - 1;
    play(tracks[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} />

      {/* anim background */}
      <div className="absolute inset-0">
        {currentTrack && (
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 bg-gradient-to-br ${currentTrack.color}`}
          />
        )}

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
            style={{
              left: `${10 + i * 8}%`,
              top: `${80 + Math.sin(i) * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-6xl font-thin text-gray-800 mb-2">
                  Finetune
                </h1>
                <p className="text-gray-500 text-lg">
                  Classical Music Collection
                </p>
              </div>

              {/* Search Function */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-4 w-80"
              >
                <input
                  type="text"
                  placeholder="Search tracks or composers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                />
              </motion.div>
            </div>

            {/* Genre Filter */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {genres.map((genre) => (
                <motion.button
                  key={genre}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedGenre === genre
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "backdrop-blur-xl bg-white/30 border border-white/40 text-gray-700 hover:bg-white/40"
                  }`}
                >
                  {genre}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Track Grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="xl:col-span-2"
            >
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="backdrop-blur-xl bg-white/20 rounded-3xl p-6 animate-pulse"
                    >
                      <div className="w-14 h-14 bg-gray-300 rounded-2xl mb-4" />
                      <div className="h-4 bg-gray-300 rounded mb-2" />
                      <div className="h-3 bg-gray-300 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {tracks.map((track, index) => (
                      <motion.div
                        key={track.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTrackSelect(track)}
                        className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-500 ${
                          currentTrack?.id === track.id
                            ? "backdrop-blur-xl bg-white/50 border-2 border-white/60 shadow-2xl"
                            : "backdrop-blur-xl bg-white/25 border border-white/30 hover:bg-white/35 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-15`}
                        />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center shadow-lg`}
                            >
                              <motion.span
                                animate={{
                                  rotate:
                                    currentTrack?.id === track.id && isPlaying
                                      ? 360
                                      : 0,
                                }}
                                transition={{
                                  duration: 3,
                                  repeat:
                                    currentTrack?.id === track.id && isPlaying
                                      ? Infinity
                                      : 0,
                                  ease: "linear",
                                }}
                                className="text-white text-2xl"
                              >
                                ♪
                              </motion.span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                                {track.duration}
                              </span>
                              <div className="mt-2 text-xs text-gray-400">
                                {track.year}
                              </div>
                            </div>
                          </div>

                          <h3 className="font-semibold text-gray-800 text-lg mb-1">
                            {track.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{track.composer}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 bg-white/40 px-2 py-1 rounded-full">
                              {track.genre}
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="w-16 h-1 bg-white/40 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                                  style={{ width: `${track.popularity}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">
                                {track.popularity}%
                              </span>
                            </div>
                          </div>

                          {currentTrack?.id === track.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full shadow-lg"
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Enhanced Player */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-6 h-fit"
            >
              <div className="backdrop-blur-xl bg-white/35 border border-white/50 rounded-3xl p-8 shadow-2xl">
                {currentTrack ? (
                  <div className="space-y-6">
                    {/* Album Art with Visualizer */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative"
                    >
                      <div
                        className={`aspect-square rounded-3xl bg-gradient-to-br ${currentTrack.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}
                      >
                        <motion.span
                          animate={{
                            rotate: isPlaying ? 360 : 0,
                            scale: isPlaying ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            rotate: {
                              duration: 4,
                              repeat: isPlaying ? Infinity : 0,
                              ease: "linear",
                            },
                            scale: {
                              duration: 2,
                              repeat: isPlaying ? Infinity : 0,
                            },
                          }}
                          className="text-white text-6xl z-10"
                        >
                          ♪
                        </motion.span>

                        {/* Animated Rings */}
                        {isPlaying && (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 border-4 border-white/30 rounded-3xl"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5,
                              }}
                              className="absolute inset-0 border-4 border-white/20 rounded-3xl"
                            />
                          </>
                        )}
                      </div>
                    </motion.div>

                    {/* Track Info */}
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {currentTrack.title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-1">
                        {currentTrack.composer}
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                        <span>{currentTrack.genre}</span>
                        <span>•</span>
                        <span>{currentTrack.year}</span>
                      </div>
                    </div>

                    {/* Enhanced Progress */}
                    <div className="space-y-3">
                      <div
                        className="w-full h-3 bg-white/40 rounded-full overflow-hidden cursor-pointer"
                        onClick={handleProgressClick}
                      >
                        <motion.div
                          animate={{ width: `${progress}%` }}
                          className={`h-full bg-gradient-to-r ${currentTrack.color} rounded-full relative`}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Enhanced Controls */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-center space-x-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsShuffled(!isShuffled)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isShuffled
                              ? "bg-blue-500 text-white"
                              : "bg-white/40 text-gray-600 hover:bg-white/60"
                          }`}
                        >
                          🔀
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={previousTrack}
                          className="w-12 h-12 rounded-full bg-white/40 flex items-center justify-center text-gray-600 hover:bg-white/60 transition-all"
                        >
                          ⏮
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={togglePlay}
                          className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentTrack.color} flex items-center justify-center text-white text-3xl shadow-lg hover:shadow-xl transition-all`}
                        >
                          {isPlaying ? "⏸" : "▶"}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextTrack}
                          className="w-12 h-12 rounded-full bg-white/40 flex items-center justify-center text-gray-600 hover:bg-white/60 transition-all"
                        >
                          ⏭
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsRepeated(!isRepeated)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isRepeated
                              ? "bg-blue-500 text-white"
                              : "bg-white/40 text-gray-600 hover:bg-white/60"
                          }`}
                        >
                          🔁
                        </motion.button>
                      </div>

                      {/* Volume Control */}
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">🔊</span>
                        <div
                          className="flex-1 h-2 bg-white/40 rounded-full cursor-pointer"
                          onClick={handleVolumeClick}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full relative"
                            style={{ width: `${volume}%` }}
                          >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {Math.round(volume)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                    >
                      <span className="text-gray-400 text-4xl">♪</span>
                    </motion.div>
                    <p className="text-gray-500 text-lg">
                      Select a track to begin your journey
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Player */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="xl:hidden fixed bottom-6 left-6 right-6 backdrop-blur-xl bg-white/50 border border-white/60 rounded-3xl p-4 shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTrack.color} flex items-center justify-center shadow-lg relative overflow-hidden`}
              >
                <motion.span
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    duration: 3,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "linear",
                  }}
                  className="text-white text-xl"
                >
                  ♪
                </motion.span>
                {isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-gray-600 text-sm truncate">
                  {currentTrack.composer}
                </p>
                <div className="w-full h-1 bg-white/40 rounded-full mt-2">
                  <div
                    className={`h-full bg-gradient-to-r ${currentTrack.color} rounded-full`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className={`w-14 h-14 rounded-full bg-gradient-to-r ${currentTrack.color} flex items-center justify-center text-white shadow-lg text-xl`}
              >
                {isPlaying ? "⏸" : "▶"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
