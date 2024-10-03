import axiosInstance from "./axiosInstance";

export const getAllOrders = async () => {
  try {
    const res = await axiosInstance.get("/orders");
    return res;
  } catch (error) {
    console.log("Error Fetching categories", error);
  }
};
