import React, { useEffect, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const { getMoviesByCategory, loading, error, TMDB_IMAGE_BASE_URL } = useMovies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryToFetch = category || "now_playing";
        const movies = await getMoviesByCategory(categoryToFetch);
        setApiData(movies.slice(0, 15)); // Limit to 15 movies for better performance
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchData();
  }, [category, getMoviesByCategory]);

  if (loading && apiData.length === 0) {
    return (
      <div className="title-cards-loading">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className="loading-placeholder">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="card-placeholder"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error && apiData.length === 0) {
    return (
      <div className="title-cards-error">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <p>Failed to load movies. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="title-cards-container">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="cards-list">
        {apiData.map((movie) => (
          <Link to={`/player/${movie.id}`} key={movie.id} className="titlecard">
            <img
              src={movie.image}
              alt={movie.title}
              onError={(e) => {
                e.target.src = '/api/placeholder/300/450';
              }}
            />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
