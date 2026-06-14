import { useQuery } from "@tanstack/react-query";
import { omdbApi } from "../lib/api/omdb";
import { queryKeys } from "../lib/queryKeys";
import type { MovieDetail } from "../types/movie";

export interface SearchFilters {
  [key: string]: string | number | undefined;
  genre?: string;
  year?: string;
  rating?: string;
  sort_by?: string;
}

export function useSearch(query: string, filters: SearchFilters, page = 1) {
  // If there's no search query, we search OMDb by selected genre or a fallback keyword
  const searchTerm = query.trim() || filters.genre || "2024";

  return useQuery<{ results: MovieDetail[]; total_results: number }>({
    queryKey: queryKeys.movies.search(query, filters, page),
    queryFn: () => omdbApi.getMoviesWithDetails(searchTerm, page),
    select: (data) => {
      let results = [...data.results];

      // 1. Filter by Genre (OMDb Genre list is a split array of strings)
      if (filters.genre) {
        const targetGenre = String(filters.genre).toLowerCase();
        results = results.filter((movie) =>
          movie.genres.some((g) => g.toLowerCase() === targetGenre),
        );
      }

      // 2. Filter by Year
      if (filters.year) {
        results = results.filter(
          (movie) =>
            movie.release_date &&
            movie.release_date.includes(String(filters.year)),
        );
      }

      // 3. Filter by Rating
      if (filters.rating) {
        const minRating = Number(filters.rating);
        results = results.filter((movie) => movie.vote_average >= minRating);
      }

      // 4. Sort results
      if (filters.sort_by) {
        const sort = filters.sort_by;
        if (sort === "popularity.desc") {
          results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        } else if (sort === "popularity.asc") {
          results.sort((a, b) => (a.popularity || 0) - (b.popularity || 0));
        } else if (sort === "vote_average.desc") {
          results.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        } else if (sort === "vote_average.asc") {
          results.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
        } else if (sort === "primary_release_date.desc") {
          results.sort((a, b) => {
            const yearA = parseInt(
              a.release_date.match(/\d{4}/)?.[0] || "0",
              10,
            );
            const yearB = parseInt(
              b.release_date.match(/\d{4}/)?.[0] || "0",
              10,
            );
            return yearB - yearA;
          });
        } else if (sort === "primary_release_date.asc") {
          results.sort((a, b) => {
            const yearA = parseInt(
              a.release_date.match(/\d{4}/)?.[0] || "0",
              10,
            );
            const yearB = parseInt(
              b.release_date.match(/\d{4}/)?.[0] || "0",
              10,
            );
            return yearA - yearB;
          });
        }
      }

      return {
        ...data,
        results,
        total_results: results.length,
      };
    },
  });
}

// Return the hardcoded genre list since OMDb has no genre endpoint
export function useGenres() {
  const genres = [
    { id: "Action", name: "Action" },
    { id: "Comedy", name: "Comedy" },
    { id: "Drama", name: "Drama" },
    { id: "Horror", name: "Horror" },
    { id: "Sci-Fi", name: "Sci-Fi" },
    { id: "Thriller", name: "Thriller" },
    { id: "Romance", name: "Romance" },
    { id: "Animation", name: "Animation" },
    { id: "Adventure", name: "Adventure" },
    { id: "Crime", name: "Crime" },
  ];

  return {
    data: { genres },
    isLoading: false,
    isSuccess: true,
  };
}
