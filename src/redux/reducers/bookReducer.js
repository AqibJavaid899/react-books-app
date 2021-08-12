import { actionTypes } from "../constants";

const initBook = [];

export const bookReducer = (state = initBook, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      console.log("In SET Books!!");
      // console.log("Set Books Payload is : ", action.payload);
      // let data = [...new Map(action.payload.map((x) => [x["id"], x])).values()];
      // console.log("After Extracting Unique Values : ",action.payload)
      return action.payload;

    case actionTypes.ADD_BOOK:
      // console.log("Add Books Payload is : ", action.payload);
      // console.log("Prev State is : ", state);
      state = [...new Map(state.map((book) => [book["id"], book])).values()];
      // console.log("Unique State is : ", state);
      if (
        action.payload.book.name &&
        action.payload.book.genre &&
        action.payload.book.author
      ) {
        return [...state, action.payload];
      }

    case actionTypes.DELETE_BOOK:
      // console.log("Before State in DELETE REDUCER is : ",state)
      // state = [...new Map(state.map((x) => [x["id"], x])).values()];
      // console.log("After State in DELETE REDUCER is : ",state)

      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};
