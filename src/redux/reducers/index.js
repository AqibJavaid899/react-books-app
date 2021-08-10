import { combineReducers } from "redux";
import { userReducer } from './userReducer'

const allReducers = combineReducers({
    userStore: userReducer
});


export default allReducers