import { USER } from "../../actions";

const initialState = {
  user: {},
};

export const r_user = (state = initialState, action) => {
  switch(action.type) {
    case USER:
      state = {
        ...state,
        user: action.payload
      };
      break;
    default:
      break;
  }
  return state;
}
