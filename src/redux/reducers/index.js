import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { bookReducer } from "./bookReducer";
import { authorReducer } from './authorReducer'

const allReducers = combineReducers({
  userStore: userReducer,
  bookStore: bookReducer,
  authorStore: authorReducer,
});

export default allReducers;
