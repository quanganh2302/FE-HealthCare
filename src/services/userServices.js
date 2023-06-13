import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = async (inputId) =>{
  return axios.get("/api/get-all-users",{id: inputId})
}
export { handleLoginAPI, getAllUsers};
