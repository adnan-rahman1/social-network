import { LOADING } from "../../actions";

const initialState = {
  isLoading: false,
};

export const r_loading = (state = initialState, action) => {
  switch(action.type) {
    case LOADING:
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