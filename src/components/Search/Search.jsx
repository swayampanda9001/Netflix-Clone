import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useMovies } from '../../context/MovieContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';

const Search = ({ onSearchToggle, isSearchActive }) => {
  const [query, setQuery] = useState('');
  const { searchMovies, setSearchResults } = useMovies();
  const navigate = useNavigate();
  const location = useLocation();
  const isOnSearchPage = location.pathname === '/search';
  const searchTimeoutRef = useRef(null);

  // Initialize query from URL params if on search page
  useEffect(() => {
    if (isOnSearchPage) {
      const urlParams = new URLSearchParams(location.search);
      const urlQuery = urlParams.get('q') || '';
      setQuery(urlQuery);
    }
  }, [isOnSearchPage, location.search]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const performSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      if (!isOnSearchPage) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`, { replace: true });
        searchMovies(searchQuery);
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (value.trim()) {
      // Set new timeout for debounced search
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const toggleSearch = () => {
    if (isSearchActive && query) {
      setQuery('');
      setSearchResults([]);
    }
    
    // If search is not active and we're not on search page, navigate there
    if (!isSearchActive && !isOnSearchPage) {
      navigate('/search');
      return;
    }
    
    onSearchToggle(!isSearchActive);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setQuery('');
      setSearchResults([]);
      if (isOnSearchPage) {
        navigate('/');
      } else {
        onSearchToggle(false);
      }
    }
    if (e.key === 'Enter' && query.trim()) {
      // Clear timeout and perform immediate search
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      if (!isOnSearchPage) {
        onSearchToggle(false);
      }
    }
  };

  return (
    <div className="search-container">
      <CiSearch className="search-icon" onClick={toggleSearch} />
      <input
        type="text"
        className={`search-input ${isSearchActive ? 'active' : ''}`}
        placeholder="Search movies, TV shows..."
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        onBlur={() => {
          // Small delay to allow clicking on search results
          setTimeout(() => {
            if (!query) {
              onSearchToggle(false);
            }
          }, 200);
        }}
        autoFocus={isSearchActive}
      />
    </div>
  );
};

export default Search;
