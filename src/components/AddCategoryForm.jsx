import PropTypes from "prop-types";
import { useState } from "react";

const AddCategoryForm = ({ newCategoryData, setNewCategoryData, handleAddCategory, setIsAdding }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newCategoryData.name) {
      newErrors.name = "Name is required.";
    }
    if (newCategoryData.description.length < 30) {
      newErrors.description = "Description must be at least 30 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddCategory();
    }
  };


  return (
    <div className="flex flex-col mb-4">
      <h3 className="text-black py-2">Add New Category</h3>
      <input
        type="text"
        placeholder="Category Name"
        className="input input-bordered mb-3"
        value={newCategoryData.name}
        onChange={(e) => setNewCategoryData({ ...newCategoryData, name: e.target.value })}
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}
      <input
        type="text"
        placeholder="Category Description"
        className="input input-bordered"
        value={newCategoryData.description}
        onChange={(e) => setNewCategoryData({ ...newCategoryData, description: e.target.value })}
      />
      {errors.description && <p className="text-red-500">{errors.description}</p>}
      <button
        className="btn text-black mt-2 rounded text-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="btn bg-gray-500 text-white mt-2 rounded text-lg"
        onClick={() => setIsAdding(false)}
      >
        Cancel
      </button>
    </div>
  );
};

AddCategoryForm.propTypes = {
  newCategoryData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setNewCategoryData: PropTypes.func.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  setIsAdding: PropTypes.func.isRequired,
};

export default AddCategoryForm;