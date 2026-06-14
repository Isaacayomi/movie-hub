import { useQuery } from '@tanstack/react-query';
import { omdbApi } from '../lib/api/omdb';
import { queryKeys } from '../lib/queryKeys';

export function useMovieDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.movies.detail(id),
    queryFn: () => omdbApi.getMovieDetails(id),
    enabled: !!id,
  });
}

export function useMovieSimilar(id: string, primaryGenre?: string) {
  return useQuery({
    queryKey: queryKeys.movies.similar(id),
    queryFn: async () => {
      if (!primaryGenre) return { results: [], total_results: 0 };
      const data = await omdbApi.getMoviesByGenre(primaryGenre);
      // Filter out the current movie itself from recommendations
      return {
        ...data,
        results: data.results.filter((m) => m.id !== id),
      };
    },
    enabled: !!id && !!primaryGenre,
  });
}
