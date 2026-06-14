# MovieHub — Movie Discovery Dashboard

A modern movie discovery web application.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- React Router
- Axios
- OMDb API

## Features

- Browse movies by category — Now Playing, Popular, Top Rated, Upcoming
- Search movies with debounced input
- Filter by genre, year, rating, and sort order
- Clear filters functionality
- Movie detail page with full metadata, cast, genres, and similar movies
- Add to Favorites toggle
- Loading, error, and empty states throughout
- Fully typed with TypeScript strict mode

## Getting Started

### Prerequisites

- Node.js 18+
- An OMDb API key (free at omdbapi.com)

### Setup

1. Clone the repository

```bash
git clone https://github.com/Isaacayomi/movie-hub.git
cd movie-hub
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root and add your OMDb API key
   VITE_OMDB_API_KEY=your_api_key_here

4. Start the development server

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

src/

components/

layout/ # Sidebar, Navbar

ui/ # MovieCard, LoadingState, ErrorState, EmptyState

pages/ # HomePage, SearchPage, MovieDetailPage

hooks/ # useMovies, useSearch, useMovieDetail

lib/

api/ # omdb.ts — axios instance + all API calls

queryKeys.ts

types/ # movie.ts

router.tsx
