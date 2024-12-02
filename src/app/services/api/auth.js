import axios from "../index";

const authAPI = {
  // login admin api
  loginApi(data) {
    return axios.post("/api/auth/login", data);
  },

  // logout admin api
  logoutApi() {
    return axios.get("/api/auth/logout");
  },

  // register admin api
  registerApi(data) {
    return axios.post("/api/auth/register", data);
  },
};

export default authAPI;
