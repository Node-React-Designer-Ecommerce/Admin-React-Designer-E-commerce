import axios from "axios";
//import axiosInstance from "./axiosInstance";
const baseURL = "https://react-node-designer.glitch.me/api/v1";

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, please log in.");
  }
  const response = await axios.get(`${baseURL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.users;
};
