import React from "react";
import { Link } from "react-router-dom";

// Composant NotFound
function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-container">
        {/* Titre de la page 404 */}
        <h1 className="notfound-title">404 Error</h1>
        {/* Message d'erreur */}
        <p className="notfound-oups">Oups! Une erreur est survenue.</p>
        {/* Lien de retour vers la page d'accueil */}
        <Link to="/">
          <p className="back-link">Retourner sur la page d'accueil</p>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
