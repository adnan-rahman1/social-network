import { NOTIFICATION } from "../../actions";

export const ac_notification = (msg) => {
    return {
        type: NOTIFICATION,
        payload: msg,
    }
}