import MusicPlayer from '@/components/MusicPlayer';
import TrackList from '@/components/TrackList';

export default function PlayerPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Music Player</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrackList />
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}