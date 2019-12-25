import { POST, POSTS } from "../../actions";

const initialState = {
  post: {}, // single post
  posts: [], // all posts
};

export const r_post = (state = initialState, action) => {
  switch(action.type) {
    case POST: 
      state = {
        ...state,
        post: action.payload,
      };
      break;
    case POSTS:
      state = {
        ...state,
        posts: action.payload,
      }
      break;
    default:
      break;
  }
  return state;
}