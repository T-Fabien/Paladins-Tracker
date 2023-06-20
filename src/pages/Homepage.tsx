import React from "react";
import Under_Construction from "../components/UnderConstruction";
import { NavLink } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="homepage">
      <h1>Bienvenue sur Paladins-Tracker</h1>
      <section>
        <h2>Liste des champions</h2>
        <p>
          Consultez notre liste complète des champions avec leurs statistiques
          détaillées.
        </p>
        <NavLink to="/champions">Découvrir les champions</NavLink>
      </section>
      <section >
        <h2>Tier list</h2>
        <p>
          Découvrez notre évaluation des champions en fonction de leur puissance
          et de leur utilité.
        </p>
        <NavLink to="/tierlist">Consulter la tier list</NavLink>
      </section>
      <section>
        <h2>Suivi des joueurs</h2>
        <p>
          Suivez les statistiques d'un joueur spécifique et consultez son
          historique de parties.
        </p>
        <NavLink to="/tracker">Suivre un joueur</NavLink>
      </section>
    </div>
  );
}
