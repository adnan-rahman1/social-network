import { combineReducers } from 'redux';
import { r_registerUser } from "./user";
import { r_notification } from "./notification";
import { r_loading } from "./loading";

const reducers = {
    r_registerUser,
    r_notification,
    r_loading,
}
export default combineReducers(reducers);