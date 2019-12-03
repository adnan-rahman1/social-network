import { combineReducers } from 'redux';
import { r_user } from "./user";
import { r_notification } from "./notification";
import { r_boolean } from "./boolean";

const reducers = {
    r_user,
    r_notification,
    r_boolean,
}
export default combineReducers(reducers);