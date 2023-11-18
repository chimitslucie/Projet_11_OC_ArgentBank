// Définition de l'URL de base de l'API
const baseURL = "http://localhost:3001/api/v1";

// Les informations nécessaires pour chaque type de requête : URL, méthode HTTP, authentification requise
const fetchInfo = {
  getToken: {
    url: "/user/login",
    method: "post",
    auth: false,
  },
  getProfile: {
    url: "/user/profile",
    method: "post",
    auth: true,
  },
  putUserName: {
    url: "/user/profile",
    method: "put",
    auth: true,
  },
};

// Fonction pour effectuer des requêtes API
export const callAPI = async (infos, token, data = {}) => {
  // Récupérer les informations spécifiques à la requête à partir de fetchInfo
  const callAPIData = fetchInfo[infos];
  if (!callAPIData) {
    console.error(
      "Erreur à l'appel de connexion à l'API : Type de requête non reconnu"
    );
    return;
  }

  // Définit les en-têtes de la requête, y compris le jeton d'authentification si nécessaire
  const headers = { "Content-Type": "application/json" };

  if (callAPIData.auth) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Effectue la requête en utilisant l'URL de base et les informations spécifiques à la requête
    const response = await fetch(`${baseURL}${callAPIData.url}`, {
      method: callAPIData.method,
      headers,
      body: JSON.stringify(data),
    });

    // Vérifie si la réponse de la requête est réussie
    if (!response.ok) {
      console.log(response);
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la connexion à l'API :", error);
    throw error;
  }
};

export default callAPI;
