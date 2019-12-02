import { NOTIFICATION } from "../../actions";

const initialState = {
  msg: "",
};

export const r_notification = (state = initialState, action) => {
  switch(action.type) {
    case NOTIFICATION:
      state = {
        ...state,
        msg: action.payload,
      }
      break;
    default:
      break;
  }
  return state;
}