import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/movie";

interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("moviehub_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Ignore reading errors
    }
  }, []);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      let updated: Movie[];
      if (exists) {
        updated = prev.filter((m) => m.id !== movie.id);
      } else {
        updated = [...prev, movie];
      }
      try {
        localStorage.setItem("moviehub_favorites", JSON.stringify(updated));
      } catch {
        // Ignore writing errors
      }
      return updated;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((m) => m.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
