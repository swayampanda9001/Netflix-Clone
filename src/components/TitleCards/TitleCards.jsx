import React, { useEffect, useState } from "react";
import "./TitleCards.css";
import { movies_data } from "../../assets/data/card.data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]); //it will be empty coj it will store the data from api in form of array
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODU4MjM5MDAyNjhjM2JkMDg0OWQ5OThhNmUyOTMyOCIsIm5iZiI6MTczOTYxMzYzNS4zMzYsInN1YiI6IjY3YjA2NWMzMWYzODQxZWUxNzZjNDJjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5C3tDNitm-Rh7BkgGxT15G_k3xoP5CUts35IhkUIPsY",
    },
  };

  useEffect(() => {
    //jese hin page load hoga function run karega
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    ) //request bhejta hei iss wale link pe
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="cards-list">
        {apiData.map((movie, index) => (
          <Link to={`/player/${movie.id}`} key={index} className="titlecard">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.movieName}
            />
            <p>{movie.original_title}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TitleCards;
