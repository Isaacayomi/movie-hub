# MovieHub — Frontend Engineer Assessment

## Objective

Build a modern movie discovery dashboard using React.js, TypeScript, Vite, and Tailwind CSS.

## Required Stack

- React.js
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- React Router
- Axios

## API

Use TMDB API — base URL: `https://api.themoviedb.org/3`
Image base URL: `https://image.tmdb.org/t/p/w500`
API key stored in `.env` as `VITE_TMDB_API_KEY`

## Pages

### 1. Home Page (`/`)

- Sidebar navigation (Home, Popular, Top Rated, Upcoming)
- Search input in navbar
- "Discover Movies" heading with subtitle
- Two movie sections: Now Playing and Popular Movies
- Each section has a "View all" link and a horizontal card grid
- Loading, error, and empty states required

### 2. Search & Filters Page (`/search`)

- Debounced search input (500ms)
- Filter dropdowns: Genre, Year, Rating, Sort By
- Clear Filters button
- Results count display
- Movie card grid with loading, error, empty states

### 3. Movie Detail Page (`/movie/:id`)

- Back button
- Large poster on the left
- Title, year, runtime, age rating
- Star rating with vote count
- Add to Favorites button
- Overview section
- Genre pills
- Metadata table: Release Date, Director, Cast, Language, Budget, Revenue
- Similar Movies horizontal scroll section at the bottom

## Movie Card — Required Fields

- Poster image
- Movie title
- Release year
- Rating badge (star icon + score)

## API Endpoints Needed

- GET /movie/now_playing
- GET /movie/popular
- GET /movie/top_rated
- GET /movie/upcoming
- GET /search/movie?query=&page=
- GET /movie/{id}
- GET /movie/{id}/similar
- GET /genre/movie/list
- GET /movie/{id}/credits

## Folder Structure

src/

components/

layout/ # Sidebar, Navbar

ui/ # MovieCard, LoadingState, ErrorState, EmptyState

pages/ # HomePage, SearchPage, MovieDetailPage

hooks/ # useMovies, useSearch, useMovieDetail

lib/

api/ # tmdb.ts — axios instance + all API calls

queryKeys.ts

types/ # movie.ts

router.tsx

## Design Reference

- See mockup.png in project root
- White background
- Blue accent color: #2563EB
- Sidebar on the left, main content on the right
- Clean, modern UI

## Engineering Standards

- No `any` types
- No `console.log`
- All async states handled (loading, error, empty)
- Clean, reusable components
- TypeScript strict mode
- Maintainable folder structure

## Submission

- Public GitHub repository
- README.md with setup instructions
