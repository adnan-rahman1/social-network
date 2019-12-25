import {
  POSTS,
  LOADING, 
} from "../../actions";
  
import { ac_boolean } from "../boolean";
import axios from 'axios';

import { toast } from 'react-toastify';
toast.configure();

export const ac_createPost =  (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    dispatch(ac_boolean(LOADING, true));
    const res = await axios.post(
      `http://localhost:5000/post/create`, 
      { ...formData },
      { headers: { 'Authorization' : `Bearer ${token}` } }
    );
    if (res.status === 200) {
      toast.success(`A post is published successfully...`, { autoClose: 2000, position: "bottom-right" });
      dispatch({
        type: POSTS,
        payload: res.data.posts,
      });
      dispatch(ac_boolean(LOADING, false));
    }
  } catch (err) {
    toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
    dispatch(ac_boolean(LOADING, false));
  }
}
