export const queryKeys = {
  movies: {
    all: ['movies'] as const,
    nowPlaying: (page: number) => [...queryKeys.movies.all, 'now_playing', { page }] as const,
    popular: (page: number) => [...queryKeys.movies.all, 'popular', { page }] as const,
    topRated: (page: number) => [...queryKeys.movies.all, 'top_rated', { page }] as const,
    upcoming: (page: number) => [...queryKeys.movies.all, 'upcoming', { page }] as const,
    detail: (id: string | number) => [...queryKeys.movies.all, 'detail', String(id)] as const,
    credits: (id: string | number) => [...queryKeys.movies.all, 'credits', String(id)] as const,
    similar: (id: string | number) => [...queryKeys.movies.all, 'similar', String(id)] as const,
    search: (query: string, filters: Record<string, string | number | undefined>, page: number) => 
      [...queryKeys.movies.all, 'search', query, filters, { page }] as const,
    discover: (filters: Record<string, string | number | undefined>, page: number) => 
      [...queryKeys.movies.all, 'discover', filters, { page }] as const,
  },
  genres: ['genres'] as const,
};
