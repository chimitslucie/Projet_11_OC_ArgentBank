import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./signinSlice";
import userProfileSlice from "./userprofilSlice";

// Configuration du store Redux
const store = configureStore({
  reducer: {
    signIn: signInSlice.reducer, //Utilisation de la réducter de la tranche d'authentification dans le store
    userProfile: userProfileSlice.reducer, // Utilisation de la réducteur de la tranche de profil utilisateur dans le store
  },
});

// Exportation des actions d'authentification
export const { signIn, signOut } = signInSlice.actions;
// Exportation des actions de profil utilisateur
export const { getUserData, editUserData } = userProfileSlice.actions;

// Exportation du store configuré pour une utilisation globale
export default store;
