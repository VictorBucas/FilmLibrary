import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${API_URL}&i=${id}`);
      const data = await res.json();
      console.log(API_URL)
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Chargement...</p>;

  return (
    <div className="movie-details">
      

      <div className="details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="movie-poster"
        />

        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Synopsis:</strong> {movie.Plot}</p>
        </div>
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

export default MovieDetails;