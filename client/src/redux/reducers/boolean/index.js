import { IS_AUTHENTICATED, REDIRECT, LOADING } from "../../actions";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isRedirect: false,
};

export const r_boolean = (state = initialState, action) => {
  switch(action.type) {
    case IS_AUTHENTICATED:
      state = {
        ...state,
        isAuthenticated: action.payload
      };
      break;
    case LOADING:
      state = {
        ...state,
        isLoading: action.payload,
      };
      break;
    case REDIRECT:
      state = {
        ...state,
        isRedirect: action.payload
      };
      break;
    default:
      break;
  }
  return state;
}