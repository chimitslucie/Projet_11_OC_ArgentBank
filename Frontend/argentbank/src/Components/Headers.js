import React, { useEffect } from "react";
import logo from "../Assets/Images/argentBankLogo.png"; // Importation du logo
import { Link, useNavigate } from "react-router-dom"; // Importation pour gérer les liens et la navigation
import { useSelector, useDispatch } from "react-redux"; // Utilisé pour accéder aux données dans le store Redux et dispatcher des actions
import { signOut, signIn } from "../Redux/store"; // Actions Redux pour la déconnexion et l'authentification

function Headers() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);
  const navigate = useNavigate();

  // Vérifie la validité du token au chargement de la page
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (token && tokenExpiration) {
        const currentTime = new Date().getTime();

        if (currentTime < tokenExpiration) {
          // Le token est valide, l'utilisateur est connecté
          dispatch(signIn(token));
        } else {
          // Le token a expiré, le supprimer du localStorage et déconnecter l'utilisateur
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          dispatch(signOut());
        }
      } else {
        // Si aucun token n'est présent, l'utilisateur est déconnecté
        dispatch(signOut());
      }
    };

    checkTokenValidity();
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.signIn.islogin);

  const handleLogout = () => {
    // Supprimer le token et la date d'expiration du localStorage lors de la déconnexion
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    dispatch(signOut());
    navigate("/");
  };

  return (
    // Affichage de la section d'en-tête de la page
    <header className="headers">
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </Link>
        <div className="Username-position">
          {isLoggedIn ? (
            <div>
              <i className="usericon fa fa-user-circle"></i>
              {/* Rediriger vers la page de l'utilisateur lorsqu'on clique sur le nom d'utilisateur */}
              <Link to={`/profile`}>{userData ? userData.userName : ""}</Link>
            </div>
          ) : null}
          {isLoggedIn ? (
            <Link to="/" className="main-nav-item">
              <div>
                <button className="logbutton" onClick={handleLogout}>
                  <i className="fa fa-sign-out"></i> Sign out
                </button>
              </div>
            </Link>
          ) : (
            <Link to="/Login">
              <button className="logbutton">
                <i className="fa fa-user-circle"></i> Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Headers;
