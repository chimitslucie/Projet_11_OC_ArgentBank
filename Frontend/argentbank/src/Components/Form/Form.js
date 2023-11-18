// Import des modules nécessaires depuis React et d'autres bibliothèques
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { signIn } from "../../Redux/store";
import callAPI from "../../Api/callApi";

// Définition d'un composant de formulaire
function Form() {
  // Définition des états pour stocker des données
  const [email, setEmail] = useState(""); // Email de l'utilisateur
  const [password, setPassword] = useState(""); // Mot de passe de l'utilisateur
  const [error, setError] = useState(""); // Message d'erreur
  const [rememberMe, setRememberMe] = useState(false); // Option "Se souvenir de moi"
  const navigate = useNavigate(); // Pour la navigation dans l'application
  const dispatch = useDispatch(); // Pour dispatcher des actions Redux

  // Utilisation de useEffect pour charger des données depuis le stockage local
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
    if (storedRememberMe === "true") {
      setRememberMe(true);
    }
  }, []);

  // Gestion de la soumission du formulaire de connexion
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Appel d'une API pour obtenir un jeton d'authentification
      const response = await callAPI("getToken", null, {
        email: email,
        password: password,
      });

      // Récupération du jeton et de l'heure d'expiration
      const token = response.body.token;
      const expirationTime = new Date().getTime() + 60 * 60 * 1000;

      // Stockage du jeton et de l'heure d'expiration dans le stockage local
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expirationTime);

      // Gestion de l'option "Se souvenir de moi"
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      // Dispatch d'une action Redux pour l'authentification
      dispatch(signIn(token));

      // Redirection vers la page de profil
      navigate("/profile");
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  // Rendu du formulaire de connexion
  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <Button text="Sign In" className="sign-in-button" type="submit" />
        <div className="error-txt">{error}</div>
      </form>
    </section>
  );
}

export default Form;
