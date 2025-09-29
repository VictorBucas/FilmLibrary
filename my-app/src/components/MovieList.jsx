import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

function MovieList() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false); // savoir si une recherche a été faite

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(`${API_URL}&s=${query}`);
      if (!res.ok) throw new Error("Problème réseau, réessaie plus tard.");

      const data = await res.json();
      if (data.Response === "False") {
        setMovies([]);
        setError("Aucun film trouvé.");
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Librairie de films</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cherche un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies();
            }
          }}
          className="search-input"
        />

        <button onClick={searchMovies} className="search-btn">
          Rechercher
        </button>
      </div>

      <div className="movie-list" style={{ marginTop: "1rem" }}>
        {!searched && !loading && !error && movies.length === 0 && (
          <p>🔎 Recherche un film pour commencer…</p>
        )}

        {loading && <p>⏳ Loading…</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading &&
          !error &&
          movies.length > 0 &&
          movies.map((movie) => (
            <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
              <div className="movie-card">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                  alt={movie.Title}
                />
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default MovieList;
