import { REDIRECT } from "../../actions";

const initialState = {
  isRedirect: false,
};

export const r_loading = (state = initialState, action) => {
  switch(action.type) {
    case REDIRECT:
      state = {
        ...state,
        isLoading: action.payload,
      }
      break;
    default:
      break;
  }
  return state;
}