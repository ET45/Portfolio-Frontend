import { apiUrl } from "../../config/constants";
import axios from "axios";

export function charactersFetched(data) {
  return {
    type: "character/charactersFetched",
    payload: data,
  };
}

export async function fetchCharacters(dispatch, getState) {
  const response = await axios.get(`${apiUrl}/characters`);
  console.log("fetchCharacters", response.data);
  dispatch(charactersFetched(response.data));
}
