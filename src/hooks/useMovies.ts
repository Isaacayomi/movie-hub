import { useQuery } from "@tanstack/react-query";
import { omdbApi } from "../lib/api/omdb";
import { queryKeys } from "../lib/queryKeys";

export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: queryKeys.movies.nowPlaying(page),
    queryFn: () => omdbApi.getNowPlaying(page),
  });
}

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: queryKeys.movies.popular(page),
    queryFn: () => omdbApi.getPopular(page),
  });
}

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: queryKeys.movies.topRated(page),
    queryFn: () => omdbApi.getTopRated(page),
  });
}

export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: queryKeys.movies.upcoming(page),
    queryFn: () => omdbApi.getUpcoming(page),
  });
}
