import axios from "axios";

const API_URL = "https://react-node-designer.glitch.me/api/v1/products";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}?limit=1000`);
    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getOneProduct = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res;
  } catch (error) {
    console.error("Error Fetching product with Id", error);
    throw error;
  }
};

export const addProduct = async (data , headers) => {
  try {
    const res = await axios.post(API_URL, data, {headers});
    return res;
  } catch (error) {
    console.error("Error Fetching product ", error);
    throw error;
  }
};
export const updateProduct = async (id, updateData) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}`, updateData);
    return res;
  } catch (error) {
    console.error("Error Fetching product with Id", error);
    throw error;
  }
};

export const deleteProduct = async (id, headers) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, {headers});
    return res.data;
  } catch (error) {
    console.error("Error Fetching product with Id", error);
    throw error;
  }
};
