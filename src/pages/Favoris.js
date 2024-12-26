import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Card from "../components/Card";
import axios from "axios";

const Favoris = () => {
  const [genres, setGenres] = useState([]); // définit tout les genres et leurs id
  const [favoris, setFavoris] = useState([]);

  // Charger les films favoris depuis le localStorage
  useEffect(() => {
    if (favoris) {
      const storedFavorites = JSON.parse(localStorage.getItem("favoris"));
      setFavoris(storedFavorites);
    } else {
      setFavoris([]);
    }
  }, []);

  // récuperes les genres dans l'api
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzRiYTNlYWFjNDM1YTFjYWQ5NjY2ZjYyYzNiN2YzOSIsIm5iZiI6MTcyNTU1MTc5NC41NTQ2MTgsInN1YiI6IjY2ZDFkMmNiNTIwYWI5ZDcyZjk2NDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mQp2iL2COM15HAn3xrskKEdEHWRLYyBn_lV-w5f3itI",
      },
    };

    axios
      .get("https://api.themoviedb.org/3/genre/movie/list?language=fr", options)
      .then((res) => setGenres(res.data.genres));
  }, []);

  // Supprimer un film par son ID
  const handleDelete = (movieId) => {
    const updatedFavoris = favoris.filter((movie) => movie.id !== movieId);
    setFavoris(updatedFavoris);
    localStorage.setItem("favoris", JSON.stringify(updatedFavoris));
  };

  return (
    <div className="favoris">
      <Navigation />
      <div className="cards-container">
        {favoris && favoris.length > 0 ? (
          favoris.map((movie, index) => (
            <Card
              key={index}
              movie={movie}
              genres={genres}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Aucun film ajouté aux favoris.</p>
        )}
      </div>
    </div>
  );
};

export default Favoris;
