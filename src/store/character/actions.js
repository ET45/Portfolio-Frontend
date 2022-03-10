import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
export function charactersFetched(data) {
  return {
    type: "character/charactersFetched",
    payload: data,
  };
}

export async function fetchCharacters(dispatch, getState) {
  const response = await axios.get(`${apiUrl}/characters`);
  // console.log("fetchCharacters", response.data);
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
      // console.log(`${apiUrl}/characters/${id}`);
      const response = await axios.get(`${apiUrl}/characters/${id}`);
      // console.log("fetchCharacter", response.data);

      dispatch(characterFetched(response.data));
    } catch (e) {
      // console.log("fetchCharacter", e);
    }
  };
}

export const characterAdded = (newCharacter) => ({
  type: "character/characterAdded",
  payload: { newCharacter },
});

export function addCharacter(name, gender, hometown, image, skill) {
  return async function thunk(dispatch, getState) {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    const response = await axios.post(
      `${apiUrl}/characters`,
      {
        name,
        gender,
        hometown,
        image,
        skill,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("what is the response", response);
    dispatch(characterAdded(response.data.newCharacter));
  };
}

export const characterUpdated = (updateCharacter) => ({
  type: "character/characterUpdated",
  payload: updateCharacter,
});

export function updateCharacter({ id, name, gender, hometown, image, skill }) {
  return async function thunk(dispatch, getState) {
    console.log("actıon thunk updating", {
      id,
      name,
      gender,
      hometown,
      image,
      skill,
    });

    const response = await axios.patch(`${apiUrl}/characters/${id}`, {
      //const response = await axios.patch(`${apiUrl}/characters/${id}`, {
      name,
      gender,
      hometown,
      image,
      skill,
    });
    console.log("action update Character", response.data);

    dispatch(characterUpdated(response.data.dataValues));
  };
}
