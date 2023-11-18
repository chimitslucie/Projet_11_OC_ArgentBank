import { createSlice } from "@reduxjs/toolkit";

// Création d'une tranche (slice) pour gérer l'authentification (signIN)
const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    token: "", // Token d'authentification initial vide
    islogin: false, // Statut d'authentification initial à faux (déconnecté)
  },
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload; // Stocke le token fourni dans l'action
      state.islogin = true; // Définit le statut d'authentification à vrai (connecté)
    },
    signOut: (state) => {
      state.token = ""; // Supprime le token en le rendant vide
      state.islogin = false; //Définit le statut d'authentification à faux (déconnecté)
    },
  },
});

export default signInSlice;
