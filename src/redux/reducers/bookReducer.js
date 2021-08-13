import { actionTypes } from "../constants";

const initBook = [];

export const bookReducer = (state = initBook, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      state = [...new Map(state.map((book) => [book["id"], book])).values()];
      return action.payload;

    case actionTypes.ADD_BOOK:
      state = [...new Map(state.map((book) => [book["id"], book])).values()];
      return [...state, action.payload];

    case actionTypes.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};
