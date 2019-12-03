import { USER_SIGNIN_SIGNUP, USER_SIGNOUT, LOADING, IS_AUTHENTICATED, AUTH_USER } from "../../actions";
import { ac_boolean } from "../boolean";
import axios from 'axios';

import { toast } from 'react-toastify';
toast.configure();

export const ac_userAuthentication =  () => async (dispatch) => {
  try {
    dispatch(ac_boolean(LOADING, true))
    const token = localStorage.getItem('token');
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/admin",
      headers: { 'Authorization' : `Bearer ${token}` } 
    });
    if (res.status === 200) {
      toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
      dispatch({
        type: AUTH_USER,
        payload: res.data.user,
      });
      dispatch(ac_boolean(LOADING, false));
      dispatch(ac_boolean(IS_AUTHENTICATED, true));
    }
  } catch (err) {
    dispatch(ac_boolean(LOADING, false));
    // toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
  }
}


export const ac_userSignInSignUp =  (formData, urlSubStr) => async (dispatch) => {
  try {
    dispatch(ac_boolean(LOADING, true));
    const res = await axios.post(`http://localhost:5000/user/${urlSubStr}`, { ...formData });
    if (res.status === 200) {
      toast.success("You are successfully registered...", { autoClose: 2000, position: "bottom-right" });
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: USER_SIGNIN_SIGNUP,
        payload: res.data.user,
      });
      dispatch(ac_boolean(LOADING, false));
      dispatch(ac_boolean(IS_AUTHENTICATED, true));
    }
  } catch (err) {
    toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
    dispatch(ac_boolean(LOADING, false));
  }
}

export const ac_userSignOut = () => async (dispatch) => {
  try {
    dispatch(ac_boolean(LOADING, true));
    const res = await axios.get(`http://localhost:5000/user/signout`);
    if (res.status === 200) {
      toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
      localStorage.removeItem("token");
      dispatch({
        type: USER_SIGNOUT,
        payload: "",
      });
      dispatch(ac_boolean(IS_AUTHENTICATED, false));
      dispatch(ac_boolean(LOADING, false));
    }
  } catch (err) {
    dispatch(ac_boolean(LOADING, false));
    toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
  }
}