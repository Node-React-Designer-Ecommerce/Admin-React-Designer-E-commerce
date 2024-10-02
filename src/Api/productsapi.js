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

export const getOneProduct = async (id, headers) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`, { headers });
    return res;
  } catch (error) {
    console.error("Error Fetching product with Id", error);
    throw error;
  }
};

export const addProduct = async (data, headers) => {
  try {
    const res = await axios.post(API_URL, data, { headers });
    return res;
  } catch (error) {
    console.error("Error Fetching product ", error);
    throw error;
  }
};
export const updateProduct = async (id, updateData, headers) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}`, updateData, { headers });
    console.log(res.data);
    return res;
  } catch (error) {
    console.error("Error updating product with Id", id, error.response.data);
    throw error;
  }
};

export const deleteProduct = async (id, headers) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error Fetching product with Id", error);
    throw error;
  }
};

// For Categories
export const addCategory = async (categoryData) => {
  try {
    const res = await axios.post(API_URL, categoryData);
    return res.data.data; // تأكد من أن تعيد البيانات الصحيحة
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};