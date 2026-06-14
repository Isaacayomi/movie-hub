import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Heart, Clock, Film } from "lucide-react";
import { useMovieDetail, useMovieSimilar } from "../hooks/useMovieDetail";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/ui/MovieCard";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const movieId = id || "";

  // API Hooks
  const {
    data: movie,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    refetch: refetchDetail,
  } = useMovieDetail(movieId);

  // Similar movies based on the first/primary genre
  const primaryGenre = movie?.genres?.[0];
  const { data: similar, isLoading: isLoadingSimilar } = useMovieSimilar(
    movieId,
    primaryGenre,
  );

  const handleRetry = () => {
    refetchDetail();
  };

  if (isLoadingDetail) {
    return (
      <div className="container mx-auto px-6 py-12">
        <LoadingState variant="spinner" />
      </div>
    );
  }

  if (isErrorDetail || !movie) {
    return (
      <div className="container mx-auto px-6 py-12">
        <ErrorState
          message="Failed to load movie details."
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Favorites logic
  const movieToSave = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    overview: movie.overview,
    genres: movie.genres,
    popularity: movie.popularity || 0,
    adult: movie.adult,
  };

  const favorited = isFavorite(movie.id);

  const releaseYear = movie.release_date
    ? movie.release_date.match(/\d{4}/)?.[0] || movie.release_date
    : "N/A";

  const posterUrl = movie.poster_path;
  const ratingText = movie.adult ? "R" : "PG-13"; // fallbacks

  return (
    <div className="container mx-auto px-6 py-8 space-y-10">
      {/* Back Navigation Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </button>
      </div>

      {/* Movie Main Information Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Column: Poster Image */}
        <div className="w-full md:w-80 lg:w-[360px] flex-none">
          <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/50 shadow-xl shadow-slate-200/50 aspect-[2/3]">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8">
                <Film className="w-16 h-16 mb-4 stroke-[1.5]" />
                <span className="text-sm font-bold text-center leading-snug">
                  {movie.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Descriptions & Metadata */}
        <div className="flex-1 space-y-6">
          {/* Header Metadata */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold">
                {ratingText}
              </span>
              <span>{releaseYear}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {movie.runtime || "N/A"}
              </span>
            </div>
          </div>

          {/* Rating & Favorites Button */}
          <div className="flex flex-wrap items-center gap-4 py-2 border-y border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-600 text-sm font-extrabold border border-amber-100">
                <Star className="w-4 h-4 fill-current" />
                <span>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                ({movie.vote_count ? movie.vote_count.toLocaleString() : 0}{" "}
                votes)
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(movieToSave)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95 shadow-sm border ${
                favorited
                  ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${favorited ? "fill-current text-rose-500" : ""}`}
              />
              {favorited ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>

          {/* Overview */}
          <div className="space-y-2.5">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Overview
            </h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
              {movie.overview || "No description available for this movie."}
            </p>
          </div>

          {/* Genre Pills */}
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100/50"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Metadata Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-3xl">
            <table className="w-full text-left border-collapse text-sm">
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-400 w-1/3 text-xs uppercase tracking-wider">
                    Release Date
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {movie.release_date || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">
                    Director
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-semibold">
                    {movie.director || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">
                    Top Cast
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {movie.actors || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">
                    Language
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {movie.language || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">
                    Budget
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium">N/A</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">
                    Revenue (Box Office)
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {movie.boxOffice || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <section className="space-y-6 pt-6 border-t border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Similar Movies
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Recommended based on this title's genre
          </p>
        </div>

        {isLoadingSimilar ? (
          <LoadingState variant="row" />
        ) : !similar?.results || similar.results.length === 0 ? (
          <div className="py-6 text-center text-sm font-semibold text-slate-400">
            No similar movies found.
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
            {similar.results.slice(0, 10).map((similarMovie) => (
              <div key={similarMovie.id} className="flex-none w-48">
                <MovieCard movie={similarMovie} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
