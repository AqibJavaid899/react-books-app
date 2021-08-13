import { actionTypes } from "../constants";

const initBook = [];

export const bookReducer = (state = initBook, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      console.log("Curent State is : ", state);
      state = [...new Map(state.map((book) => [book["id"], book])).values()];
      console.log("Unique States are : ", state);
      console.log("Action Payload is : ", action.payload);
      return action.payload;

    case actionTypes.ADD_BOOK:
      state = [...new Map(state.map((book) => [book["id"], book])).values()];
      return [...state, action.payload];
    //   // if (
    //   //   action.payload.book.name &&
    //   //   action.payload.book.genre &&
    //   //   action.payload.book.author
    //   // ) {
    //   return [...state, action.payload];

    case actionTypes.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};
