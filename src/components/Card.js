import React, { useState, useEffect } from "react";
import { parse, format } from "date-fns";

const Card = ({ movie, genres, onDelete }) => {
  const [favoris, setFavoris] = useState([]);

  // Charger les favoris depuis le localStorage au montage du composant
  useEffect(() => {
    const storedFavoris = JSON.parse(localStorage.getItem("favoris")) || [];
    setFavoris(storedFavoris);
  }, []);

  // fonction qui ajoute un film aux coups de coeurs (dans le local storage)
  function addFav(movie) {
    // Lire les favoris existants dans le localStorage
    const existingFavorites = JSON.parse(localStorage.getItem("favoris")) || [];
    // Ajouter le nouveau film au tableau
    const updatedFavorites = [...existingFavorites, movie];
    setFavoris(updatedFavorites);
    // Enregistrer le tableau mis à jour dans le localStorage
    localStorage.setItem("favoris", JSON.stringify(updatedFavorites));
  }

  function delFav(movie) {
    // Lire les favoris existants dans le localStorage
    const existingFavorites = JSON.parse(localStorage.getItem("favoris")) || [];
    const updatedFavoris = existingFavorites.filter(
      (fav) => fav.id !== movie.id
    ); // affiche tout les films ayant un id différent du film effacé
    setFavoris(updatedFavoris); // Met à jour l'état local
    localStorage.setItem("favoris", JSON.stringify(updatedFavoris)); // Réenregistre dans le localStorage

    // Informer le parent pour effacer la carte
    if (onDelete) {
      onDelete(movie.id);
    }
  }

  // fonction qui affiche les genres, en fonction de la présence de l'id d'un ou plusieurs genres
  const getGenres = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name) // si un genre id est correspondant, renvoie le name, sinon renvoie rien (?.)
      .filter(Boolean) // retire tout les elements falsy
      .map((genre, index) => <li key={index}>{genre}</li>); // Retourne chaque genre dans un <li>
  };

  const formatDate = (releaseDate) => {
    if (!releaseDate) return;
    const date = parse(releaseDate, "yyyy-MM-dd", new Date()); // transforme la date string en format date

    return format(date, "dd/MM/yyyy"); // modifie le format de la date
  };

  return (
    <div className="card">
      <div
        className={
          favoris.some((fav) => fav.id === movie.id)
            ? "icon-container"
            : "hide-icon"
        }
      >
        <img src="./heart.png" alt="" />
      </div>
      <img
        src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
        alt=""
      />
      <h2>{movie.title}</h2>
      <h3>Sorti le : {formatDate(movie.release_date)}</h3>
      <h4>
        {movie.vote_average.toFixed(1)}/10 <i className="fa-solid fa-star"></i>
      </h4>
      <ul>{getGenres(movie.genre_ids)}</ul>
      <h5>Synopsis :</h5>
      <p>{movie.overview}</p>

      {favoris.some((fav) => fav.id === movie.id) ? (
        <button onClick={() => delFav(movie)}>
          Retirer des coups de coeurs
        </button>
      ) : (
        <button onClick={() => addFav(movie)}>
          Ajouter aux coups de coeur
        </button>
      )}
    </div>
  );
};

export default Card;
