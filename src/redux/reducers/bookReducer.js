import { actionTypes } from "../constants";

const initBook = [];

export const bookReducer = (state = initBook, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      console.log("Payload is : ", action.payload);
      return action.payload;
    default:
      return state;
  }
};
