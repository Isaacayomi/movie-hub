import { Link } from "react-router-dom";
import { ChevronRight, Flame } from "lucide-react";
import { useNowPlayingMovies, usePopularMovies } from "../hooks/useMovies";
import MovieCard from "../components/ui/MovieCard";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";

export default function HomePage() {
  const {
    data: nowPlayingData,
    isLoading: isLoadingNowPlaying,
    error: errorNowPlaying,
    refetch: refetchNowPlaying,
  } = useNowPlayingMovies();

  const {
    data: popularData,
    isLoading: isLoadingPopular,
    error: errorPopular,
    refetch: refetchPopular,
  } = usePopularMovies();

  const handleRetry = () => {
    refetchNowPlaying();
    refetchPopular();
  };

  const showLoading = isLoadingNowPlaying || isLoadingPopular;
  const showError = errorNowPlaying || errorPopular;

  if (showError) {
    return (
      <div className="container mx-auto px-6 py-12">
        <ErrorState
          message="Failed to load movies. Please check your API key and connection."
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const nowPlayingMovies = nowPlayingData?.results?.slice(0, 10) || [];
  const popularMovies = popularData?.results?.slice(0, 10) || [];

  return (
    <div className="container mx-auto px-6 py-8 space-y-12">
      {/* Hero Welcome Section */}
      <section className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-8 md:p-12 text-white shadow-xl shadow-blue-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-xl">
            Explore a curated selection of now playing releases, trending hits,
            top-rated blockbusters, and anticipated titles.
          </p>
        </div>

        {/* Subtle Decorative Circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      </section>

      {/* Now Playing Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Now Playing
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Currently screening in theatres worldwide
            </p>
          </div>
          <Link
            to="/search?sort_by=popularity.desc"
            className="group flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            View all
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {showLoading ? (
          <LoadingState variant="row" />
        ) : nowPlayingMovies.length === 0 ? (
          <EmptyState
            title="No active releases"
            description="Check back soon for new releases."
          />
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
            {nowPlayingMovies.map((movie) => (
              <div key={movie.id} className="flex-none w-48">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popular Movies Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Popular Movies
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Most watched movies today
            </p>
          </div>
          <Link
            to="/search?sort_by=popularity.desc"
            className="group flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            View all
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {showLoading ? (
          <LoadingState variant="row" />
        ) : popularMovies.length === 0 ? (
          <EmptyState
            title="No popular movies"
            description="Check back later for movie listings."
          />
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="flex-none w-48">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
