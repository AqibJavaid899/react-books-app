import { actionTypes } from "../constants";

const initAuthor = [];

export const authorReducer = (state = initAuthor, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHORS:
      console.log("In SET Authors!!");
      return action.payload;
    // case actionTypes.ADD_AUTHOR:
    // console.log("In Add Author Reducer..");
    // return [...state, action.payload];
    // return state;
    default:
      return state;
  }
};
