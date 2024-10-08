import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";


export const getAllUsers = async () => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found, please log in.");
  }
  const response = await axiosInstance.get(`/users`);

  return response.data.data.users;
};
