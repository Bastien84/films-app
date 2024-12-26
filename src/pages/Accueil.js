import React, { useRef, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Card from "../components/Card";
import axios from "axios";

const Accueil = () => {
  const [queryResults, setQueryResults] = useState([]); // liste des films par rapport a la recherche de l'user
  const [genres, setGenres] = useState([]); // définit tout les genres et leurs id
  const searchValue = useRef(); // définit ce qui est tapé dans la barre de recherce

  const [topSorting, setTopSorting] = useState(false);
  const [flopSorting, setFlopSorting] = useState(false);

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

  // fonction qui récupere les resultats de la recherche
  const getQueryResults = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${searchValue.current.value}&language=fr-FR`
      )
      .then((res) => setQueryResults(res.data.results));
  };

  // valide la recherche quand on appuie sur enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getQueryResults();
    }
  };

  function toggleTop() {
    setFlopSorting(false);
    setTopSorting(!topSorting);
  }

  function toggleFlop() {
    setTopSorting(false);
    setFlopSorting(!flopSorting);
  }

  return (
    <div className="accueil">
      <Navigation />
      <input
        type="search"
        placeholder="Entrez le nom d'un film"
        ref={searchValue}
        onKeyDown={handleKeyPress}
      />
      <button className="search-btn" onClick={getQueryResults}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <div className="btn-container">
        <button onClick={() => toggleTop()}>Top 🠕</button>
        <button onClick={() => toggleFlop()}>Flop 🠗</button>
      </div>
      <div className="cards-container">
        {topSorting
          ? queryResults
              .sort((a, b) => b.vote_average - a.vote_average)
              .map((movie, index) => (
                <Card key={index} movie={movie} genres={genres} />
              ))
          : flopSorting
          ? queryResults
              .sort((a, b) => a.vote_average - b.vote_average)
              .map((movie, index) => (
                <Card key={index} movie={movie} genres={genres} />
              ))
          : queryResults.map((movie, index) => (
              <Card key={index} movie={movie} genres={genres} />
            ))}
      </div>
    </div>
  );
};

export default Accueil;
