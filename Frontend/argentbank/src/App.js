import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Headers from "./Components/Headers";
import Accueil from "./Components/Accueil/Accueil";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import Error from "./Components/Error/Error";
import Footer from "./Components/Footer";
import { useSelector } from "react-redux";

// Composant principal App
function App() {
  const isLoggedIn = useSelector((state) => state.signIn.islogin);
  const userToken = useSelector((state) => state.signIn.token);

  return (
    <div className="App">
      {/* Configuration des routes */}
      <Headers />
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Accueil />} />
        {/* Route pour la page Login */}
        <Route path="/login" element={<Login />} />
        {/* Route pour la page User */}
        <Route
          path="/profile"
          element={
            isLoggedIn && userToken !== "" ? (
              <User />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        {/* Route par défaut pour les erreurs */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
