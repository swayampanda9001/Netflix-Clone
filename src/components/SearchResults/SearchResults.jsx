import React from 'react';
import { useMovies } from '../../context/MovieContext';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ showTitle = true }) => {
  const { searchResults, loading, error } = useMovies();

  if (loading) {
    return (
      <div className="search-results loading">
        <div className="loading-spinner"></div>
        <p>Searching movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results error">
        <h2>Search Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return showTitle ? (
      <div className="search-results empty">
        <h2>No movies found</h2>
        <p>Try searching with different keywords</p>
      </div>
    ) : null;
  }

  return (
    <div className="search-results">
      {showTitle && <h2>Search Results ({searchResults.length} movies found)</h2>}
      <div className="search-results-grid">
        {searchResults.map((movie) => (
          <Link to={`/player/${movie.id}`} key={movie.id} className="search-result-card">
            <img 
              src={movie.image} 
              alt={movie.title}
              // onError={(e) => {
              //   e.target.src = '/api/placeholder/300/450';
              // }}
            />
            <div className="search-result-info">
              <h3>{movie.title}</h3>
              {movie.original_title && movie.original_title !== movie.title && (
                <p className="original-title">Original: {movie.original_title}</p>
              )}
              <p className="search-result-description">
                {movie.description || 'No description available.'}
              </p>
              <div className="search-result-meta">
                <span className="rating">⭐ {movie.rating}</span>
                {movie.release_date && (
                  <span className="release-date">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
                {movie.vote_count > 0 && (
                  <span className="vote-count">
                    {movie.vote_count} votes
                  </span>
                )}
              </div>
              {movie.original_language && movie.original_language !== 'en' && (
                <span className="language-badge">
                  {movie.original_language.toUpperCase()}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
