import axiosInstance from "./axiosInstance";

export const getAllDesigns = async () => {
  try {
    const res = await axiosInstance.get(`/designs`);
    return res.data.data.designs;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
