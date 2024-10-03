import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";
const baseURL = "https://react-node-designer.glitch.me/api/v1";

export const getAllUsers = async () => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found, please log in.");
  }
  const response = await axiosInstance.get(`${baseURL}/users`);

  return response.data.data.users;
};
