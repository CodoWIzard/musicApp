interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

const sampleTracks: Track[] = [
  { id: 1, title: "Sample Song 1", artist: "Artist A", duration: "3:45" },
  { id: 2, title: "Sample Song 2", artist: "Artist B", duration: "4:12" },
  { id: 3, title: "Sample Song 3", artist: "Artist C", duration: "2:58" },
];

export default function TrackList() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Popular Tracks</h2>
      
      <div className="space-y-3">
        {sampleTracks.map((track) => (
          <div key={track.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                {track.id}
              </div>
              <div>
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-gray-600 text-sm">{track.artist}</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}