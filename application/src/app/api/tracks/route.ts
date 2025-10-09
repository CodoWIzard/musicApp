import { NextResponse } from 'next/server';

// Classical music database with real tracks
const classicalTracks = [
  {
    id: 1,
    title: "Symphony No. 9 in D minor, Op. 125 'Choral'",
    composer: "Ludwig van Beethoven",
    duration: "4:32",
    color: "from-blue-400 to-purple-500",
    genre: "Symphony",
    year: 1824,
    popularity: 95,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Demo audio
    album: "Beethoven: Complete Symphonies",
    description: "Beethoven's final complete symphony, featuring the famous 'Ode to Joy'"
  },
  {
    id: 2,
    title: "Canon in D Major",
    composer: "Johann Pachelbel",
    duration: "3:45",
    color: "from-pink-400 to-red-500",
    genre: "Baroque",
    year: 1680,
    popularity: 88,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    album: "Baroque Masterworks",
    description: "One of the most famous pieces of classical music"
  },
  {
    id: 3,
    title: "Clair de Lune",
    composer: "Claude Debussy",
    duration: "5:12",
    color: "from-green-400 to-blue-500",
    genre: "Impressionist",
    year: 1905,
    popularity: 92,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    album: "Suite Bergamasque",
    description: "A dreamy, atmospheric piano piece meaning 'moonlight'"
  },
  {
    id: 4,
    title: "Ave Maria",
    composer: "Franz Schubert",
    duration: "4:18",
    color: "from-purple-400 to-pink-500",
    genre: "Sacred",
    year: 1825,
    popularity: 85,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    album: "Sacred Classical Collection",
    description: "A beautiful sacred song based on a poem by Walter Scott"
  },
  {
    id: 5,
    title: "The Four Seasons: Spring",
    composer: "Antonio Vivaldi",
    duration: "6:23",
    color: "from-orange-400 to-red-500",
    genre: "Concerto",
    year: 1725,
    popularity: 90,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    album: "The Four Seasons",
    description: "A violin concerto depicting the sounds and feelings of spring"
  },
  {
    id: 6,
    title: "Piano Sonata No. 14 'Moonlight'",
    composer: "Ludwig van Beethoven",
    duration: "5:45",
    color: "from-indigo-400 to-purple-500",
    genre: "Sonata",
    year: 1801,
    popularity: 94,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    album: "Beethoven: Piano Sonatas",
    description: "One of Beethoven's most popular piano sonatas"
  },
  {
    id: 7,
    title: "Für Elise",
    composer: "Ludwig van Beethoven",
    duration: "3:30",
    color: "from-cyan-400 to-blue-500",
    genre: "Bagatelle",
    year: 1810,
    popularity: 87,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    album: "Beethoven: Piano Works",
    description: "A charming piano piece dedicated to Elise"
  },
  {
    id: 8,
    title: "Swan Lake Suite",
    composer: "Pyotr Ilyich Tchaikovsky",
    duration: "7:15",
    color: "from-emerald-400 to-teal-500",
    genre: "Ballet",
    year: 1876,
    popularity: 89,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    album: "Tchaikovsky: Ballet Suites",
    description: "Music from the famous ballet about a princess turned into a swan"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');
  const search = searchParams.get('search');

  let filteredTracks = classicalTracks;

  if (genre && genre !== 'All') {
    filteredTracks = filteredTracks.filter(track => track.genre === genre);
  }

  if (search) {
    filteredTracks = filteredTracks.filter(track =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.composer.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json(filteredTracks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { trackId, action } = body;

  if (action === 'play') {
    console.log(`Playing track ${trackId}`);
  }

  return NextResponse.json({ success: true });
}