import axios from "axios";
const API_URL = "https://react-node-designer.glitch.me/api/v1/categories";

export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}?limit=1000`);
    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
