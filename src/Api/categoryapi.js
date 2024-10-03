import axiosInstance from './axiosInstance';
const API_URL = "https://react-node-designer.glitch.me/api/v1/categories";

export const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get(`${API_URL}?limit=1000`);
    return res;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const addCategory = async (categoryData) => {
  try {
    const res = await axiosInstance.post(API_URL, categoryData);
    return res;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (id, updateData) => {
  try {
    const res = await axiosInstance.patch(`${API_URL}/${id}`, updateData);
    console.log(res.data);
    return res;
  } catch (error) {
    console.error("Error updating category with Id", id, error.response.data);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axiosInstance.delete(`${API_URL}/${id}`);
    return res;
  } catch (error) {
    console.error("Error Fetching category with Id", error);
    throw error;
  }
};