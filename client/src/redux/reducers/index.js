const initialState = {
  isAuthenticated: false,
  user: {}
}

export const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "IS_AUTHENTICATED":
            state = {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
            console.log(state);
            return state;
        default:
            state = initialState
            console.log(state);
            return state;
    }
}