import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = async (inputId) => {
  //template string
  return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
};
const createNewUserService = (data) => {
  return axios.post(`/api/create-new-users`, data);
};
const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-users`, {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put(`/api/edit-users`, inputData);
};

export {
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
};
