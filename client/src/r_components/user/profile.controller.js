import axios from 'axios';
import { toast } from 'react-toastify';
toast.configure()

const userProfile = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/user/${id}`);
    toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
    if(res.status === 200){
        return res.data.user;
    }
  } catch (err) {
    toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
  }
}

export default {
  userProfile,
}