import axios from "axios"
import { ENV_VARS } from "../config/envVars.js"

export const fetchFromTMDB = async (url) => {
  const options = {
    headers:{
         accept: 'application/json',
        // authorization: "Bearer" + ENV_VARS.TMDB_API_KEY,
        authorization:`Bearer  ${ENV_VARS.TMDB_API_KEY}`,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200){
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.data;
};