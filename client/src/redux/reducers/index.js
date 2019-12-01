import { combineReducers } from 'redux';
import isAuthenticated from "./user";

const reducers = {
    isAuthenticated,
}
export default combineReducers(reducers);