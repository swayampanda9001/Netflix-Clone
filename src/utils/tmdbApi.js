// TMDB API utilities
export const TMDB_API_KEY = "7858239002268c3bd0849d998a6e29328";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODU4MjM5MDAyNjhjM2JkMDg0OWQ5OThhNmUyOTMyOCIsIm5iZiI6MTczOTYxMzYzNS4zMzYsInN1YiI6IjY3YjA2NWMzMWYzODQxZWUxNzZjNDJjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5C3tDNitm-Rh7BkgGxT15G_k3xoP5CUts35IhkUIPsY",
  },
};

// Movie categories mapping
export const MOVIE_CATEGORIES = {
  trending: '/trending/all/day',
  popular: '/movie/popular',
  top_rated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  now_playing: '/movie/now_playing',
  action: '/discover/movie?with_genres=28',
  comedy: '/discover/movie?with_genres=35',
  horror: '/discover/movie?with_genres=27',
  romance: '/discover/movie?with_genres=10749',
  'sci-fi': '/discover/movie?with_genres=878',
  drama: '/discover/movie?with_genres=18',
  thriller: '/discover/movie?with_genres=53',
  animation: '/discover/movie?with_genres=16',
  documentary: '/discover/movie?with_genres=99',
  family: '/discover/movie?with_genres=10751'
};

// Genre ID mapping
export const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

// Transform TMDB movie data to our format
export const transformMovieData = (movie) => ({
  id: movie.id,
  title: movie.title || movie.name,
  description: movie.overview || 'No description available.',
  image: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/300/450',
  backdrop: movie.backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}` : '/api/placeholder/800/450',
  rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
  genre: movie.genre_ids?.[0] ? GENRE_MAP[movie.genre_ids[0]] || 'Unknown' : 'Unknown',
  release_date: movie.release_date || movie.first_air_date,
  popularity: movie.popularity,
  type: movie.media_type || 'movie'
});

// Fetch movies from TMDB API
export const fetchMoviesFromTMDB = async (endpoint) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results?.map(transformMovieData) || [];
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    throw error;
  }
};

// Search movies using the exact TMDB API format
export const searchMoviesAPI = async (query, page = 1, includeAdult = false) => {
  if (!query.trim()) return { results: [], total_pages: 0, total_results: 0 };
  
  try {
    const searchUrl = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=${includeAdult}&language=en-US&page=${page}`;
    const response = await fetch(searchUrl, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the full response with transformed results
    return {
      page: data.page,
      results: data.results?.map(movie => ({
        id: movie.id,
        title: movie.title || movie.original_title,
        original_title: movie.original_title,
        description: movie.overview || 'No description available.',
        image: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/300/450',
        backdrop: movie.backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}` : '/api/placeholder/800/450',
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
        genre_ids: movie.genre_ids || [],
        release_date: movie.release_date,
        popularity: movie.popularity,
        vote_count: movie.vote_count,
        adult: movie.adult,
        original_language: movie.original_language,
        video: movie.video
      })) || [],
      total_pages: data.total_pages,
      total_results: data.total_results
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Multi search (movies, TV shows, people) - alternative search function
export const searchMultiAPI = async (query, page = 1) => {
  if (!query.trim()) return { results: [], total_pages: 0, total_results: 0 };
  
  try {
    const searchUrl = `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
    const response = await fetch(searchUrl, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      page: data.page,
      results: data.results?.map(item => transformMovieData(item)) || [],
      total_pages: data.total_pages,
      total_results: data.total_results
    };
  } catch (error) {
    console.error('Error in multi search:', error);
    throw error;
  }
};

// Get movies by category
export const getMoviesByCategory = async (category) => {
  const endpoint = MOVIE_CATEGORIES[category] || MOVIE_CATEGORIES.popular;
  return await fetchMoviesFromTMDB(endpoint);
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const movie = await response.json();
    
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview || 'No description available.',
      image: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/300/450',
      backdrop: movie.backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}` : '/api/placeholder/800/450',
      rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
      genres: movie.genres?.map(g => g.name) || [],
      release_date: movie.release_date,
      runtime: movie.runtime,
      tagline: movie.tagline || '',
      popularity: movie.popularity,
      budget: movie.budget,
      revenue: movie.revenue,
      imdb_id: movie.imdb_id
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Get movie videos (trailers, etc.)
export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};
