import { actionTypes } from "../constants";

const initAuthor = [];

export const authorReducer = (state = initAuthor, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHORS:
      console.log("In SET Authors!!");
      return action.payload;
    default:
      return state;
  }
};
