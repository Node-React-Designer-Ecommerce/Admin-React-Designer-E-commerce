import axiosInstance from './axiosInstance';

const API_URL = "https://react-node-designer.glitch.me/api/v1/products";

export const getAllProducts = async () => {
  try {
    const res = await axiosInstance.get(`${API_URL}?limit=1000`);
    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getOneProduct = async (id) => {
  try {
    const res = await axiosInstance.get(`${API_URL}/${id}`);
    return res;
  } catch (error) {
    console.error("Error Fetching product with Id", error);
    throw error;
  }
};

export const addProduct = async (data) => {
  try {
    const res = await axiosInstance.post(API_URL, data);
    return res;
  } catch (error) {
    console.error("Error Fetching product ", error);
    throw error;
  }
};

export const updateProduct = async (id, updateData) => {
  try {
    const res = await axiosInstance.patch(`${API_URL}/${id}`, updateData);
    console.log(res.data);
    return res;
  } catch (error) {
    console.error("Error updating product with Id", id, error.response.data);
    throw error;
  }
};

export const deleteProduct = async (id, ) => {
  try {
    const res = await axiosInstance.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error Fetching product with Id", error);
    throw error;
  }
};
