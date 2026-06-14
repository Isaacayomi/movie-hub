import { useSearchParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useSearch, useGenres } from "../hooks/useSearch";
import { useDebounce } from "../hooks/useDebounce";
import MovieCard from "../components/ui/MovieCard";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const rawQuery = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";
  const rating = searchParams.get("rating") || "";
  const sortBy = searchParams.get("sort_by") || "popularity.desc";

  // Debounce the text search query (500ms)
  const debouncedQuery = useDebounce(rawQuery, 500);

  // Fetch genres for the dropdown
  const { data: genresData } = useGenres();

  // Fetch movies based on debounced search + filters
  const { data, isLoading, isError, refetch } = useSearch(
    debouncedQuery,
    { genre, year, rating, sort_by: sortBy },
    1, // page 1
  );

  // Generate years from current year down to 1950
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) =>
    String(currentYear - i),
  );

  // Rating filter options
  const ratings = [
    { label: "5+ Stars", value: "5" },
    { label: "6+ Stars", value: "6" },
    { label: "7+ Stars", value: "7" },
    { label: "8+ Stars", value: "8" },
    { label: "9+ Stars", value: "9" },
  ];

  // Sorting options matching TMDB api specifications
  const sortOptions = [
    { label: "Popularity (High)", value: "popularity.desc" },
    { label: "Popularity (Low)", value: "popularity.asc" },
    { label: "Rating (High)", value: "vote_average.desc" },
    { label: "Rating (Low)", value: "vote_average.asc" },
    { label: "Release Date (New)", value: "primary_release_date.desc" },
    { label: "Release Date (Old)", value: "primary_release_date.asc" },
  ];

  const updateFilter = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams);
    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
    setSearchParams(currentParams);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    rawQuery || genre || year || rating || sortBy !== "popularity.desc";
  const movies = data?.results || [];

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Search Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {rawQuery ? `Search results for "${rawQuery}"` : "Explore & Filter"}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Refine your discovery with advanced category and rating options
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
          {/* Genre Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => updateFilter("genre", e.target.value)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 cursor-pointer"
            >
              <option value="">All Genres</option>
              {genresData?.genres.map((g) => (
                <option key={g.id} value={String(g.id)}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => updateFilter("year", e.target.value)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 cursor-pointer"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => updateFilter("rating", e.target.value)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 cursor-pointer"
            >
              <option value="">All Ratings</option>
              {ratings.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => updateFilter("sort_by", e.target.value)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-500 border border-rose-100 hover:border-rose-500 rounded-xl transition-all duration-200 md:self-end h-[38px] active:scale-95 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Results:{" "}
          {movies.length === 0 && !isLoading ? "0" : data?.total_results || "0"}{" "}
          movies found
        </span>
      </div>

      {/* Movies Grid */}
      {isLoading ? (
        <LoadingState variant="grid" count={12} />
      ) : isError ? (
        <ErrorState
          message="An error occurred while fetching search results."
          onRetry={refetch}
        />
      ) : movies.length === 0 ? (
        <EmptyState
          title="No results match your criteria"
          description="We couldn't find any movies matching your current filters or text search query."
          actionButton={
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Clear All Filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
