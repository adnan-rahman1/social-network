import { USER_SIGNIN_SIGNUP, AUTH_USER } from "../../actions";

const initialState = {
  user: {},
};

export const r_user = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_USER:
      state = {
        ...state,
        user: action.payload
      };
      break;
    case USER_SIGNIN_SIGNUP:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
}
