import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <h1>FILMS</h1>
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Accueil</li>
        </NavLink>
        <NavLink
          to="/favoris"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Coups de coeur</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
