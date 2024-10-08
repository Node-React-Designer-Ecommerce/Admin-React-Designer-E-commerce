import axiosInstance from './axiosInstance';

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get(`/categories`);
    return res;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    console.log("Adding category with data:", categoryData); // Debugging statement
    const res = await axiosInstance.post("/categories", categoryData);
    return res;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (id, updateData) => {
  try {
    const res = await axiosInstance.patch(`/categories/${id}`, updateData);
    console.log(res.data);
    return res;
  } catch (error) {
    console.error("Error updating category with Id", id, error.response.data);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axiosInstance.delete(`/categories/${id}`);
    return res;
  } catch (error) {
    console.error("Error Fetching category with Id", error);
    throw error;
  }
};