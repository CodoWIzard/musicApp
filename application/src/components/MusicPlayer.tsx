'use client';

import { useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white text-gray-900 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <div className="flex-1">
          <h3 className="font-semibold">Song Title</h3>
          <p className="text-gray-400 text-sm">Artist Name</p>
        </div>
        
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-white">🔀</button>
          <button className="text-gray-400 hover:text-white">🔁</button>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="bg-gray-700 h-1 rounded-full">
          <div className="bg-white h-1 rounded-full w-1/3"></div>
        </div>
      </div>
    </div>
  );
}