import { USER, SINGLE_USER, ALL_USER } from "../../actions";

const initialState = {
  user: {}, // auth user
  all_user: [],
  single_user: {},
};

export const r_user = (state = initialState, action) => {
  switch(action.type) {
    case USER: 
      state = {
        ...state,
        user: action.payload // auth user
      };
      break;
    case ALL_USER:
      state = {
        ...state,
        all_user: action.payload,
      }
      break;
    case SINGLE_USER:
      state = {
        ...state,
        single_user: action.payload
      };
      break;
    default:
      break;
  }
  return state;
}
