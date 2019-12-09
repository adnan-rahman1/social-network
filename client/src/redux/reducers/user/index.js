import { USER, ALL_USER } from "../../actions";

const initialState = {
  user: {},
  all_user: [],
};

export const r_user = (state = initialState, action) => {
  switch(action.type) {
    case USER:
      state = {
        ...state,
        user: action.payload
      };
      break;
    case ALL_USER:
      state = {
        ...state,
        all_user: action.payload,
      }
      break;
    default:
      break;
  }
  return state;
}
