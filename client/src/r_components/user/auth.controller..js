import axios from 'axios';
import { toast } from 'react-toastify';
toast.configure()

const isAuthenticated = async () => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post("http://localhost:5000/admin", {
    }, { headers: {"Authorization" : `Bearer ${token}` }});
    if (res.status === 200) {
      toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
      return res.data;
    }
  } catch (err) {
    toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
  }
}

export default isAuthenticated;