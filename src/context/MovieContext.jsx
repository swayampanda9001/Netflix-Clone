import React, { createContext, useContext, useState, useCallback } from 'react';

const MovieContext = createContext();

// TMDB API configuration
const TMDB_API_KEY = "7858239002268c3bd0849d998a6e29328";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODU4MjM5MDAyNjhjM2JkMDg0OWQ5OThhNmUyOTMyOCIsIm5iZiI6MTczOTYxMzYzNS4zMzYsInN1YiI6IjY3YjA2NWMzMWYzODQxZWUxNzZjNDJjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5C3tDNitm-Rh7BkgGxT15G_k3xoP5CUts35IhkUIPsY",
  },
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch movies from TMDB API
  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, options);
      const data = await response.json();
      return data.results?.map(movie => ({
        id: movie.id,
        title: movie.title || movie.name,
        description: movie.overview,
        image: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/300/450',
        backdrop: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : '/api/placeholder/800/450',
        rating: movie.vote_average?.toFixed(1) || 'N/A',
        genre: movie.genre_ids?.[0] || 'Unknown',
        release_date: movie.release_date || movie.first_air_date,
        popularity: movie.popularity
      })) || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

    // Search movies using TMDB API
  const searchMovies = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use the exact TMDB search/movie endpoint format as shown
      const searchUrl = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
      const response = await fetch(searchUrl, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the TMDB response to our format
      const transformedResults = data.results?.map(movie => ({
        id: movie.id,
        title: movie.title || movie.original_title,
        description: movie.overview || 'No description available.',
        image: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/300/450',
        backdrop: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : '/api/placeholder/800/450',
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
        genre_ids: movie.genre_ids || [],
        release_date: movie.release_date,
        popularity: movie.popularity,
        vote_count: movie.vote_count,
        adult: movie.adult,
        original_language: movie.original_language
      })) || [];
      
      setSearchResults(transformedResults);
    } catch (error) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get movies by category
  const getMoviesByCategory = async (category) => {
    setLoading(true);
    setError(null);

    try {
      let endpoint;
      switch (category) {
        case 'trending':
          endpoint = '/trending/all/day';
          break;
        case 'popular':
          endpoint = '/movie/popular';
          break;
        case 'top_rated':
          endpoint = '/movie/top_rated';
          break;
        case 'upcoming':
          endpoint = '/movie/upcoming';
          break;
        case 'now_playing':
          endpoint = '/movie/now_playing';
          break;
        case 'action':
          endpoint = '/discover/movie?with_genres=28';
          break;
        case 'comedy':
          endpoint = '/discover/movie?with_genres=35';
          break;
        case 'horror':
          endpoint = '/discover/movie?with_genres=27';
          break;
        case 'romance':
          endpoint = '/discover/movie?with_genres=10749';
          break;
        case 'sci-fi':
          endpoint = '/discover/movie?with_genres=878';
          break;
        default:
          endpoint = '/movie/popular';
      }

      const results = await fetchMovies(endpoint);
      return results;
    } catch (error) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Category fetch error:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get trending movies
  const getTrendingMovies = async () => {
    return await getMoviesByCategory('trending');
  };

  // Get movie details by ID
  const getMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}`, options);
      const movie = await response.json();
      
      return {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        image: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/300/450',
        backdrop: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : '/api/placeholder/800/450',
        rating: movie.vote_average?.toFixed(1) || 'N/A',
        genres: movie.genres?.map(g => g.name) || [],
        release_date: movie.release_date,
        runtime: movie.runtime,
        tagline: movie.tagline,
        popularity: movie.popularity
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };

  const value = {
    movies,
    searchResults,
    loading,
    error,
    searchMovies,
    getMoviesByCategory,
    getTrendingMovies,
    getMovieDetails,
    setSearchResults,
    setMovies,
    TMDB_IMAGE_BASE_URL
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
