import { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../Api/categoryapi";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    description: "",
  });

  const [isAdding, setIsAdding] = useState(false); // متغير لتتبع حالة الإضافة
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        console.log(res);
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
      await deleteCategory(id);
      setCategories(categories.filter((category) => category._id !== id));
      setFilteredCategories(
        filteredCategories.filter((category) => category._id !== id)
      );
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteConfirm = (id) => {
    setCategoryToDelete(id);
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setCategoryToDelete(null);
    setShowModal(false);
  };

  const handleDeleteConfirmed = () => {
    if (categoryToDelete) {
      handleDelete(categoryToDelete);
    }
    setCategoryToDelete(null);
    setShowModal(false);
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
      await updateCategory(editingCategory._id, newCategoryData);
      const updatedCategories = categories.map((category) =>
        category._id === editingCategory._id
          ? { ...category, ...newCategoryData }
          : category
      );
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      setEditingCategory(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // إضافة فئة جديدة
  const handleAddCategory = async () => {
    try {
      const res = await addCategory(newCategoryData);
      console.log(res);
      const addedCategory = res.data.data;
      setCategories((prevCategories) => [...prevCategories, addedCategory]);
      setFilteredCategories((prevFilteredCategories) => [
        ...prevFilteredCategories,
        addedCategory,
      ]);
      setNewCategoryData({ name: "", description: "" });
      setIsAdding(false);
      console.log("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };



  return (
    <div className="w-full">
      <div className=" p-4">
        <div className="flex justify-between items-center  mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn "
            onClick={() => setIsAdding(!isAdding)} // Toggle the add category form
          >
            {isAdding ? "Cancel" : "Add Category"}
          </button>
        </div>

        {/* نموذج إضافة فئة جديدة */}
        {isAdding && (
          <div className="flex flex-col mb-4">
            <h3 className="py-2">Add New Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered mb-3"
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
              className="btn  mt-2  text-lg"
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
              <thead className="text-center text-2xl text-black">
                <tr>
                  <th>NAME</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {filteredCategories.map((category) => (
                  <tr key={category._id || category.name}>
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
                          className="btn"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      ) : (
                        <button className="pe-6" onClick={() => handleDeleteConfirm(category._id)}><DeleteIcon/></button>
                      )}
                      <button onClick={() => handleEdit(category)}><EditIcon/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
         {/* Modal for delete confirmation */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this product?</p>
            <div className="modal-action">
              <button onClick={handleDeleteConfirmed} className="btn border border-red-500 bg-white hover:bg-red-500 hover:text-white duration-300 ">
                Delete
              </button>
              <button onClick={handleDeleteCancel} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Categories;
