import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchResults from "../../components/SearchResults/SearchResults";
import Footer from "../../components/Footer/Footer";
import { useMovies } from "../../context/MovieContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";
import "./Search.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const { searchMovies, searchResults, loading, error } = useMovies();
  const [user, authLoading] = useAuthState(auth);
  const [localQuery, setLocalQuery] = useState(query);
  const [isSearchActive, setIsSearchActive] = useState(true); // Always active on search page

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (query) {
      searchMovies(query);
      setLocalQuery(query);
    }
  }, [query, searchMovies]);

  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <Navbar searchPageActive={true} />
      
      <div className="search-page-content">
        <div className="search-header">
          <h1>Search Results</h1>
          {query && (
            <p className="search-query">
              Showing results for: <span>"{query}"</span>
            </p>
          )}
        </div>

        {loading && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>Searching movies...</p>
          </div>
        )}

        {error && (
          <div className="search-error">
            <h2>Search Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="back-home-btn">
              Back to Home
            </button>
          </div>
        )}

        {!loading && !error && query && searchResults.length === 0 && (
          <div className="no-results">
            <h2>No movies found</h2>
            <p>Try searching with different keywords</p>
            <button onClick={() => navigate('/')} className="back-home-btn">
              Back to Home
            </button>
          </div>
        )}

        {!loading && !error && query && searchResults.length > 0 && (
          <div className="search-results-container">
            <SearchResults />
          </div>
        )}

        {!query && (
          <div className="empty-search">
            <h2>Start your search</h2>
            <p>Use the search bar above to find movies</p>
            <button onClick={() => navigate('/')} className="back-home-btn">
              Back to Home
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
