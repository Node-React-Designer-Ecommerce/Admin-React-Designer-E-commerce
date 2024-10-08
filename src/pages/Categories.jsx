import { useEffect, useState, useMemo } from "react";
import {
  addCategory,
  getCategories,
  updateCategory,
} from "../Utilities/Api/categoryapi";
import AddCategoryForm from "../components/AddCategoryForm";
import EditCategoryForm from "../components/EditCategoryForm";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [addCategoryData, setAddCategoryData] = useState({
    name: "",
    description: "",
  });
  const [editCategoryData, setEditCategoryData] = useState({
    name: "",
    description: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        (category.name &&
          category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (category.description &&
          category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, categories]);



  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditCategoryData({
      name: category.name,
      description: category.description,
    });
  };

  const handleSave = async () => {
    try {
      await updateCategory(editingCategory._id, editCategoryData);
      const updatedCategories = categories.map((category) =>
        category._id === editingCategory._id
          ? { ...category, ...editCategoryData }
          : category
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setEditCategoryData({ name: "", description: "" });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const res = await addCategory(addCategoryData);
      const addedCategory = res.data.data;
      setCategories((prevCategories) => [...prevCategories, addedCategory]);
      setAddCategoryData({ name: "", description: "" });
      setIsAdding(false);
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
            className="btn bg-mintColor rounded text-white"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Cancel" : "Add Category"}
          </button>
        </div>

        {isAdding && (
          <AddCategoryForm
            newCategoryData={addCategoryData}
            setNewCategoryData={setAddCategoryData}
            handleAddCategory={handleAddCategory}
            setIsAdding={setIsAdding}
          />
        )}

        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : filteredCategories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <table className="table w-full">
              <thead className="text-center text-2xl text-purpleColor">
                <tr>
                  <th>NAME</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id || category.name}>
                    <td>
                      {editingCategory &&
                      editingCategory._id === category._id ? (
                        <EditCategoryForm
                          newCategoryData={editCategoryData}
                          setNewCategoryData={setEditCategoryData}
                          handleSave={handleSave}
                        />
                      ) : (
                        category.name || "No Name"
                      )}
                    </td>
                    <td>
                      {editingCategory &&
                      editingCategory._id === category._id ? (
                        <EditCategoryForm
                          newCategoryData={editCategoryData}
                          setNewCategoryData={setEditCategoryData}
                          handleSave={handleSave}
                        />
                      ) : (
                        category.description || "No Description"
                      )}
                    </td>
                    <td>
                      {editingCategory &&
                      editingCategory._id === category._id ? (
                        <button
                          className="btn bg-mintColor text-white rounded"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn bg-mintColor text-white rounded"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>
                      )}

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