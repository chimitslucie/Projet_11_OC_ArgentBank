import { createSlice } from "@reduxjs/toolkit";

// Création d'une tranche (slice) pour gérer le profil utilisateur (userProfile)
const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
  },
  reducers: {
    // Reducteur pour récupérer et stocker les données utilisateur (getUserData)
    getUserData: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      // Récupère les données utilisateur à partir de l'action type : userProfile/getUserData, payload : userData
    },
    // Réducteur pour modifier le nom d'utilisateur (editUserData)
    editUserData: (state, action) => {
      state.userName = action.payload;
      // Modifie le nom d'utilisateur en utilisant le nouveau nom fourni dans l'action type : userProfile/editUserData, payload : newUserName
    },
  },
});

export default userProfileSlice;
