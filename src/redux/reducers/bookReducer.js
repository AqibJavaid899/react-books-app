import { actionTypes } from "../constants";

const initBook = [];

export const bookReducer = (state = initBook, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      console.log("Set Books Payload is : ", action.payload);
      return action.payload;
    case actionTypes.ADD_BOOK:
      // console.log("Add Books Payload is : ", action.payload);
      // console.log("Prev State is : ", state);
      state = [...new Map(state.map((x) => [x["id"], x])).values()];
      // console.log("Unique State is : ", state);
      if (
        action.payload.book.name &&
        action.payload.book.genre &&
        action.payload.book.author
      ) {
        return [...state, action.payload];
      }

    // case actionTypes.ADD_BOOK:
    //   console.log("ADD BOOK PAYLOAD : ", action.payload);
    //   return [...state, action.payload];
    default:
      return state;
  }
};
