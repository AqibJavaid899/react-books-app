import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { bookReducer } from "./bookReducer";

const allReducers = combineReducers({
  userStore: userReducer,
  bookStore: bookReducer,
});

export default allReducers;
