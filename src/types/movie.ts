// Raw OMDb API response structures
export interface OMDbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDbMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

export interface OMDbSearchResponse {
  Search?: OMDbMovie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

// Clean mapped frontend interfaces used across components and pages
export interface Movie {
  id: string; // imdbID
  title: string;
  poster_path: string | null;
  release_date: string; // mapped from Year or Released
  vote_average: number; // mapped from imdbRating
  vote_count: number; // mapped from imdbVotes
  overview: string; // mapped from Plot
  genres: string[]; // mapped from Genre (split string)
  popularity: number;
  adult: boolean; // mapped from Rated (e.g. contains R or NC-17)
}

export interface MovieDetail extends Movie {
  runtime: string; // e.g. "120 min"
  director: string;
  actors: string;
  language: string;
  awards: string;
  boxOffice: string;
}
