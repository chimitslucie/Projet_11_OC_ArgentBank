import React from "react";
import ReactDOM from "react-dom/client";
import "./css/main.css"; // Importation du fichier CSS principal
import App from "./App"; // Importation du composant racine de l'application
import { BrowserRouter } from "react-router-dom"; // Importation de BrowserRouter pour gérer les routes
import store from "./Redux/store"; // Importation du store Redux
import { Provider } from "react-redux"; // Utilisation du composant Provider pour connecter l'application au store Redux

// Création de la racine (root) pour l'application React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendu de l'application React dans la racine
root.render(
  <Provider store={store}>
    <div className="main-container">
      {/* Utilisation du BrowserRouter pour gérer les routes de l'application */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </Provider>
);
