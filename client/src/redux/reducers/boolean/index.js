import { IS_AUTHENTICATED, REDIRECT, LOADING, PAGE_LOADING } from "../../actions";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isPageLoading: true,
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
    case PAGE_LOADING:
      state = {
        ...state,
        isPageLoading: action.payload,
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