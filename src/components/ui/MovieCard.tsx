import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, Film } from "lucide-react";
import type { Movie } from "../../types/movie";
import { useFavorites } from "../../hooks/useFavorites";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const releaseYear = movie.release_date
    ? movie.release_date.match(/\d{4}/)?.[0] || movie.release_date
    : "N/A";

  const imageUrl = movie.poster_path;

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4">
            <Film className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-xs font-semibold text-center leading-snug">
              {movie.title}
            </span>
          </div>
        )}

        {/* Favorite Heart Overlay Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 active:scale-90 shadow-sm ${
            favorited
              ? "bg-rose-500 text-white shadow-rose-500/20"
              : "bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500"
          }`}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              favorited ? "fill-current scale-110" : ""
            }`}
          />
        </button>

        {/* Rating Badge Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
          <span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
          </span>
        </div>
      </div>

      {/* Info Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-semibold text-sm text-slate-800 line-clamp-1 group-hover:text-accent transition-colors leading-tight mb-1">
          {movie.title}
        </h4>
        <span className="text-xs text-slate-400 font-medium">
          {releaseYear}
        </span>
      </div>
    </Link>
  );
}
