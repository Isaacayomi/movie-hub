import axios from "axios";
import type {
  OMDbSearchResponse,
  OMDbMovieDetail,
  MovieDetail,
} from "../../types/movie";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const omdbClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

omdbClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apikey: OMDB_API_KEY || "",
  };
  return config;
});

// Helper to map OMDb movie detail to our frontend Movie interface
export function mapOMDbMovieDetail(raw: OMDbMovieDetail): MovieDetail {
  const genres =
    raw.Genre && raw.Genre !== "N/A"
      ? raw.Genre.split(",").map((g) => g.trim())
      : [];

  const rating =
    raw.imdbRating && raw.imdbRating !== "N/A" ? parseFloat(raw.imdbRating) : 0;
  const votes =
    raw.imdbVotes && raw.imdbVotes !== "N/A"
      ? parseInt(raw.imdbVotes.replace(/,/g, ""), 10)
      : 0;
  const isAdult = raw.Rated
    ? raw.Rated.includes("R") || raw.Rated.includes("NC-17")
    : false;

  return {
    id: raw.imdbID,
    title: raw.Title,
    poster_path: raw.Poster !== "N/A" ? raw.Poster : null,
    release_date:
      raw.Released && raw.Released !== "N/A" ? raw.Released : raw.Year,
    vote_average: rating,
    vote_count: votes,
    overview: raw.Plot && raw.Plot !== "N/A" ? raw.Plot : "",
    genres,
    popularity: rating * votes, // Custom popularity score for fallback sorting
    adult: isAdult,
    runtime: raw.Runtime,
    director: raw.Director,
    actors: raw.Actors,
    language: raw.Language,
    awards: raw.Awards,
    boxOffice: raw.BoxOffice || "N/A",
  };
}

export const omdbApi = {
  getMovieDetails: async (imdbID: string): Promise<MovieDetail> => {
    const response = await omdbClient.get<OMDbMovieDetail>("", {
      params: { i: imdbID, plot: "full" },
    });
    return mapOMDbMovieDetail(response.data);
  },

  // Runs a text search, then resolves full details in parallel for the top 10 results
  getMoviesWithDetails: async (
    query: string,
    page = 1,
  ): Promise<{ results: MovieDetail[]; total_results: number }> => {
    const response = await omdbClient.get<OMDbSearchResponse>("", {
      params: { s: query, page, type: "movie" },
    });

    if (response.data.Response !== "True" || !response.data.Search) {
      return { results: [], total_results: 0 };
    }

    // Resolve details in parallel for each movie in the search results
    const detailPromises = response.data.Search.slice(0, 10).map((movie) =>
      omdbApi.getMovieDetails(movie.imdbID).catch(() => null),
    );

    const detailedMovies = await Promise.all(detailPromises);

    // Filter out failed detail fetches
    const results = detailedMovies.filter((m): m is MovieDetail => m !== null);
    const totalResults = parseInt(response.data.totalResults || "0", 10);

    return {
      results,
      total_results: isNaN(totalResults) ? results.length : totalResults,
    };
  },

  // Sections mapped to search terms as specified in OMDb requirements
  getNowPlaying: async (page = 1) => {
    return omdbApi.getMoviesWithDetails("2024", page);
  },

  getPopular: async (page = 1) => {
    return omdbApi.getMoviesWithDetails("marvel", page);
  },

  getTopRated: async (page = 1) => {
    return omdbApi.getMoviesWithDetails("oscar", page);
  },

  getUpcoming: async (page = 1) => {
    return omdbApi.getMoviesWithDetails("2025", page);
  },

  // Helper search by genre (OMDb doesn't have genres, so we search by genre name term)
  getMoviesByGenre: async (genre: string, page = 1) => {
    return omdbApi.getMoviesWithDetails(genre, page);
  },
};
