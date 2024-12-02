import axios from "axios";

const baseURL = "https://emp-manage-six.vercel.app/";
// const baseURL = "http://192.168.29.224:8000";

// const baseURL = "http://192.168.29.211:5000";

export default axios.create({
  baseURL,
});
