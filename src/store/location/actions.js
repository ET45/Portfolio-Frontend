import { apiUrl } from "../../config/constants";
import axios from "axios";

export function locationsFetched(data) {
  return {
    type: "location/locationsFetched",
    payload: data,
  };
}

export async function fetchLocations(dispatch, getState) {
  const response = await axios.get(`${apiUrl}/locations`);
  // console.log("fetchLocations", response.data);
  dispatch(locationsFetched(response.data));
}
