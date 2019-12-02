import { USER_REGISTRATION } from "../../actions";
import { ac_notification } from "../notification";
import axios from 'axios';

export const ac_registerUser =  (formData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/user/signup", { ...formData });
    // toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
    console.log("calling after api");
    dispatch({
        type: USER_REGISTRATION,
        payload: res.data
    })
    dispatch(ac_notification("You are successfully registered. Please sign in..."));

  } catch (err) {
    dispatch(ac_notification(err.response.data.msg));
  }
}