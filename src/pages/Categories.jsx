import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://react-node-designer.glitch.me/api/v1/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    description: "",
  });

  // حالة لإظهار نموذج إضافة الفئة الجديدة
  const [isAdding, setIsAdding] = useState(false); // متغير لتتبع حالة الإضافة

  // جلب الفئات من الـ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}?limit=1000`);
        setCategories(res.data.data.categories);
        setFilteredCategories(res.data.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // تصفية الفئات بناءً على نص البحث
  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        (category.name &&
          category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (category.description &&
          category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // حذف الفئة
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
      setFilteredCategories(
        filteredCategories.filter((category) => category._id !== id)
      ); // تحديث الفلترة
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // عند الضغط على زر التعديل
  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategoryData({
      name: category.name,
      description: category.description,
    });
  };

  // حفظ التعديلات
  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/${editingCategory._id}`, newCategoryData);
      const updatedCategories = categories.map((category) =>
        category._id === editingCategory._id
          ? { ...category, ...newCategoryData }
          : category
      );
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // إضافة فئة جديدة
  const handleAddCategory = async () => {
    try {
      const res = await axios.post(API_URL, newCategoryData);
      const addedCategory = res.data.data; // الفئة المضافة الجديدة
      setCategories([...categories, addedCategory]); // إضافة الفئة إلى القائمة
      setFilteredCategories([...filteredCategories, addedCategory]); // إضافة الفئة إلى الفلاتر
      setNewCategoryData({ name: "", description: "" }); // إعادة تعيين البيانات الجديدة
      setIsAdding(false); // إخفاء نموذج الإضافة بعد النجاح
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center  mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn bg-green-900 text-white"
            onClick={() => setIsAdding(!isAdding)} // Toggle the add category form
          >
            {isAdding ? "Cancel" : "Add Category"}
          </button>
        </div>

        {/* نموذج إضافة فئة جديدة */}
        {isAdding && (
          <div className="flex flex-col mb-4">
            <h3>Add New Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered"
              value={newCategoryData.name}
              onChange={(e) =>
                setNewCategoryData({ ...newCategoryData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category Description"
              className="input input-bordered"
              value={newCategoryData.description}
              onChange={(e) =>
                setNewCategoryData({
                  ...newCategoryData,
                  description: e.target.value,
                })
              }
            />
            <button
              className="btn bg-green-900 text-white mt-2"
              onClick={handleAddCategory}
            >
              Submit
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : filteredCategories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id}>
                    <td>
                      {editingCategory &&
                        editingCategory._id === category._id ? (
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={newCategoryData.name}
                          onChange={(e) =>
                            setNewCategoryData({
                              ...newCategoryData,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        category.name || "No Name"
                      )}
                    </td>
                    <td>
                      {editingCategory &&
                        editingCategory._id === category._id ? (
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={newCategoryData.description}
                          onChange={(e) =>
                            setNewCategoryData({
                              ...newCategoryData,
                              description: e.target.value,
                            })
                          }
                        />
                      ) : (
                        category.description || "No Description"
                      )}
                    </td>
                    <td>
                      {editingCategory &&
                        editingCategory._id === category._id ? (
                        <button
                          className="btn bg-green-900 text-white"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn bg-green-900 text-white"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="btn bg-red-800 text-white ml-2"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
