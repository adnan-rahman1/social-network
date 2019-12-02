import { USER_REGISTRATION } from "../../actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const r_registerUser = (state = initialState, action) => {
  switch(action.type) {
    case USER_REGISTRATION:
      state = {
        ...state,
        user: action.payload,
      }
      break;
    default:
      break;
  }
  return state;
}

