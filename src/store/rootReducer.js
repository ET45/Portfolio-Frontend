import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import character from "./character/reducer";

export default combineReducers({
  appState,
  user,
  character,
});
