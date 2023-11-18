import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserData } from "../../Redux/store"; // Importe une action Redux
import callAPI from "../../Api/callApi"; // Importe la fonction pour effectuer des appels à l'API

function EditButton({ userData }) {
  // Etat local pour gérer l'ouverture et la fermeture de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Etat local pour stocker le nouveau nom d'utilisateur
  const [newUserName, setNewUserName] = useState(
    userData?.body?.userName || ""
  );
  // Récupération du jeton d'authentification et du profil utilisateur depuis le store Redux
  const token = useSelector((state) => state.signIn.token);
  const userProfile = useSelector((state) => state.userProfile);
  // Dispatch Redux pour mettre à jour les données utilisateur
  const Dispatch = useDispatch();

  // Fonction pour ouvrir la modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fonction pour gérer la sauvegarde des modifications du nom d'utilisateur
  const handleSave = async () => {
    try {
      // Requête pour envoyer le nouveau nom d'utilisateur à l'API
      const response = await callAPI("putUserName", token, {
        userName: newUserName,
      });

      // Appel de l'action Redux pour stocker le nouveau nom d'utilisateur
      Dispatch(editUserData(newUserName));

      // Ferme la modal après avoir enregistré les modifications
      closeModal();
      return response;
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du nom d'utilisateur :",
        error
      );
    }
  };

  // Utilisation de useEffect pour mettre à jour newUserName lorsque userProfile.userName change
  useEffect(() => {
    setNewUserName(userProfile.userName);
  }, [userProfile.userName]);

  return (
    <>
      {/* Bouton pour ouvrir la modal d'édition */}
      <button className="edit-button" onClick={openModal}>
        Edit Name
      </button>
      {isModalOpen && (
        <div className="edit-section">
          {/* Formulaire d'édition du nom d'utilisateur */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper">
              <label htmlFor="userName">User name:</label>
              <input
                type="text"
                id="userName"
                className="input-edit"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name:</label>
              <input
                type="text"
                id="firstName"
                className="input-edit"
                value={userProfile.firstName}
                readOnly
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                className="input-edit"
                value={userProfile.lastName}
                readOnly
              />
            </div>
            <div className="button-container">
              {/* Bouton pour sauvegarder les modifications */}
              <button
                type="submit"
                onClick={handleSave}
                className="interaction-button"
              >
                Save
              </button>
              {/* Bouton pour annuler et fermer la modal */}
              <button className="interaction-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditButton;
