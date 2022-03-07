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

export function characterFetched(data) {
  return {
    type: "character/characterFetched",
    payload: data,
  };
}

export function fetchCharacter(id) {
  return async function thunk(dispatch, getState) {
    try {
      console.log(`${apiUrl}/characters/${id}`);
      const response = await axios.get(`${apiUrl}/characters/${id}`);
      console.log("fetchCharacter", response.data);

      dispatch(characterFetched(response.data));
    } catch (e) {
      console.log("fetchCharacter", e);
    }
  };
}
