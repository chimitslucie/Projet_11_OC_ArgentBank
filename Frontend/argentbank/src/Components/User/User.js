// Importation des modules React et des fonctions nécessaires
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Utiliser pour accéder aux données dans le store Redux et dispatcher des actions
import { getUserData } from "../../Redux/store"; // Action Redux pour stocker les données de l'utilisateur
import AccountInfo from "../Account/AccountInfo"; // Composant d'informations de compte
import EditButton from "../Edit-button/edit"; // Composant de bouton d'édition
import callAPI from "../../Api/callApi"; // Fonction pour effectuer des appels à l'API

function User() {
  const token = useSelector((state) => state.signIn.token);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);

  // Utilisation de useEffect pour effectuer une action au chargement du composant
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        // Requête pour récupérer le profil de l'utilisateur depuis l'API
        const response = await callAPI("getProfile", token, {});
        const userData = response.body;
        // Appel de l'action getUserData qui stocke le profil utilisateur dans le state Redux
        dispatch(getUserData(userData));
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du profil de l'utilisateur :",
          error
        );
      }
    };
    // Appelle de la fonction pour récupérer le profil de l'utilisateur lorsque le composant est monté
    getUserProfile();
  }, [token, dispatch]); // Déclenche l'effet lorsque token ou dispatch change

  return (
    // Affichage de la section principale de la page utilisateur
    <section className="main bg-dark">
      <div className="account-name">
        <div className="header">
          <h1>Welcome back</h1>
          <h2 className="Name-account">
            {userData ? `${userData.firstName} ${userData.lastName}` : ""}
          </h2>
          <EditButton userData={userData} />
          {""}
          {/* Composant d'un bouton d'édition */}
        </div>
      </div>
      <div className="account-section">
        <h2 className="sr-only">Accounts</h2>
        <section>
          {/* Informations du compte checking */}
          <AccountInfo
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
          />
        </section>
        <section>
          {/* Informations du compte savings */}
          <AccountInfo
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
          />
        </section>
        <section>
          {/* Informations de la carte de crédit */}
          <AccountInfo
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
          />
        </section>
      </div>
    </section>
  );
}

export default User;
