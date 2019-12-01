const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch(action.type) {
    case action.type:
      state = {
        ...state,
      }
      break;
    default:
      break;
  }
  return state;
}

