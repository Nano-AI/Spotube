
// interface VideosObj {
//   artist: string;
//   duration: number;
//   id: string;
//   original_title: string;
//   publishedAt: Date;
//   title: string;
// }

// interface VideoResultObj {
//   apikey: string;
//   didyoumean: string;
//   token: string;
//   videos: Array<VideosObj>;
// }

interface SongArtists {
  name: string;
  id?: string;
}

interface SongDuration {
  label: string;
  totalSeconds: number;
}

interface SongObj {
  album?: string;
  artists: Array<SongArtists>;
  duration: SongDuration;
  isExplicit?: boolean;
  thumbnailUrl: string;
  title: string;
  youtubeId: string;
}

interface DurationObj {
  played: number; playedSeconds: number; loaded: number; loadedSeconds: number;
}

type SongResultsType = Array<SongObj>;

export type { DurationObj, SongResultsType, SongArtists, SongDuration, SongObj };
